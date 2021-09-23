let i = 1;
const data = studentData();
const reportSheet = el(".result");
const testScore = school.test;
const examScore = 100 - testScore*2;
const inputs = {};

write("#school", school.name);
write("#name", data.name);

for (let subject in data.record) {
    if(subject === "Total") continue;
    const tr = mkEl("tr");
    let j = 0;
    inputs[subject] = [];

    tr.appendChild(mkEl("td", 0, 0, i++));
    tr.appendChild(mkEl("th", 0, 0, subject));

    tests.forEach(test => {
        const maxScore = test==="exam"? examScore:testScore;
        const td = mkEl("td");
        const input = mkEl("input", 0, {
            min: 0,
            value:data.record[subject][j++],
            max: maxScore,
            type: "number", 
            placeholder: labels[test]
        });
        td.appendChild(input);
        tr.appendChild(td);
        inputs[subject].push(input);
    });

    reportSheet.appendChild(tr);
}

function updateRecord() {
    const records = Store.get(school.class);
    const index = data.pos-1;
    const record = getStudentRecord(inputs, data.name);
    
    records[index] = record;
    records.sort((a, b) => b.record.Total[3] - a.record.Total[3]);

    Store.save(school.class, records);
    writeMsg("Report sheet of "+data.name+" is updated successfully");
    goto("dashboard.html");
}

