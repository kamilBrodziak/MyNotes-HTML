
document.getElementById("addNote").addEventListener("click", addNote);
document.getElementById("deleteAll").addEventListener("click", deleteAll);

/*<section class="note">
                <h1 class="noteHeader">
                    <span class="headerText" contenteditable="true" max="50">Title</span>
                    <img class="deleteNote" src="images/delete.png" alt="Delete">
                </h1>
                <textarea class="noteText" rows="6"></textarea>
           </section> */


function addNote(e, title="Title", text="Write Something", lsLoad=false, hashCode=0) {
    var textarea = document.createElement("TEXTAREA");
    textarea.setAttribute("class", "noteText");
    textarea.setAttribute("rows", "6");
    textarea.innerHTML = text;

    var note = document.createElement("SECTION");
    note.setAttribute("class", "note");
    note.setAttribute("pinned", "false");
    note.appendChild(createHeader(title));

    note.appendChild(textarea);
    dragElement(note);

    document.getElementById("notes").appendChild(note);
    note.addEventListener("keyup", changeLS);
    note.addEventListener("mouseup", changeLS);
    note.addEventListener("dblclick", pinNote);
    if(lsLoad) {
        note.setAttribute("hashCode", hashCode);
        return note;
    } else {
        hashCode = parseInt(localStorage.getItem("hashCode"),10);
        if(isNaN(hashCode)) {
            hashCode = 0;
        }
        localStorage.setItem("hashCode", ++hashCode + "");
        note.setAttribute("hashCode", hashCode);
        loadNoteToLS(note);
    }
}

function createHeader(title) {

    var spanHeader = document.createElement("SPAN");
    spanHeader.setAttribute("class", "headerText");
    spanHeader.setAttribute("contenteditable", "true");
    spanHeader.setAttribute("max", "50");
    spanHeader.innerHTML = title;
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
    var pinned = document.querySelectorAll('[pinned=true]');
    if (pinned.length !== 0) {
        var notesToDelete = document.querySelectorAll("[pinned=false]");
        for(var i = 0; i < notesToDelete.length; ++i) {
            notes.removeChild(notesToDelete[i]);
            removeNoteFromLS(notesToDelete[i]);
        }
    } else {
        while(notes.hasChildNodes()) {
            notes.removeChild(notes.firstChild);
        }
        removeAllNotesFromLS();
    }
}

function changeLS() {
    loadNoteToLS(this, true);
}

function pinNote() {
    var imgHeader = this.getElementsByClassName("deleteNote")[0];
    if(this.getAttribute("pinned") ==="true") {
        this.setAttribute("pinned", "false");
        imgHeader.addEventListener("click", deleteNote);

    } else {
        this.setAttribute("pinned", "true");
        imgHeader.removeEventListener("click", deleteNote);
    }
    loadNoteToLS(this, true);
}