class Store {
    // Declear store members
    static defaultSubjects = ["English Language", "Mathematics", "Physics", "Chemistry", "Biology", "Islamic Studies", "Civic Education", "Computer Studies", "Agricultural Science", "Fisheries", "Social Studies", "Business Studies"];
    static levels  = ["Primary", "JSS", "SSS"];

    // Test methods 
    static compusary(sub) {
        return (sub === "English Language" || sub === "Mathematics");
    }
    static testClass(classStr) {
        const finalClass = (classStr === "Primary")? 6:3;
        const classPattern = `^(${this.levels.join("|")}) [1-${finalClass}][a-z]?$`;

        const rex = new RegExp(classPattern, "i");
        return rex.test(classStr);
    }

    // Save information to local storage
    static save(key, value) {
        value = JSON.stringify(value);
    
        localStorage.setItem(key, value);
    }

    // Get information from local storage
    static get(key) {
        key = localStorage.getItem(key);
    
        try {
            return JSON.parse(key);
        } catch {
            return key;
        }
    }

    // Save school information
    static setSchoolInfo(subjects, schoolName="", className="", test=20) { 
        if(!subjects) {
            subjects = this.defaultSubjects;
    
            subjects = subjects.map(subject => {
                const name = subject;
                const selected = this.compusary(name)? 
                    true: false;
            
                return {
                    name:name,
                    selected:selected
                }
            });
        }

        const info = {
            name:schoolName,
            class:className,
            test:test,
            subjects:subjects
        };

        this.save("school-info", info);
        return info;
    }
    // Get school info
    static getSchoolInfo() {
        return this.get("school-info");
    }
}