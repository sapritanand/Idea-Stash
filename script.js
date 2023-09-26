const addbtn = document.getElementById("addbtn")

function updateNote() {
    const editorData = document.querySelectorAll("#editor");
    const notes = [];
    editorData.forEach((note) => {
        if (note.innerHTML != "") {
            notes.push(note.innerHTML);
        }
    })
    localStorage.setItem('notes', JSON.stringify(notes));
}

function addNewNote(text = "") /*otherwise undefined textarea */ {

    const notesContainer = document.getElementById("notesContainer");
    var note = document.createElement("div");
    note.classList.add("notes", "shadow-lg");
    let HTMLdata = `
    <div class="heading">
        <div class="notecolor-option">
        <div class="circles">
            <span class="circle purple active" id="purple"></span>
            <span class="circle yellow" id="#FFEC9E"></span>
            <span class="circle aqua" id="#7AE7B9"></span>
            <span class="circle red" id="#d9423a"></span>
        </div>
        </div>
        <button class="material-icons edit transition" id="edit" title="Edit">${text ? "edit_note" : "done"}</button>
        <button class="material-icons delete transition" id="delete" title="Delete">delete</button>
  </div>
  <div class="noteText overflow-y-auto ${text ? "" : "hide"}"></div>
  <div class="text ${text ? "hide" : ""}" id="editor" contenteditable="true" data-placeholder="Type your note..."></div>
  <div class="tools text ${text ? "hide" : ""}">
    <button class="fontStyle toolsBtn" id="italic" onclick="document.execCommand('italic',false,null);" title="Italicize Highlighted Text"><i>I</i>
    </button>
    <button class="fontStyle toolsBtn" onclick="document.execCommand( 'bold',false,null);" title="Bold Highlighted Text"><b>B</b>
    </button>
    <button class="fontStyle toolsBtn" onclick="document.execCommand( 'underline',false,null);" title='Underline Highlighted Text'><u>U</u>
    </button>
    <button class="fontStyle toolsBtn" onclick="document.execCommand( 'strikeThrough',false,null);" title='Strike Highlighted Text'><u id="strike">S</u>
    </button>
  </div>
  `
    note.innerHTML = HTMLdata;
    //!document refers to HTML, there editbtn is comment out
    // //?For some reason, byID is showing null error, use querySelector
    try {
        var editBtn = note.querySelector(".edit");
        var deleteBtn = note.querySelector(".delete");
        var noteText = note.querySelector(".noteText");
        var editor = note.querySelector("#editor");
        var tools = note.querySelector(".tools");
    }
    catch (error) {
        console.log(error)
    }

    // //putting the value coming from local storage
    editor.innerHTML = text;
    noteText.innerHTML = text;

    //delete a note
    deleteBtn.addEventListener('click', () => {
        note.classList.add("animate-ping", "opacity-30");
        setTimeout(() => {
            note.remove();
            updateNote();
        }, 200)
    })

    // edit a note
    editBtn.addEventListener('click', () => {
        editor.classList.toggle('hide');
        tools.classList.toggle('hide');
        noteText.classList.toggle('hide');
        if (editor.classList.contains('hide')) {
            editBtn.innerText = "edit_note";
        }
        else {
            editBtn.innerText = "done";
        }
        //change the textarea content
        const value = editor.innerHTML;
        noteText.innerHTML = value;
        updateNote();
    });

    const ele = note.querySelector('#editor'); //!QuerySelector makes things work

    // Get the placeholder attribute
    const placeholder = ele.getAttribute('data-placeholder');

    // Set the placeholder as initial content if it's empty
    ele.innerHTML === '' && (ele.innerHTML = placeholder);

    ele.addEventListener('focus', function (e) {
        const value = e.target.innerHTML;
        value === placeholder && (e.target.innerHTML = '');
        ele.style.border = "2px solid black";
        ele.style.color = "black"
    });

    ele.addEventListener('blur', function (e) {
        const value = e.target.innerHTML;
        value === '' && (e.target.innerHTML = placeholder);
        ele.style.border = "0";
        // ele.style.color="gray"
        if (ele.innerText === 'Type your note...') {
            ele.style.color = "gray"
        }
    });

    notesContainer.appendChild(note);

    let circle = document.getElementsByClassName("bgcolor-option")[0];
    let smallcircle = document.getElementsByClassName("notecolor-option")[0];

    circle.addEventListener("click", (event) => {
        let t = event.target;
        if (t.classList.contains("circle")) {
            circle.querySelector(".active").classList.remove("active");
            t.classList.add("active");
        }
        document.getElementsByTagName("html")[0].style.background = `${t.id}`
        document.getElementsByTagName("body")[0].style.background = `${t.id}`
        document.getElementById("notesContainer").style.background = `${t.id}`
    });
    smallcircle.addEventListener("click", (event) => {
        let t = event.target;
        if (t.classList.contains("circle")) {
            note.querySelector(".active").classList.remove("active");
            t.classList.add("active");
        }
        note.style.background = `${t.id}`
        if (t.id=="#FFEC9E" ||t.id == "#7AE7B9") {
            noteText.style.color="black";
            tools.style.color="black";    
        }
        else{
            noteText.style.color="white";
            tools.style.color="white";    
        }
    });
}

//getting data from local storage
const notes = JSON.parse(localStorage.getItem('notes'));
if (notes) {
    notes.forEach(note => {
        addNewNote(note);
    });
}
addbtn.addEventListener("click", () => addNewNote()); //!simple addNewNote call wont work here, you have to pass empty parameter using arrow function, normal function wont work para empty para aswell