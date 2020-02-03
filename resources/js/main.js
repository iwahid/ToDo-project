console.log("It works.. cool!")

// Create svg icon for "complete" and "delete" buttons
let delete_svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px" ><path class="fill" fill="#F44336" d="M21.5 4.5H26.501V43.5H21.5z" transform="rotate(45.001 24 24)"/><path path class="fill" fill="#F44336" d="M21.5 4.5H26.5V43.501H21.5z" transform="rotate(135.008 24 24)"/></svg>`
let complete_svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px" ><path class="fill" fill="#43A047" d="M40.6 12.1L17 35.7 7.4 26.1 4.6 29 17 41.3 43.4 14.9z"/></svg>`

// Variables
let new_task_input = document.getElementById("new-task__input") // Input value of using for create new task
let add_new_item = document.getElementById("add-new-item") // create button
// ul list-items (with them id)
let todo_uncomplete = document.getElementById("todo__uncomplete")
let todo_uncomplete_id = "todo__uncomplete"

let todo_complete = document.getElementById("todo__complete")
let todo_complete_id = "todo__complete"


//add new item to todo list. First event listener (mouse click)
add_new_item.addEventListener("click", function(){
    createNewItem()
}  )
// ||
//add new item to todo list. Second event listener (key press)
new_task_input.addEventListener("keypress", function(event){ 
     if (event.key==="Enter") createNewItem()
     else //if (event.key==="1") console.log("Input clear!") // even.key==="Escape"*/
     console.log(event.key)
})

// item creation function itself
function createNewItem (){
        console.log(`function "createNewItem" initialized`)
        let textValue = new_task_input.value//document.getElementById("item").value
        if (textValue){
            console.log("New value: " + textValue)
            addNewItemToList(textValue)
        } else {
            console.log("New value is empty")
        }
}

// delete current item of the list-items (I doing in accordance with the principle: one function - one action. That comment add to docs of project (readmy))
function deleteItem(){
    let itemChild = this.parentNode.parentNode // current item
    let parentOfItem = this.parentNode.parentNode.parentNode // parent of current child.// Depth of properties depends on the nesting of elements: li/buttons/button
    parentOfItem.removeChild(itemChild)
}

// transposition item from uncomplete into complete list. And back a round
function transpositionItem (){
    let itemChild = this.parentNode.parentNode // current item
    let parentOfItem = this.parentNode.parentNode.parentNode //or item.parentNode // parent of current child 

    //Determine from which list current element
    let destenationList = (parentOfItem.id == todo_uncomplete_id) ? todo_complete : todo_uncomplete
    
    //transposition to "complete" list
    
    destenationList.insertBefore(itemChild, destenationList.childNodes[0])
    console.log("item transposition from " + itemChild + " to " + destenationList)
}


// Function of create new item in ToDo-complete list Items
function addNewItemToList(textValue){
    console.log(`function "addNewItemToList" initialized`)
    let uncomplete_list_item = document.getElementById("todo__uncomplete")
    uncomplete_list_item.classList.add("todo__uncomplete")

    let uncomplete_item = document.createElement("li")
    uncomplete_item.classList.add("uncomplete__item")

    let uncomplete_item_text = document.createElement("span")
    uncomplete_item_text.innerText = textValue // adding just text

    let uncomplete_item_buttons = document.createElement("div")
    uncomplete_item_buttons.classList.add ("uncomplete-item__buttons") 

    // buttons 
    let button_delete = document.createElement ('button')
    button_delete.classList.add("uncomplete-item__button")
    button_delete.classList.add("button-delete") // two classes
    button_delete.innerHTML = delete_svg // adding real HTML into html element
    
    // event listener for "delete" button
    button_delete.addEventListener("click", deleteItem)

    let button_complete = document.createElement("button")
    button_complete.classList.add("uncomplete-item__button") 
    button_complete.classList.add("button-complete") //two classes
    button_complete.innerHTML = complete_svg

    // event listener for "complete" button
    button_complete.addEventListener("click", transpositionItem)
    // buttons (end)

    // Adding now created items to parent items. Matryoshka-style princip. Do not forget about the sequence: first buttons of delete, second of complete
    uncomplete_item_buttons.appendChild(button_delete)
    uncomplete_item_buttons.appendChild(button_complete)
    

    uncomplete_item.appendChild(uncomplete_item_text)
    uncomplete_item.appendChild(uncomplete_item_buttons)
  

    uncomplete_list_item.insertBefore(uncomplete_item, uncomplete_list_item.childNodes[0]) // uncomplete_list_item.appendChild(uncomplete_item) //reverse sequence
    
    console.log("Create new item and an includes that to uncomplete list")

    new_task_input.value="" // clear

} 