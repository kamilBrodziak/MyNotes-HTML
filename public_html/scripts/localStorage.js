window.onload = loadNotesFromLS;

function loadNoteToLS(note, isUpdate=false) {
    if(!isUpdate) {
    var noteObject = {
        title: note.getElementsByClassName("headerText")[0].innerHTML,
        text: note.getElementsByClassName("noteText")[0].innerHTML,
        top: note.offsetTop,
        left: note.offsetLeft,
        width: note.offsetWidth,
        height: note.offsetHeight,
        hashCode: note.getAttribute("hashCode") + ""
    };
    }
    var notes = JSON.parse(localStorage.getItem("notes"));
    if(notes === null) {
        notes = [];
    }
    if(isUpdate) {
        updateNoteList(note, notes);
    } else {
        notes.push(noteObject);
    }
    localStorage.setItem("notes", JSON.stringify(notes));
}

function updateNoteList(note, notes) {
    for (var i = 0; i < notes.length; i++) {

        if (notes[i].hashCode === note.getAttribute("hashCode")) {
            notes[i].title = note.getElementsByClassName("headerText")[0].innerHTML;
            notes[i].text = note.getElementsByClassName("noteText")[0].value;
            notes[i].top = note.offsetTop;
            notes[i].left = note.offsetLeft;
            notes[i].width = note.offsetWidth;
            notes[i].height = note.offsetHeight;
            return false;
        }
    }
}

function loadNotesFromLS(e) {

    var notes = JSON.parse(localStorage.getItem("notes"));

    if(notes == null) {
        return false;
    }

    for(var i in notes) {
        var note = notes[i];
        var noteDOM = addNote(e, note.title, note.text, true, note.hashCode);
        noteDOM.style.top = note.top + "px";
        noteDOM.style.left = note.left + "px";
        noteDOM.style.width = note.width + "px";
        noteDOM.style.height = note.height + "px";
    }
}


function removeNoteFromLS(note) {
    var notes = JSON.parse(localStorage.getItem("notes"));
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].hashCode === note.getAttribute("hashCode")) {
            notes.splice(i,1);
            break;
        }
    }
    localStorage.setItem("notes", JSON.stringify(notes));

}

function removeAllNotesFromLS() {
    localStorage.removeItem("notes");
    localStorage.removeItem("hashCode");
}