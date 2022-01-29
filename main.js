
// taking in variables
const text_input = document.querySelector(".text-input")
const gen_btn = document.querySelector(".gen-btn")
const lorem_container = document.querySelector(".lorem-container")


// calling the gen_lorem function upon click

gen_btn.addEventListener("click", gen_lorem)


function gen_lorem(){

    lorem_container.innerHTML += `<p>lorem100</p>`
}