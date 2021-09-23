const tests = ["ca1", "ca2", "exam"];
const labels = {
    ca1:"1st C.A",
    ca2:"2nd C.A",
    exam:"Exam"
}
// Get school information
let school = Store.getSchoolInfo();

// Goto school info page if school infomartion is not found
if(!school || !school.subjects) {
    writeMsg("You need to provide your school information, to access this page.");
    goto("school-info.html");
}

function studentData() {
    const studentName = read("name");

    if(studentName) {
        const classRecord = Store.get(school.class);
        const studentRecord = classRecord.
            find(student => student.name === studentName);

        if(studentRecord) {
            return {
                name:studentRecord.name,
                pos: classRecord.indexOf(studentRecord)+1,
                avgMark:studentRecord.avgMark,
                record:studentRecord.record,
                totalStudents:classRecord.length
            };
        } else {
            writeMsg("No record found for the selected student.");
            goto("dashboard.html");    
        }
    } else {
        writeMsg("You need to select a student, to access this page.");
        goto("dashboard.html");
    }
}

function update(name) {
    set("name", name);
    goto("update-rs.html");
}