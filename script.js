class Task {
  constructor(description) {
    this.description = description;
    this.completed = false;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }
}

class TodoList {
  constructor() {
    this.tasks = this.loadTasks();
  }

  addTask(description) {
    const newTask = new Task(description);
    this.tasks.push(newTask);
    this.saveTasks();
  }

  removeTask(index) {
    this.tasks.splice(index, 1);
    this.saveTasks();
  }

  toggleTask(index) {
    this.tasks[index].toggleComplete();
    this.saveTasks();
  }

  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    return savedTasks
      ? savedTasks.map((taskData) => new Task(taskData.description))
      : [];
  }
}

const todoList = new TodoList();

document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-button");
  const taskInput = document.getElementById("taskInput");
  const taskListElement = document.getElementById("taskList");

  function renderTasks() {
    const taskListElement = document.getElementById("taskList");

    let taskListHTML = "";

    todoList.tasks.forEach((task, index) => {
      taskListHTML += `
        <li onclick="toggleTask(${index})" style="position: relative; cursor: pointer; text-decoration: ${
        task.completed ? "line-through" : "none"
      };">
      <span style="position: absolute; top: 9px;  left: -40px; width: 24px; height: 24px; background-image: url(${
        task.completed ? "/img/check.png" : "/img/circle.png"
      }); background-size: cover; background-position: center;"></span>
      ${task.description}
<button class="delete-task-button" data-index="${index}">X</button>
        </li>
      `;
    });
    

    taskListElement.innerHTML = taskListHTML;
  }
  document.getElementById("taskList").addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-task-button")) {
      const index = Number(event.target.getAttribute("data-index")); // Convert string to number
      todoList.removeTask(index);
      renderTasks(); // Re-render to update the task list
    }
  });

  window.toggleTask = function (index) {
    todoList.toggleTask(index);
    renderTasks();
  };

  window.deleteTask = function (event, index ) {
    event.stopPropagation();
    todoList.removeTask(index);
    renderTasks();
  };

  renderTasks();

  addButton.addEventListener("click", () => {
    const taskDescription = taskInput.value.trim();
    if (taskDescription === "") {
      window.alert("Please enter a task!");
    } else {
      todoList.addTask(taskDescription);
      taskInput.value = "";
      renderTasks();
    }
  });
  taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const taskDescription = taskInput.value.trim();
      if (taskDescription === "") {
        window.alert("Please enter a task!");
      } else {
        todoList.addTask(taskDescription);
        taskInput.value = "";
        renderTasks();
      }
    }
  });
});
