let input = document.querySelector(".container input"),
  button = document.querySelector(".container button"),
  tasksContainer = document.querySelector(".container .tasks"),
  tasksNum = document.querySelector(".tasks-num .num"),
  completedNum = document.querySelector(".finished-num .num"),
  array = [];

// Check if There is Tasks In Local Storage
if (localStorage.getItem("tasks")) {
  array = JSON.parse(localStorage.getItem("tasks"));
}

// Handle Add Button
button.onclick = function() {
  addTasksToArray();
  addTasksToPage(array);
  input.value='';
  input.focus();
}

// Handle Delete Buttons and Finished Tasks
document.addEventListener("click", (e)=> {
  if(e.target.classList.contains('task')) {
    toggleCompletedTask(e.target.dataset.id);
    e.target.classList.toggle("finished");
  }
  else if(e.target.className == 'del') {
    deleteTask(e.target.parentElement.dataset.id);
    e.target.parentElement.remove();
  }
});

// Add Task Object To Array
function addTasksToArray() {
  let task = {
    id: Date.now(),
    value: input.value,
    completed: false,
  }

  array.push(task);
  addTasksToLocalstorage(array);
  getNums(array);
}

// Add Tasks To Local Storage From Array
function addTasksToLocalstorage(arr) {
  localStorage.setItem("tasks", JSON.stringify(arr));
}

// Add Tasks To Page From The Array
function addTasksToPage(arr) {
  tasksContainer.innerHTML = '';
  arr.forEach((el) => {
    let div = document.createElement("div");
    div.className = "task";
    // Check If Task is Finished
    if (el.completed) {
      div.className = "task finished";
    }
    div.setAttribute("data-id", el.id);
    div.appendChild(document.createTextNode(el.value));

    // Create Delete Button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));

    // Append Button To Main Div
    div.appendChild(span);

    // Add Task Div To Tasks Container
    tasksContainer.appendChild(div);
  });
  getNums(array);
}
addTasksToPage(array);

// Delete Task By ID
function deleteTask(id) {
  array = array.filter((el) => el.id != id);
  addTasksToLocalstorage(array);
  getNums(array);
}

// Handle Completed Tasks
function toggleCompletedTask(id) {
  array.forEach((el) => {
    if(el.id == id) {
      (el.completed) ? el.completed = false : el.completed = true;
    }
  });

  addTasksToLocalstorage(array);
  getNums(array);
}

function getNums(arr) {
  let counter = 0;
  tasksNum.innerHTML = arr.length;

  arr.forEach((el) => {
    if(el.completed == true)
      counter++;
  })

  completedNum.innerHTML = counter;
}