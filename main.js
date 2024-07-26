// Setting Up Variables
let app = document.querySelector(".app");
let theInput = document.querySelector(".add-task input");
let theAddButton = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let noTasksMsg = document.querySelector(".no-tasks-message");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");

// Focus On Input Field
window.onload = function () {
    theInput.focus();
    
    // Load tasks from local storage
    if (window.localStorage.getItem('tasksContainer')) {
        tasksContainer.innerHTML = window.localStorage.getItem('tasksContainer');
    }
    
    // Calculate tasks after loading from local storage
    calculateTasks();
    
    // Set counts from local storage
    if (window.localStorage.getItem('tasksCount')) {
        tasksCount.innerHTML = window.localStorage.getItem('tasksCount');
    }
    if (window.localStorage.getItem('tasksCompleted')) {
        tasksCompleted.innerHTML = window.localStorage.getItem('tasksCompleted');
    }
};

// Adding The Task
theAddButton.onclick = function () {
    // Check if the input is not empty
    if (theInput.value === "") {
        console.log("empty");
    } else {
        let noTasksMsg = document.querySelector(".no-tasks-message");
        if (noTasksMsg) noTasksMsg.remove();

        // Create the main span element
        let mainSpan = document.createElement("span");

        // Create the delete button span element
        let deleteElement = document.createElement("span");

        // Create the span text with the input value
        let text = document.createTextNode(theInput.value);

        // Create the delete button text
        let deleteText = document.createTextNode("Delete");

        // Add text to the main span
        mainSpan.appendChild(text);

        // Add class to the main span
        mainSpan.className = 'task-box';

        // Add text to the delete button
        deleteElement.appendChild(deleteText);

        // Add class to the delete button 
        deleteElement.className = 'delete';

        mainSpan.appendChild(deleteElement);
        tasksContainer.appendChild(mainSpan);

        theInput.value = "";
        theInput.focus();

        // Recalculate tasks
        calculateTasks();
        
        // Save to Local Storage
        window.localStorage.setItem('tasksContainer', tasksContainer.innerHTML);
        window.localStorage.setItem('tasksCount', tasksCount.innerHTML);
        window.localStorage.setItem('tasksCompleted', tasksCompleted.innerHTML);
    }
};

// Remove Task
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
        // Check number of tasks inside the container 
        if (tasksContainer.childElementCount === 0) {
            createNoTasksMsg();
        }
        // Save to Local Storage
        window.localStorage.setItem('tasksContainer', tasksContainer.innerHTML);
        calculateTasks();
        window.localStorage.setItem('tasksCount', tasksCount.innerHTML);
        window.localStorage.setItem('tasksCompleted', tasksCompleted.innerHTML);
    }

    // Complete Task
    if (e.target.classList.contains('task-box')) {
        e.target.classList.toggle("finished");
        
        // Save to Local Storage
        window.localStorage.setItem('tasksContainer', tasksContainer.innerHTML);
        calculateTasks();
        window.localStorage.setItem('tasksCount', tasksCount.innerHTML);
        window.localStorage.setItem('tasksCompleted', tasksCompleted.innerHTML);
    }
});

// Create and Append the "Delete All" Button 
let deleteAllButton = document.createElement("span");
let deleteAllText = document.createTextNode("Delete All");
deleteAllButton.className = 'delete-all';
deleteAllButton.appendChild(deleteAllText);
app.appendChild(deleteAllButton);

// Delete All Tasks
deleteAllButton.onclick = function () {
    // Remove all task-box elements
    let taskBoxes = tasksContainer.querySelectorAll('.task-box');
    taskBoxes.forEach(task => task.remove());

    // Check number of tasks inside the container
    if (tasksContainer.childElementCount === 0) {
        createNoTasksMsg();
    }
    // Recalculate tasks
    calculateTasks();
    // Save to Local Storage
    window.localStorage.setItem('tasksContainer', tasksContainer.innerHTML);
    window.localStorage.setItem('tasksCount', tasksCount.innerHTML);
    window.localStorage.setItem('tasksCompleted', tasksCompleted.innerHTML);
};

// Create and Append the "Finish All" Button 
let finishAllButton = document.createElement("span");
let finishAllText = document.createTextNode("Finish All");
finishAllButton.className = 'finish-all'; // Use the correct class name
finishAllButton.appendChild(finishAllText);
app.appendChild(finishAllButton);

// Finish All Tasks
finishAllButton.onclick = function () {
    let taskBoxes = tasksContainer.querySelectorAll('.task-box');
    taskBoxes.forEach(task => task.classList.toggle("finished"));
    // Save to Local Storage
    window.localStorage.setItem('tasksContainer', tasksContainer.innerHTML);
    calculateTasks();
    window.localStorage.setItem('tasksCount', tasksCount.innerHTML);
    window.localStorage.setItem('tasksCompleted', tasksCompleted.innerHTML);
};

// Function To Create No Tasks Message
function createNoTasksMsg() {
    // Create Message Span Element
    let msgSpan = document.createElement("span");

    // Create The Text Message
    let msgText = document.createTextNode("No Tasks To Show");

    // Add Text To Message Span Element
    msgSpan.appendChild(msgText);

    // Add Class To Message Span
    msgSpan.className = 'no-tasks-message';

    // Append The Message Span Element
    tasksContainer.appendChild(msgSpan);
}

// Function To Calculate Tasks
function calculateTasks() {
    // Calculate All Tasks
    tasksCount.innerHTML = document.querySelectorAll('.tasks-content .task-box').length;

    // Calculate Completed Tasks
    tasksCompleted.innerHTML = document.querySelectorAll('.tasks-content .finished').length;
}
