const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskContainer = document.getElementById('task-container');


addTaskButton.addEventListener('click', function() {
    const taskText = taskInput.value.trim();
    const newTasks={
        text: taskInput.value,
        completed: false,
    };

    if (taskText === '') {
    alert('Please enter a task.');
    }else{
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(newTasks);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        
        const listItem = document.createElement('div');
        listItem.className = 'task-item'; 
        //text task
        let text=document.createElement('div');
        text.className = 'task-text';
        text.textContent = taskText;
        listItem.appendChild(text);
        taskContainer.appendChild(listItem);
        
        let actions = document.createElement('div');
        actions.className = 'task-actions';
        listItem.appendChild(actions);
        //check icon
        let span = document.createElement('span');
        let checkPhoto = document.createElement('img');
        checkPhoto.src = 'photos/correct.png';
        checkPhoto.alt = 'Completed';
        checkPhoto.width = 20;
        checkPhoto.height = 20;
        span.appendChild(checkPhoto);
        span.className = 'checkMark';
        actions.appendChild(span);

       

       //delete icon
        let deleteButton = document.createElement('button');
        let deletePhoto = document.createElement('img');
        deletePhoto.src = 'photos/recycle-bin.png';
        deletePhoto.alt = 'Delete';
        deletePhoto.width = 20;
        deletePhoto.height = 20;
        deleteButton.appendChild(deletePhoto);
        deleteButton.className = 'deleteButton';
        actions.appendChild(deleteButton);

        //check event
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

    }
});
      //event delete
        deleteButton.addEventListener('click', function() {
            taskContainer.removeChild(listItem);
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks = tasks.filter(t => t.text !== taskText);
            localStorage.setItem("tasks", JSON.stringify(tasks));

        });

        taskInput.value = '';
        taskInput.focus();
        
        
    }    
}); 
