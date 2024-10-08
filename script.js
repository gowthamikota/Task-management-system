let todos = JSON.parse(localStorage.getItem("todos")) || [];
function generateId() {
    return todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
}

function saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to display the todo list
function displayTodos() {
    const todoTableBody = document.querySelector("#todoTable tbody");
    todoTableBody.innerHTML = "";

    todos.forEach(todo => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${todo.id}</td>
            <td>${todo.desc}</td>
            <td>${todo.category}</td>
            <td>${todo.priority}</td>
            <td>${todo.status}</td>
            <td>
                <button onclick="editTodo(${todo.id})">Edit</button>
                <button onclick="deleteTodo(${todo.id})">Delete</button>
            </td>
        `;

        todoTableBody.appendChild(row);
    });
}

// Function to delete a todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveToLocalStorage();
    displayTodos();
}

// Function to edit a todo
function editTodo(id) {
    const todo = todos.find(todo => todo.id === id);

    document.getElementById("todoId").value = todo.id;
    document.getElementById("desc").value = todo.desc;
    document.getElementById("category").value = todo.category;
    document.getElementById("priority").value = todo.priority;
    document.getElementById("status").value = todo.status;
}

// Function to update a todo
function updateTodo(updatedTodo) {
    todos = todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo);
    saveToLocalStorage();
    displayTodos();
}

// Form submission event listener
document.getElementById("todoForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const todoId = document.getElementById("todoId").value;
    const desc = document.getElementById("desc").value;
    const category = document.getElementById("category").value;
    const priority = document.getElementById("priority").value;
    const status = document.getElementById("status").value;

    if (todoId) {
        // Update existing todo
        const updatedTodo = { id: parseInt(todoId), desc, category, priority, status };
        updateTodo(updatedTodo);
    } else {
        // Add new todo
        const newTodo = { id: generateId(), desc, category, priority, status };
        todos.push(newTodo);
        saveToLocalStorage();
    }

    // Reset form
    document.getElementById("todoForm").reset();
    document.getElementById("todoId").value = '';

    displayTodos();
});

// Initial display of todos
displayTodos();