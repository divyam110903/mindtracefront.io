const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let tasks = [];

function addTask() {
  if (inputBox.value === '') {
    alert("You must add something!");
  } else {
    const newTask = { text: inputBox.value, _id: Date.now() }; // Simulated _id with timestamp
    tasks.push(newTask);
    renderTask(newTask);
    saveData();
    inputBox.value = "";
  }
}

listContainer.addEventListener('click', function (e) {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle("checked");
  } else if (e.target.tagName === "SPAN") {
    const taskId = e.target.parentElement.dataset.id;
    tasks = tasks.filter(task => task._id != taskId);
    e.target.parentElement.remove();
    saveData();
  }
}, false);

function renderTask(task) {
  let li = document.createElement('li');
  li.innerHTML = task.text;
  li.dataset.id = task._id; 
  listContainer.appendChild(li);
  let span = document.createElement('span');
  span.innerHTML = "X";
  li.appendChild(span);
}

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTask() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    tasks.forEach(task => renderTask(task));
  }
}

showTask();
