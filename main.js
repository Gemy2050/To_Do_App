let input = document.querySelector(".container input"),
  button = document.querySelector(".container .add-btn"),
  tasksContainer = document.querySelector(".container .tasks"),
  tasksNum = document.querySelector(".tasks-num .num"),
  completedNum = document.querySelector(".finished-num .num"),
  array = [];
  editId = null;
// Check if There is Tasks In Local Storage
if (localStorage.getItem("tasks")) {
  array = JSON.parse(localStorage.getItem("tasks"));
}

// Handle Add Button
button.onclick = function() {
  if (input.value == "" || input.value == null) {
    alert("Please, Enter Valid Text");
    return false;
  }
  if(button.textContent == 'Add') {
    addTasksToArray();
  } else if(button.textContent == 'Edit') {
    editArrayTask(editId);
    addTasksToLocalstorage(array);
    button.textContent = 'Add';
  }
  addTasksToPage(array);
  input.value = '';
  input.focus();
}
// Use Enter Button as Add Button
input.onkeyup = function (e) {
  if (e.key == "Enter") button.click();
};

// Handle Delete Buttons and Finished Tasks
document.addEventListener("click", (e)=> {
  if(e.target.classList.contains('task')) {
    toggleCompletedTask(e.target.dataset.id);
    e.target.classList.toggle("finished");
    getNums(array);
  } else if(e.target.classList.contains('task-text')) {
    toggleCompletedTask(e.target.parentElement.dataset.id);
    e.target.parentElement.classList.toggle("finished");
    getNums(array);
  }
  else if(e.target.className == 'del') {
    deleteTask(e.target.parentElement.parentElement.dataset.id);
    e.target.parentElement.parentElement.remove();
    getNums(array);
  } else if(e.target.className == 'edit') {
    editTask(e.target.parentElement.parentElement.dataset.id);
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

    let textSpan = document.createElement("span");
    textSpan.className = 'task-text';
    textSpan.appendChild(document.createTextNode(el.value))

    div.appendChild(textSpan);

    // Create Delete Button
    let deleteSpan = document.createElement("span");
    deleteSpan.className = "del";
    deleteSpan.appendChild(document.createTextNode("Delete"));


    // Create Edit Button
    let editSpan = document.createElement("span");
    editSpan.className = "edit";
    editSpan.appendChild(document.createTextNode("Edit"));

    // Create Buttons Parent
    let btnsParent = document.createElement("div");
    btnsParent.className = "btns-parent";
    // Append Buttons
    btnsParent.appendChild(deleteSpan);
    btnsParent.appendChild(editSpan);

    // Append Buttons Parent To Main Div
    div.appendChild(btnsParent);


    // Add Task Div To Tasks Container
    tasksContainer.appendChild(div);
  });
}
addTasksToPage(array);

// Delete Task By ID
function deleteTask(id) {
  array = array.filter((el) => el.id != id);
  addTasksToLocalstorage(array);
}

// Handle Editing
function editTask(id) {
  array.forEach((el) => {
    if(el.id == id) {
      input.value = el.value;
      input.focus();
      button.textContent = 'Edit';
    }
  });

  editId = id;
}

// Edit Task Value
function editArrayTask(id) {
  array.forEach((el) => {
    if(el.id == id) {
      el.value = input.value;
      button.textContent = 'Add';
      input.value = '';
    }
  })
}

// Handle Completed Tasks
function toggleCompletedTask(id) {
  array.forEach((el) => {
    if(el.id == id) {
      (el.completed) ? el.completed = false : el.completed = true;
    }
  });

  addTasksToLocalstorage(array);
}

// Get Tasks Count
function getNums(arr) {
  tasksNum.innerHTML = arr.length;

  completedNum.innerHTML = document.querySelectorAll(".finished").length;
}
getNums(array);