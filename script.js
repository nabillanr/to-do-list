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

// Fungsi untuk mengambil daftar "to-do list" dari server saat halaman dimuat
window.onload = function() {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => {
            data.forEach(todo => {
                createTodoItem(todo.title, todo.completed);
            });
        })
        .catch(error => {
            console.error('Gagal mengambil data dari server:', error);
        });
};

// Fungsi untuk membuat item "to-do list" baru
function createTodoItem(text, completed) {
    let li = document.createElement("li");
    const todoItems = `<div onclick="CompleteTodoItem(this)" ${completed ? 'style="text-decoration: line-through;"' : ''}>${text}</div><div><img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="/images/pencil.png" /><img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="/images/delete.png"/></div>`;

    li.innerHTML = todoItems;
    listItems.appendChild(li);
}

// Fungsi untuk menyimpan "to-do list" ke server
function saveTodoList() {
    const todos = [];
    document.querySelectorAll('#list-items > li > div:first-child').forEach(todo => {
        todos.push({
            title: todo.innerText,
            completed: todo.style.textDecoration === "line-through"
        });
    });

    // Kirim data "to-do list" ke server menggunakan metode POST
    fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify(todos),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data berhasil disimpan:', data);
    })
    .catch(error => {
        console.error('Gagal menyimpan data:', error);
    });
}

// Panggil fungsi saveTodoList setiap kali ada perubahan pada "to-do list"
listItems.addEventListener('DOMSubtreeModified', saveTodoList);

