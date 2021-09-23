const set = (key, value) => sessionStorage.setItem(key, value);
const remove = key => sessionStorage.removeItem(key);
const read = key => {
    const data = sessionStorage.getItem(key);
    remove(key);
    return data;
}
// Declear functions here
function writeMsg(msg) {
    set("msg", msg);
}
function readMsg() {
    const message = read("msg");
    if(message) {
        const msg = mkEl("div", "notification");

        msg.appendChild(mkEl("p", 0, 0, message));

        document.body.appendChild(msg);
        setTimeout(() => msg.classList.add("show"));

        setTimeout(() => {
            msg.classList.remove("show");
            setTimeout(() => {
                document.body.removeChild(msg);
            }, 700);
        }, 5000);
    }
}
function displayMsg(msg) {
    writeMsg(msg);
    readMsg();
}
setTimeout(readMsg, 200);