let i = 1;
const student = studentData();
const reportSheet = el(".result");

write("#school", school.name);
write("#name", student.name);
write("#pos", position(student.pos));
write("#num", "Out of " + student.totalStudents);
write("#avg", student.avgMark);

for (let subject in student.record) {
    const tr = mkEl("tr");

    if (subject === "Total") i = 0;

    tr.appendChild(mkEl("td", 0, 0, i++));
    tr.appendChild(mkEl("th", 0, 0, subject));

    student.record[subject].forEach(info => {
        tr.appendChild(mkEl("td", 0, 0, info));
    });
    reportSheet.appendChild(tr);
}