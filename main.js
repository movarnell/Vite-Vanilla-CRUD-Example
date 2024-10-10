import './style.css'
import { getData, postData, putData, deleteData } from './api/apiService.js';

const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

// ANCHOR: Event Listeners
// NOTE: Load todos when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadTodos);

// SECTION: Add new todo
todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const todoText = todoInput.value.trim(); // This will remove leading and trailing whitespaces
    if (todoText) {
        const newTodo = { text: todoText, completed: false };
        await addTodo(newTodo); // Calls the addTodo function from the API
        todoInput.value = '';
        await loadTodos();
    }
});
// !SECTION

// ANCHOR: Functions
// SECTION: Load Todos
async function loadTodos() {
    try {
        const todos = await getData();
        displayTodos(todos);
    } catch (error) {
        // ERROR: Handle loading todos error
        console.error('Error loading todos:', error);
    }
}
// !SECTION

// SECTION: Display Todos
function displayTodos(todos) {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <div>
                <input type="checkbox" class="form-check-input me-2" ${todo.completed ? 'checked' : ''}>
                <span class="${todo.completed ? 'text-decoration-line-through' : ''}">${todo.text}</span>
            </div>
            <div>
                <button class="btn btn-sm btn-outline-primary me-2 edit-btn">Edit</button>
                <button class="btn btn-sm btn-outline-danger delete-btn">Delete</button>
            </div>
        `;

        // NOTE: Event listeners for todo item actions
        // REVIEW: Consider extracting these to separate functions for better readability
        const checkbox = li.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => toggleTodoCompletion(todo.id, checkbox.checked));

        const editBtn = li.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => editTodo(todo.id, todo.text));

        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

        todoList.appendChild(li);
    });
}
// !SECTION

// SECTION: Add Todo
async function addTodo(todo) {
    try {
        await postData(todo);
    } catch (error) {
        // ERROR: Handle adding todo error
        console.error('Error adding todo:', error);
    }
}
// !SECTION

// SECTION: Toggle Todo Completion
async function toggleTodoCompletion(id, completed) {
    try {
        await putData(id, { completed });
        await loadTodos();
    } catch (error) {
        // ERROR: Handle updating todo error
        console.error('Error updating todo:', error);
    }
}
// !SECTION

// SECTION: Edit Todo
function editTodo(id, currentText) {
    const newText = prompt('Edit todo:', currentText);
    if (newText !== null && newText.trim() !== '') {
        updateTodo(id, newText.trim());
    }
}
// !SECTION

// SECTION: Update Todo
async function updateTodo(id, newText) {
    try {
        await putData(id, { text: newText });
        await loadTodos();
    } catch (error) {
        // ERROR: Handle updating todo error
        console.error('Error updating todo:', error);
    }
}
// !SECTION

// SECTION: Delete Todo
async function deleteTodo(id) {
    if (confirm('Are you sure you want to delete this todo?')) {
        try {
            await deleteData(id);
            await loadTodos();
        } catch (error) {
            // ERROR: Handle deleting todo error
            console.error('Error deleting todo:', error);
        }
    }
}
// !SECTION

// ANCHOR: App HTML
// NOTE: This section seems to be unrelated to the todo app functionality
document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

// REVIEW: This function call is not defined in the provided code
setupCounter(document.querySelector('#counter'))
