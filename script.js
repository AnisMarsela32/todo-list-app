document.addEventListener('DOMContentLoaded', loadTasks);

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', addTask);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskElement(task);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const task = { text: taskText, id: Date.now() };
    createTaskElement(task);
    saveTaskToLocalStorage(task);
    taskInput.value = '';
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);
    li.innerHTML = `
        <span>${task.text}</span>
        <div>
            <button class="edit" onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Hapus</button>
        </div>
    `;
    taskList.appendChild(li);
}

function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(id) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    document.querySelector(`li[data-id='${id}']`).remove();
}

function editTask(id) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(task => task.id === id);
    if (task) {
        taskInput.value = task.text;
        deleteTask(id);
    }
}