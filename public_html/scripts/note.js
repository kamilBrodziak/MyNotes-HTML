var zInd = 11;

function dragElement(elmnt) {
    var startXcursor = 0, startYcursor = 0, pos3 = 0, pos4 = 0;
    var cornerBottom = document.getElementById("bottomCorner").getBoundingClientRect();
    var cornerTop = document.getElementById("topCorner").getBoundingClientRect();

    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        elmnt.style.zIndex = zInd++;
        e = e || window.event;
        if(isBorderClicked(e)){
            e.preventDefault();
            setStartCursor(e);
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }
    }

    function isBorderClicked(e) {
        var notePosition = elmnt.getBoundingClientRect();

        return !(e.clientX > notePosition.left + 20 && 
                e.clientY > notePosition.top + 20 &&
                e.clientX < notePosition.right - 20 &&
                e.clientY < notePosition.bottom - 20);
    }

    function elementDrag(e) {
        e = e || window.event;
        if(!isTouchingEdges()) {
            e.preventDefault();
            elmnt.style.top = (elmnt.offsetTop - startYcursor + e.clientY) + "px";
            elmnt.style.left = (elmnt.offsetLeft - startXcursor + e.clientX) + "px";
            setStartCursor(e);
        }
    }

    function setStartCursor(e) {
        startXcursor = e.clientX;
        startYcursor = e.clientY;
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }

    function isTouchingEdges() {
        var notePosition = elmnt.getBoundingClientRect();
        var hitboxLeft = ((notePosition.top - cornerTop.top) * (cornerBottom.right - cornerTop.right))/
            (cornerBottom.bottom - cornerTop.top) + cornerTop.right;

        var notes = document.getElementById("notes");
        if(notePosition.left <= hitboxLeft) {
            elmnt.style.left = hitboxLeft + 5 + "px";
            return true;
        } else if (notePosition.top <= 0) {
            elmnt.style.top = notePosition.top + 5 + "px";
            return true;
        } else if (notePosition.bottom >= window.innerHeight) {
            elmnt.style.top = notePosition.top - 5 + "px";
            return true;
        } else if (notePosition.right >= window.innerWidth) {
            elmnt.style.left = notePosition.left - 5 + "px";
            return true;
        } 
        return false;
    }
    
}

function checkCharcount(e)
{   
    var note = this.parentNode.parentNode;
    note.style.minWidth = this.parentNode.offsetWidth + "px";
    var max = parseInt(this.getAttribute("max"), 10);
    if(e.which != 8 && this.innerHTML.length > max)
    {
       e.preventDefault();
    }
}

function deleteNote() {
    var notes = document.getElementById("notes");
    notes.removeChild(this.parentNode.parentNode);
}

function resetZIndex() {
    zInd = 10;
}