const el = el => document.querySelector(el);
const els = els => Array.from(document.querySelectorAll(els));
const sum = arr => arr.reduce((a, b) => a+b);
const percent = (mark, total) => (mark / total * 100).toPrecision(4);
const empty = str => str === "";
const goto = page => location.assign(page);
const write = (sel, txt) => el(sel).innerHTML = txt || el(sel).innerHTML; 
const getSubjects = arr => arr.filter(sub => sub.selected);

const removeDuplicate = arr => arr.reduce((obj, current) => {
    const data = obj.find(item => item.name === current.name);
    if(!data) 
        return obj.concat([current]);
    else return obj;
}, []);

function mkEl(el, cl, attr, val) {
    el = document.createElement(el);

    if(cl) {
        cl.split(" ").forEach(c => el.classList.add(c));
    }

    if(attr) {
        for(let a in attr) {
            el.setAttribute(a, attr[a]);
        }
    }

    if(val) el.innerHTML = val;

    return el;
}

function grade(mark, total=100) {
    const percentage = percent(mark, total);

    if(percentage >= 80) return "A";
    else if(percentage >= 65) return "B";
    else if(percentage >= 50) return "C";
    else if(percentage >= 40) return "D";
    else return "F";
}

function position(pos) {
    if(pos === 1) return pos+"st";
    else if(pos === 2) return pos+"nd";
    else if(pos === 3) return pos+"rd";
    else return pos+"th"
}

function getStudentRecord(data, name) {
    const record = {};
    let totalMark = 0, posssibleMark = 0;

    for(const sub in data) {
        record[sub] = data[sub].map(subject => {
            const num = Number(subject.value);
            const max = Number.parseInt(subject.max);

            if(!num || num < 0) return 0;
            else if(num > max) return max;
            return num;
        });
        const total = sum(record[sub]);

        record[sub].push(total, grade(total));

        totalMark += total;
        posssibleMark  += 100;
    }
    record.Total = [0, 0, 0, totalMark, grade(totalMark, posssibleMark)];

    return {
        name: name,
        avgMark: percent(totalMark, posssibleMark)+"%",
        record: record
    };
}