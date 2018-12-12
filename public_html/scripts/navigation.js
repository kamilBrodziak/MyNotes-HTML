document.getElementById("addNote").addEventListener("click", addNewNote);
document.getElementById("deleteAll").addEventListener("click", deleteUnpinNotes);
document.getElementById("deleteAll").addEventListener("dblclick", deleteAllNotes);


function deleteAllNotes() {
    var notes = document.getElementById("notes");
        while(notes.hasChildNodes()) {
            notes.removeChild(notes.firstChild);
        }
        removeAllNotesFromLS();
}

function deleteUnpinNotes() {
    var notes = document.getElementById("notes");
    var pinned = document.querySelectorAll('[pinned=true]');
    if (pinned.length !== 0) {
        var notesToDelete = document.querySelectorAll("[pinned=false]");
        for(var i = 0; i < notesToDelete.length; ++i) {
            notes.removeChild(notesToDelete[i]);
            removeNoteFromLS(notesToDelete[i]);
        }
    } else {
        deleteAllNotes();
    }
}