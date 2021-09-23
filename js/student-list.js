const studentList = el(".result");
const box = el(".box");
const studentName = el("#name");
const noOfStudent = el("#record > #no");

const className = school.class;
let classRecord = Store.get(className) || [];
let studentNo = classRecord.length, studentRow;

write("#school", school.name);
write("#class", className);
noOfStudent.innerHTML = studentNo;

if(!studentNo) noRecord();
else {
    classRecord.forEach(student => {
        const name = student.name;
        const row = mkEl("tr");
        const action = mkEl("td");
        const view = mkEl("button", "btn bg-green", 0, "V");
        const edit = mkEl("button", "btn bg-orange", 0, "E");
        const del = mkEl("button", "btn bg-red", 0, "D");

        view.onclick = () => {
            set("name", name);
            goto("report-sheet.html");
        }
        edit.onclick = () => {update(name)};

        del.onclick = function() {            
            studentRow = this.parentElement.parentElement;
            studentName.innerHTML = name;
            box.classList.add("show");
        }
        action.appendChild(view);
        action.appendChild(edit);
        action.appendChild(del);
        row.appendChild(mkEl("td", 0, 0, name));
        row.appendChild(action);
        studentList.appendChild(row);
    });
}

function noRecord() {
    const row = mkEl("tr");
    const cell = mkEl("td", "text-red text-center", {colspan:2}, "There is no students records.");

    studentList.innerHTML = "";
    row.appendChild(cell);
    studentList.appendChild(row);
}

function closeBox() {
    studentRow = undefined;
    box.classList.remove("show");
}
function deleteStudent() {
    if(studentRow) {
        const name = studentName.innerHTML;
        classRecord = classRecord.
        filter(student => student.name !== name);
        studentNo = classRecord.length;

        Store.save(className, classRecord);
        studentList.removeChild(studentRow);
        noOfStudent.innerHTML = studentNo;
        closeBox();
        displayMsg("You have successfully delete record of "+name);
        if(!studentNo) noRecord();
    }
}

box.addEventListener("click", e => {
    if(e.target === e.currentTarget) closeBox();
});