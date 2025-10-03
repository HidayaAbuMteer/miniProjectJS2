const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskContainer = document.getElementById('task-container');


addTaskButton.addEventListener('click', function() {
    const taskText = taskInput.value.trim();
    const newTasks={
        text: taskInput.value,
        completed: false,
    }

    if (taskText === '') {
    alert('Please enter a task.');
    }else{
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(newTasks);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        const listItem = document.createElement('div');
        listItem.className = 'task-item';
        listItem.innerHTML= taskText;
        taskContainer.appendChild(listItem);

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';
        listItem.appendChild(deleteButton);

        deleteButton.addEventListener('click', function() {
            taskContainer.removeChild(listItem);
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks = tasks.filter(t => t.text !== taskText);
            localStorage.setItem("tasks", JSON.stringify(tasks));

        });
        taskInput.value = '';
        taskInput.focus();

        let span = document.createElement('span');
        span.className = 'checkMark';
        listItem.prepend(span);

        span.addEventListener('click', function() {
            newTasks.completed = !newTasks.completed;
            if (newTasks.completed) {
                listItem.classList.add('completed');
                    span.classList.add('checked');      
            } else {
                listItem.classList.remove('completed');
                span.classList.remove('checked');
            }

            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            const task = tasks.find(t => t.text === taskText);
            if (task) {
                task.completed = newTasks.completed;
                localStorage.setItem("tasks", JSON.stringify(tasks));

    }}
    
    )};
});

