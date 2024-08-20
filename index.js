// Get references to DOM elements
const taskMessage = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addButton = document.getElementById('addButton');
const sortButton = document.getElementById('sortButton');
const filterButton = document.getElementById('filterButton');
const clearButton = document.getElementById('clearButton');
const filterInput = document.getElementById('filterInput');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

// Function to add a new task
function addTask() {
    const taskText = taskMessage.value.trim();
    
    if (taskText === '') {
        alert('Task cannot be empty');
        return;
    }

    const newTask = createTaskElement(taskText);
    taskList.appendChild(newTask);
    saveTaskToLocalStorage(taskText);

    // Clear the input field
    taskMessage.value = '';
}

// Function to create a task element
function createTaskElement(taskText) {
    const newTask = document.createElement('li');
    newTask.className = 'list-group-item d-flex justify-content-between align-items-center';
    newTask.textContent = taskText;

    const removeButton = document.createElement('button');
    removeButton.className = 'btn btn-danger btn-sm';
    removeButton.textContent = 'Remove';
    removeButton.onclick = () => removeTask(newTask, taskText);

    newTask.appendChild(removeButton);
    return newTask;
}

// Function to remove a task
function removeTask(taskItem, taskText) {
    taskList.removeChild(taskItem);
    removeTaskFromLocalStorage(taskText);
}

// Function to sort tasks alphabetically
function sortTasks() {
    const tasks = Array.from(taskList.children);
    tasks.sort((a, b) => a.textContent.localeCompare(b.textContent));

    // Re-append sorted tasks
    taskList.innerHTML = '';
    tasks.forEach(task => taskList.appendChild(task));

    // Update localStorage with the sorted tasks
    updateLocalStorage();
}

// Function to filter tasks based on input
function filterTasks() {
    const filterValue = filterInput.value.toLowerCase();
    const tasks = Array.from(taskList.children);

    tasks.forEach(task => {
        const taskText = task.firstChild.textContent.toLowerCase();
        task.style.display = taskText.includes(filterValue) ? 'flex' : 'none';
    });
}

// Function to clear all tasks
function clearTasks() {
    taskList.innerHTML = '';
    localStorage.removeItem('tasks');
}

// Function to save a task to localStorage
function saveTaskToLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to remove a task from localStorage
function removeTaskFromLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasksFromLocalStorage() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(taskText => {
        const taskElement = createTaskElement(taskText);
        taskList.appendChild(taskElement);
    });
}

// Function to update localStorage after sorting
function updateLocalStorage() {
    const tasks = Array.from(taskList.children).map(task => task.firstChild.textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to get tasks from localStorage
function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Event listeners
addButton.onclick = addTask;
sortButton.onclick = sortTasks;
filterButton.onclick = filterTasks;
clearButton.onclick = clearTasks;
