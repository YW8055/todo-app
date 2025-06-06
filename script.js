// Load tasks on page load
window.onload = function () {
  loadTasks();
};

function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();

  if (!task) return;

  // Get existing tasks or initialize
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Add the new task
  tasks.push(task);

  // Save back to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Clear input field
  input.value = "";

  // Reload task list
  loadTasks();
}

function loadTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;
    taskList.appendChild(li);
  });
}

function openViewTab() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const newWindow = window.open('', '_blank');
  newWindow.document.write(`
    <html>
    <head>
      <title>View Tasks</title>
      <style>
        body { font-family: Arial; padding: 20px; }
        h1 { text-align: center; }
        ul { list-style: none; padding: 0; }
        li { background: #f0f0f0; padding: 10px; margin-bottom: 8px; border-radius: 6px; }
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
