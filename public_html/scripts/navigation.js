
document.getElementById("addNote").addEventListener("click", addNote);
document.getElementById("deleteAll").addEventListener("click", deleteAll);


function addNote() {
    var textarea = document.createElement("TEXTAREA");
    textarea.setAttribute("class", "noteText");
    textarea.setAttribute("rows", "6");
    textarea.innerHTML = "Write something";

    var note = document.createElement("SECTION");
    note.setAttribute("class", "note");
    note.appendChild(createHeader());

    note.appendChild(textarea);
    dragElement(note);

    document.getElementById("notes").appendChild(note);
}

function createHeader() {

    var spanHeader = document.createElement("SPAN");
    spanHeader.setAttribute("class", "headerText");
    spanHeader.setAttribute("contenteditable", "true");
    spanHeader.setAttribute("max", "50");
    spanHeader.innerHTML = "Title";
    spanHeader.addEventListener("keyup", checkCharcount);
    spanHeader.addEventListener("keydown", checkCharcount);

    var imgHeader = document.createElement("IMG");
    imgHeader.setAttribute("class", "deleteNote");
    imgHeader.setAttribute("src", "images/delete.png");
    imgHeader.setAttribute("alt", "Delete");
    imgHeader.addEventListener("click", deleteNote);


    var header = document.createElement("H1");
    header.setAttribute("class", "noteHeader");
    header.appendChild(spanHeader);
    header.appendChild(imgHeader);

    

    return header;
}

function deleteAll() {
    var notes = document.getElementById("notes");
    while (notes.hasChildNodes()) {   
        notes.removeChild(notes.firstChild);
    }
}