const todoValue = document.getElementById("todoText"),
    listItems = document.getElementById("list-items"),
    addUpdateClick = document.getElementById("AddUpdateClick"),
    updateText = document.getElementById("updateText");

todoValue.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addUpdateClick.click();
    }
});

function CreateToDoData(){
    if(todoValue.value === ""){
        alert("Please enter your todo text!");
        todoValue.focus();
        return;
    }

    let li = document.createElement("li");
    const todoItems = `<div onclick="CompleteTodoItem(this)">${todoValue.value}</div><div><img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="/images/pencil.png" /><img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="/images/delete.png"/></div>`;

    li.innerHTML = todoItems;
    listItems.appendChild(li);
    todoValue.value = "";
}

function CompleteTodoItem(element){
    if(element.style.textDecoration === "") {
        element.style.textDecoration = "line-through";
    } else {
        element.style.textDecoration = "";
    }
}

function UpdateOnSelectionItems(){
    updateText.innerText = "Updating: " + todoValue.value;
    addUpdateClick.setAttribute("onclick", "CreateToDoData()");
    addUpdateClick.setAttribute("src", "/images/plus.png");
    updateText.style.display = "none";
    todoValue.value = "";
}

function UpdateToDoItems(e){
    let divText = e.parentElement.parentElement.querySelector("div");
    if(divText.style.textDecoration === "") {
        todoValue.value = divText.innerText;
        addUpdateClick.setAttribute("onclick", "UpdateOnSelectionItems()");
        addUpdateClick.setAttribute("src", "/images/ripres.png");
        updateText.innerText = "Updating: " + todoValue.value;
        updateText.style.display = "block";
    }
}

function DeleteToDoItems(e){
    let listItem = e.parentElement.parentElement;
    listItem.parentNode.removeChild(listItem);
}

function UpdateTextOnClick(){
    let updatingText = updateText.innerText.replace("Updating: ", ""); // Mengambil teks yang diupdate
    let listItemToUpdate = listItems.querySelector("div[contenteditable='true']");
    if (listItemToUpdate) {
        listItemToUpdate.innerText = updatingText; // Memperbarui teks di dalam elemen daftar
        updateText.innerText = ""; // Mengosongkan teks yang diupdate
        updateText.style.display = "none"; // Menyembunyikan elemen teks yang menampilkan pesan "Updating:"
        addUpdateClick.setAttribute("src", "/images/pencil.png"); // Mengembalikan ikon tombol ke "pencil"

        // Jika ada elemen yang sedang diupdate, hapus atribut contenteditable
        listItemToUpdate.removeAttribute("contenteditable");
    }
}
