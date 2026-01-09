let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const clearCompletedBtn = document.getElementById('clearCompleted');

function init(){
    renderTasks();

    addTaskBtn.addEventListener('click',addTask);
    taskInput.addEventListener('keypress',(e)=>{
        if (e.key ==='Enter') addTask();
    });
    clearCompletedBtn.addEventListener('click', clearCompleted);
}

function addTask(){
    const text = taskInput.value.trim();
    if (!text) return;

    const newTask = {
        id:Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);
    saveAndRender();
    taskInput.value='';
    taskInput.focus();
}

function toggleTask(id){
    tasks = tasks.map(task =>
        task.id === id? { ...task,completed: !task.completed} : task
    );
    saveAndRender();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveAndRender();
}

function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <div class="task-checkbox ${task.completed ? 'completed' : ''}" onclick="toggleTask(${task.id})">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <span class="task-text">${task.text}</span>
            <span class="status-badge ${task.completed ? 'status-completed' : 'status-pending'}">
                ${task.completed ? 'Completed' : 'Pending'}
            </span>
            <button class="delete-btn" onclick="deleteTask(${task.id})" aria-label="Delete task">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
        `;
        
        taskList.appendChild(li);
    });
    const activeCount = tasks.filter(t => !t.completed).length;
    taskCount.textContent = `${activeCount} task${activeCount !== 1 ? 's' : ''} left`;
}

window.toggleTask = toggleTask;
window.deleteTask = deleteTask;

init();