// Load saved tasks on page load
window.onload = function() {
    loadTasks();
  };
  
  function addTask() {
    const input = document.getElementById("taskInput");
    const task = input.value.trim();
    if (task === "") return;
  
    const taskList = document.getElementById("taskList");
  
    const li = document.createElement("li");
    li.innerHTML = `${task} <button onclick="removeTask(this)">Delete</button>`;
    taskList.appendChild(li);
  
    saveTasks();
    input.value = "";
  }
  
  function removeTask(btn) {
    btn.parentElement.remove();
    saveTasks();
  }
  
  function saveTasks() {
    const tasks = [];
    const items = document.querySelectorAll("#taskList li");
    items.forEach(item => {
      tasks.push(item.firstChild.textContent.trim());
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  function loadTasks() {
    const saved = localStorage.getItem("tasks");
    if (!saved) return;
  
    const tasks = JSON.parse(saved);
    const taskList = document.getElementById("taskList");
  
    tasks.forEach(task => {
      const li = document.createElement("li");
      li.innerHTML = `${task} <button onclick="removeTask(this)">Delete</button>`;
      taskList.appendChild(li);
    });
  }