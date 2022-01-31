
// taking the variables
const text_input = document.querySelector(".text-input")
const open_modal = document.querySelector(".open-modal")
const close_modal = document.querySelector(".close-modal")
const clear_btn = document.querySelector(".clear-btn")
const overlay = document.querySelector(".overlay")

const modal_input = document.querySelector(".modal-input")
const add_note = document.querySelector(".add-note")

const notes_section = document.querySelector(".notes-section")
const modal = document.querySelector(".modal")


// getting the already added notes from the local storage and adding it to the DOM
window.onload = ()=>{

    get_from_ls()
}


// clear the input field
clear_btn.addEventListener("click", ()=>{

    text_input.value = ""
})

// viewing the modal in the DOM
open_modal.addEventListener("click", view_modal)


function view_modal(){
    if(text_input.value == "") return
    
    modal.classList.add("display-modal")
    overlay.classList.add("display-overlay")

    document.querySelector(".note-modal-heading").textContent = text_input.value;

}

// closing the input modal when clicked on the top right cross

close_modal.addEventListener("click", close_modal_fn)

function close_modal_fn(){
   
    modal.classList.remove("display-modal")
    overlay.classList.remove("display-overlay")
    text_input.value = ""
}



// Adding the modal note to the DOM

add_note.addEventListener("click", add_notes)


let id_count = 0
function add_notes(){
    if(modal_input.value == "") return

    // creating the note object
    let myobj = {
        "id": id_count++,
        "heading": text_input.value,
        "content": modal_input.value
    }

    notes_section.innerHTML += `
    <div class="notes-container" id="${myobj.id}">
            <h2 class="note-heading">${myobj.heading}</h2>
            <p>${myobj.content}</p>
            <span class="material-icons edit-note">edit</span>
           <span class="material-icons delete-note">delete</span>
    </div>`

    add_to_ls(myobj)

    text_input.value = ""
    modal_input.value = ""    
    close_modal_fn()
    
}


// ----Local Storage code----

// adding the note to the local storage

function add_to_ls(myobj){

    // creating and array
    let notes
    if(JSON.parse(localStorage.getItem("notes")===null))
    {
        notes = []
    }
    else{
        notes = JSON.parse(localStorage.getItem("notes"))
    }

    notes.push(myobj)
    localStorage.setItem("notes", JSON.stringify(notes))
}

// Get the notes from local storage

function get_from_ls(){
    
    // getting the notes from the local storage
    let notes
    if(JSON.parse(localStorage.getItem("notes")===null))
    {
        notes = []
    }
    else{
        notes = JSON.parse(localStorage.getItem("notes"))
    }

    // adding the notes to the DOM

    notes.forEach(note => {
        
        
        notes_section.innerHTML += `
        <div class="notes-container" id="${note.id}">
        <h2 class="note-heading">${note.heading}</h2>
        <p>${note.content}</p>
        <span class="material-icons edit-note">edit</span>
        <span class="material-icons delete-note">delete</span>
        </div>`
        
    });

    // updating the id value
    id_count = note.id
}


// -------Deleting the note-------

// getting the notes container which needs to be deleted

notes_section.addEventListener("click", (e)=>{
    if (e.target.classList.contains("delete-note")) {
        delete_note(e.target.parentElement)
    }
})



// delete from the local storage and the DOM

function delete_note(parentElement){
    
    let notes = JSON.parse(localStorage.getItem("notes"))
    notes.splice(parentElement.id, 1)
    localStorage.setItem("notes", JSON.stringify(notes))

    parentElement.remove()
    
}



// -----------Editing the note-----------

