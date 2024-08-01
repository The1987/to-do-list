console.log("--> loading... to-do list app...");
console.log("--> 👋 Jonny");
console.log("--> You found an Easter 🥚!");

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const input = document.getElementById('task-input');
    const button = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');
    
    // Function to load tasks from local storage and display them
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTaskToList(task.text, task.completed);
        });
    }
    
    // Function to handle adding a task
    function handleButtonClick(event) {
        event.preventDefault();
        const taskText = input.value.trim();
        
        if (taskText) {
            const task = { text: taskText, completed: false };
            addTaskToList(task.text, task.completed);
            saveTaskToLocalStorage(task);
            input.value = '';
        } else {
            alert('Please enter a task.');
        }
    }

    // Function to add a task to the list
    function addTaskToList(text, completed) {
        const listItem = document.createElement('li');
        listItem.classList.add('task-item');
        if (completed) {
            listItem.classList.add('completed');
        }

        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = completed;
        checkbox.classList.add('task-checkbox');
        checkbox.addEventListener('change', () => {
            listItem.classList.toggle('completed', checkbox.checked);
            updateTaskInLocalStorage(text, checkbox.checked);
        });
        
        // Create task text
        const taskText = document.createElement('span');
        taskText.textContent = text;
        taskText.classList.add('task-text');
        
        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            removeTaskFromList(text, listItem);
        });
        
        listItem.appendChild(checkbox);
        listItem.appendChild(taskText);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    }

    // Function to save task to local storage
    function saveTaskToLocalStorage(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to update a task in local storage
    function updateTaskInLocalStorage(text, completed) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.map(task => {
            if (task.text === text) {
                return { ...task, completed };
            }
            return task;
        });
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Function to remove a task from the list
    function removeTaskFromList(text, listItem) {
        listItem.remove();
        removeTaskFromLocalStorage(text);
    }

    // Function to remove a task from local storage
    function removeTaskFromLocalStorage(text) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter(task => task.text !== text);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Attach the event listener to the button
    button.addEventListener('click', handleButtonClick);

    // Load tasks from local storage on page load
    loadTasks();
});
