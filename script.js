
class TodoList {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    this.inputBox = document.getElementById("input-box");
    this.listContainer = document.getElementById("list-container");
    this.showTasks();
    this.addEventListeners();
  }
  addTask() {
    const taskText = this.inputBox.value.trim();
    if (taskText === "") {
      alert("Please enter a task");
      return;
    }
    const task = { text: taskText, completed: false };
    this.tasks.push(task);
    this.inputBox.value = "";
    this.saveTasks();
    this.renderTasks();
  }
  toggleTask(index) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.saveTasks();
    this.renderTasks();
  }
  removeTask(index) {
    this.tasks.splice(index, 1);
    this.saveTasks();
    this.renderTasks();
  }
  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  renderTasks() {
    this.listContainer.innerHTML = "";
    this.tasks.forEach((task, index) => {
      let li = document.createElement("li");
      li.textContent = task.text;
      if (task.completed) {
        li.classList.add("checked");
      }
      li.addEventListener("click", () => this.toggleTask(index));

      let span = document.createElement("span");
      span.innerHTML = "\u00d7";
      span.addEventListener("click", (event) => {
        event.stopPropagation();
        this.removeTask(index);
      });
      li.appendChild(span);
      this.listContainer.appendChild(li);
    });
  }
    showTasks() {
        this.renderTasks();
    }
    addEventListeners(){
        document.getElementById('add-button').addEventListener('click', () => this.addTask());
        this.inputBox.addEventListener('keydown', (event) => {
            if(event.key === 'Enter') {
                event.preventDefault();
                this.addTask();
            }
        });
    }
}
const todoList = new TodoList();
