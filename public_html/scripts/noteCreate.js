function addNewNote() {
    var newNote = new noteBuilder();
    newNote.createNote();
    newNote.loadContent();
    newNote.addAttr();
    newNote.loadToLS();
}

function loadNoteFromLS(title, text, hashCode, pinned, style) {
    var loadNote = new noteBuilder();
    loadNote.createNote();
    loadNote.loadContent(title, text);
    loadNote.loadNoteAttributes(hashCode, pinned);
    loadNote.loadStyle(style);
    return loadNote.get();
}

 
function noteBuilder() {
    this.note = null;
 
    this.createNote = function() {
        this.note = document.createElement("SECTION");
        this.note.setAttribute("class", "note");

        this.note.addEventListener("keyup", changeNoteLS);
        this.note.addEventListener("mouseup", changeNoteLS);
        this.note.addEventListener("dblclick", pinNote);

        dragElement(this.note);
        document.getElementById("notes").appendChild(this.note);
    };
 
    this.loadContent = function(title="Title", text="Write something") {
        this.note.appendChild(createHeader(title));
        this.note.appendChild(createNoteText(text));
    };

    this.addAttr = function() {
        hashCode = parseInt(localStorage.getItem("hashCode"), 10);
        if(isNaN(hashCode)) {
            hashCode = 0;
        }
        localStorage.setItem("hashCode", ++hashCode + "");
        this.note.setAttribute("hashCode", hashCode);
        this.note.setAttribute("pinned", "false");
        this.note.getElementsByClassName("deleteNote")[0].addEventListener("click", deleteNote);
    };

    this.loadNoteAttributes = function(hashCode, pinned) {
        this.note.setAttribute("hashCode", hashCode);
        this.note.setAttribute("pinned", pinned);
        if(pinned === "false") {
            this.note.getElementsByClassName("deleteNote")[0].addEventListener("click", deleteNote);
        }
    }

    this.loadToLS = function(){
        loadNoteToLS(this.note);
    };

    this.loadStyle = function(style) {
        this.note.style.top = style[0]/window.innerHeight * 100 + "%";
        this.note.style.left = style[1]/window.innerWidth * 100 + "%";
        this.note.style.width = style[2]/window.innerWidth * 100 + "%";
        this.note.style.height = style[3]/window.innerHeight * 100 + "%";
    };

    this.get = function() {
        return this.note;
    };

    function createHeader(title) {
        var headerText = document.createElement("SPAN");
        headerText.setAttribute("class", "headerText");
        headerText.setAttribute("contenteditable", "true");
        headerText.setAttribute("max", "50");
        headerText.innerHTML = title;
        headerText.addEventListener("keyup", checkCharcount);
        headerText.addEventListener("keydown", checkCharcount);
    
        var headerDeleteImg = document.createElement("IMG");
        headerDeleteImg.setAttribute("class", "deleteNote");
        headerDeleteImg.setAttribute("src", "images/delete.png");
        headerDeleteImg.setAttribute("alt", "Delete");
        headerDeleteImg.addEventListener("click", deleteNote);
    
    
        var header = document.createElement("H1");
        header.setAttribute("class", "noteHeader");
    
        header.appendChild(headerText);
        header.appendChild(headerDeleteImg);
        return header;
    }
    
    function createNoteText(text) {
        var textarea = document.createElement("TEXTAREA");
        textarea.setAttribute("class", "noteText");
        textarea.setAttribute("rows", "6");
        textarea.innerHTML = text;
        return textarea;
    }

    function changeNoteLS() {
        loadNoteToLS(this, true);
    }
}