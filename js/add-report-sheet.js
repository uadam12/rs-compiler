// Declear constant variables and get elements from DOM
const reportSheet = el(".result");
const studentName = el("#name");
const subjects = getSubjects(school.subjects);
const data = {};
const testScore = school.test;
const examScore = 100 - testScore*2;
let serialNo = 1;

// Display school name
el("#school").innerHTML = school.name;

// Collect student exam record
subjects.forEach(subject => {
    const row = mkEl("tr");
    const name = subject.name;

    data[name] = [];

    row.appendChild(mkEl("td", 0, 0, serialNo++));
    row.appendChild(mkEl("th", 0, 0, name));

        tests.forEach(test => {
            const maxScore = test=="exam"? examScore: testScore;
            const cell = mkEl("td");
            const input = mkEl("input", 0, {
                min: 0,
                max: maxScore,
                type: "number", 
                placeholder: labels[test]
            });

            input.onblur = function() {
                if(!Number(this.value) || this.value < 0) this.value = 0;
                else if(this.value > this.max) this.value = this.max;
            }
            data[name].push(input);

            cell.appendChild(input);
            row.appendChild(cell);
        });

        reportSheet.appendChild(row);
    });

function storeRecord() {
    const name = studentName.value;
    const className = school.class;

    if(!name) 
        return displayMsg("Please enter student name");

    let records = Store.get(className) || [];
    const record = getStudentRecord(data, name);
    
    records.push(record);
    records = removeDuplicate(records);
    records.sort((a, b) => b.record.Total[3] - a.record.Total[3]);

    Store.save(className, records);
    writeMsg("Report sheet of "+name+" is added successfully");
    goto("dashboard.html");
}