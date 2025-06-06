// Load saved tasks on page load
window.onload = function() {
    loadTasks();
  };
  function openViewTab() {
    const saved = localStorage.getItem("tasks");
    const tasks = saved ? JSON.parse(saved) : [];
  
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
      <head>
        <title>Saved To-Do Tasks</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          h1 {
            text-align: center;
          }
          ul {
            list-style: none;
            padding: 0;
          }
          li {
            background: #f0f0f0;
            padding: 10px;
            margin-bottom: 8px;
            border-radius: 6px;
          }
        </style>
      </head>
      <body>
        <h1>📋 Saved Tasks</h1>
        <ul>
          ${tasks.map(task => `<li>${task}</li>`).join('')}
        </ul>
      </body>
      </html>
    `);
    newWindow.document.close();
  }
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
