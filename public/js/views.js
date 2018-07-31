import { createNote,addtoDB } from "./services";

document.getElementById("AddBtn").onclick = function() {
    let list = document.querySelector(".list");
    list.innerHTML="";
}

document.getElementById("save-note").onclick = function () {
    let toAdd = createNote();
    addtoDB(toAdd);

}
document.getElementById("add-list-btn").onclick = function () {
    let list = document.querySelector(".list");
    // list.innerHTML="";
    let listItem = document.createElement("li");
    listItem.className = "list-item";
    listItem.style.listStyleType = "none";
    listItem.innerHTML = "<input type='text' placeholder='Fill in something'>";
    list.appendChild(listItem);
}