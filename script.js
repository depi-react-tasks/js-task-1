// ---------- To-Do list ----------

// getting the elements from the page
var taskInput = document.getElementById("taskInput");
var addBtn = document.getElementById("addBtn");
var taskList = document.getElementById("taskList");
var emptyMsg = document.getElementById("emptyMsg");

// the array that has all the tasks
// first we check if there is something saved in localStorage
var tasks = [];
var savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
  tasks = JSON.parse(savedTasks); // localStorage saves text only so we convert it back to an array
}

// save the array in localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// show all the tasks on the page
function showTasks() {
  taskList.innerHTML = ""; // clear the list first

  for (var i = 0; i < tasks.length; i++) {
    var li = document.createElement("li");

    var span = document.createElement("span");
    span.textContent = tasks[i];

    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "deleteBtn";
    deleteBtn.setAttribute("data-index", i); // remember which task this button belongs to

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }

  // show the "No tasks yet" message only when the list is empty
  if (tasks.length == 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
  }
}

// add a new task
function addTask() {
  var text = taskInput.value;
  if (text.trim() == "") {
    return; // do nothing if the input is empty
  }
  tasks.push(text);
  saveTasks();
  showTasks();
  taskInput.value = "";
}

addBtn.addEventListener("click", addTask);

// also add the task when we press Enter
taskInput.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    addTask();
  }
});

// delete a task when its Delete button is clicked
taskList.addEventListener("click", function (event) {
  if (event.target.className == "deleteBtn") {
    var index = event.target.getAttribute("data-index");
    tasks.splice(index, 1); // remove 1 item from the array
    saveTasks();
    showTasks();
  }
});

// show the saved tasks when the page opens
showTasks();


// ---------- setInterval and clearInterval ----------

var counter = document.getElementById("counter");
var seconds = 0;
var intervalId = null; // we keep the id so we can stop it later

document.getElementById("startInterval").addEventListener("click", function () {
  if (intervalId != null) {
    return; // it is already running
  }
  // this function runs every 1000 ms (1 second)
  intervalId = setInterval(function () {
    seconds++;
    counter.textContent = seconds + " s";
  }, 1000);
});

document.getElementById("stopInterval").addEventListener("click", function () {
  clearInterval(intervalId); // stop the interval
  intervalId = null;
});


// ---------- setTimeout and clearTimeout ----------

var timeoutMsg = document.getElementById("timeoutMsg");
var timeoutId = null;

document.getElementById("startTimeout").addEventListener("click", function () {
  clearTimeout(timeoutId); // clear the old one if the user clicks twice
  timeoutMsg.textContent = "Waiting 3 seconds...";
  // this function runs only one time after 3000 ms
  timeoutId = setTimeout(function () {
    timeoutMsg.textContent = "Timeout finished! Hello after 3 seconds.";
  }, 3000);
});

document.getElementById("stopTimeout").addEventListener("click", function () {
  clearTimeout(timeoutId); // cancel it before it runs
  timeoutMsg.textContent = "Timeout cancelled.";
});
