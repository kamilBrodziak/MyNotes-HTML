window.onload = loadNotesFromLS;

function loadNoteToLS(note, isUpdate=false) {
    var notes = JSON.parse(localStorage.getItem("notes"));
    if(!isUpdate) {
        if(notes === null) {
            notes = [];
        }
        var noteObject = {
            title: note.getElementsByClassName("headerText")[0].innerHTML,
            text: note.getElementsByClassName("noteText")[0].innerHTML,
            top: note.offsetTop,
            left: note.offsetLeft,
            width: note.offsetWidth,
            height: note.offsetHeight,
            hashCode: note.getAttribute("hashCode") + "",
            pinned: note.getAttribute("pinned")
        };
        notes.push(noteObject);
    } else {
        updateNoteList(note, notes);
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
            notes[i].pinned = note.getAttribute("pinned");
            return false;
        }
    }
}

function loadNotesFromLS() {
    var notes = JSON.parse(localStorage.getItem("notes"));
    if(notes == null) {
        return false;
    }

    for(var i in notes) {
        var note = notes[i];
        loadNoteFromLS(note.title, note.text, note.hashCode, note.pinned,
            [note.top, note.left, note.width, note.height]);
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