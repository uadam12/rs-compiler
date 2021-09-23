const subjectList = el("#subject");
const schoolName = el("#school-name");
const test = el("#test");
const level = els("#level > .btn");
const classInvolved = el("#class");
const section = el("#section");
const input = el("#new-subject");

let school = Store.getSchoolInfo(), subjects;

if(!school) 
    school = Store.setSchoolInfo();

const className = school.class;
subjects = school.subjects;

schoolName.value = school.name;
test.value = school.test;

if(Store.testClass(className)) {
    const id = className.split(" ")[0];
    const choosenClass = className.replace(/[a-z]$/i, "").trim();

    el("#"+id).click();
    classInvolved.value = choosenClass;
    classInvolved.dispatchEvent(new Event("change"));
    section.value = choosenClass !== className? className:"";
}

// Display subjects
subjects.forEach(subject => addSubject(subject));

function selectLevel(btn) {
    section.innerHTML = "<option value='' selected disabled>Select section</option>";

    level.forEach(btn => btn.classList.remove("level"));
    btn.classList.add("level");
    generateClasses(btn.innerHTML);
}

function generateClasses(lvl) {
    let finalClass = 3;

    if(lvl == "Primary") finalClass = 6;

    classInvolved.innerHTML = "<option value='' selected disabled>Select Class</option>"

    for(let classNo = 1; classNo <= finalClass; classNo++) {
        const classStr = lvl+" "+classNo;
        const cl = mkEl("option", 0, {value:classStr}, classStr);
        classInvolved.appendChild(cl);
    }
}

function generateSection() {
    const sections = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const theClass = classInvolved.value;

    section.innerHTML = "<option value='' selected disabled>Select section</option>";

    sections.forEach(sec => {
        let theSection = theClass+sec;
        sec = mkEl("option", 0, {value:theSection}, theSection);
        section.appendChild(sec);
    });
}

function addNewSubject() {
    const newSubject = input.value;

    if(empty(newSubject)) return writeMsg("Please enter subject name.");

    const exists = Store.getSchoolInfo().
        subjects.map(sub => sub.name.
        toLowerCase().trim()).
        includes(newSubject.
        toLowerCase().trim());

    if(exists) return writeMsg("Subject already exists.");

    addSubject({
        name: newSubject,
        selected: true
    });
    
    input.value = "";
}

function addSubject(subject) {
    const title = subject.name;
    const notCompusary = !Store.compusary(title);
    const subjectItem = mkEl("li", 0, 0, title);

    if(subject.selected) 
        subjectItem.classList.add("checked");
    if(notCompusary) {
        const close = mkEl("span", "close", 0, "X");
        close.onclick = function() {
            subjectList.removeChild(subjectItem);
        }

        subjectItem.onclick = function() {
            this.classList.toggle("checked");
        }
    
        subjectItem.appendChild(close);
    }
    subjectList.appendChild(subjectItem);
}

function getSubjectList() {
    const list = els("#subject > li").
        map(li => {
            const name = li.outerText.replace("X", "").trim();
            const selected = Store.compusary(name)? 
                true: li.className.includes("checked");

            return {
                name:name,
                selected:selected
            }
    });

    return list;
}
function updateSchoolInfo() {
    const name = schoolName.value;
    const testScore = Number(test.value) || 20;
    const className = section.value || classInvolved.value;
    const subjects = getSubjectList();

    if(empty(name)) return displayMsg("Please enter school name");
    else if(empty(className)) return displayMsg("Please select class and/or section");
    else if(!Store.testClass(className)) return displayMsg("Invalid class name.");

    Store.setSchoolInfo(subjects, name, className, testScore);
    writeMsg("School Information updated successfully");
    goto("dashboard.html");
}