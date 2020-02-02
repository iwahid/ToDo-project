console.log("It works.. cool!")

//add new item to todo list
document.getElementById("add-new-item").addEventListener("click", function(){
    console.log("Button click")
    let textValue = document.getElementById("item").value
    if (textValue) console.log("New value: " + textValue)
    else console.log("New value is empty")
})
