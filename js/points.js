class PointsManager {
  constructor() {
    this.points = 0;
    this.taskListElement = document.getElementById("taskList");
    this.pointsToDisplay = document.getElementById("points");
    this.deleteButton = document.getElementById("delete-task-button");
    this.award1 = document.getElementsByClassName("award-1");
    this.award2 = document.getElementsByClassName("award-2");
    this.award3 = document.getElementsByClassName("award-3");
    this.loadPoints();
    this.updatePointsDisplay();
    this.updateAwards();

    this.taskListElement.addEventListener("click", (event) => {
      if (event.target.classList.contains("delete-task-button")) {
        this.incrementPoints();
      }
    });
  }

  loadPoints() {
    const savedPoints = localStorage.getItem("points");
    if (savedPoints !== null) {
      this.points = JSON.parse(savedPoints);
    }
  }

  updatePointsDisplay() {
    this.pointsToDisplay.textContent = this.points;
  }

  incrementPoints() {
    this.points++;
    console.log(`Points: ${this.points}`);
    this.updatePointsDisplay();
    this.savePoints();
    this.updateAwards();
  }

  savePoints() {
    localStorage.setItem("points", JSON.stringify(this.points));
  }

  updateAwards() {
    [...this.award1, ...this.award2, ...this.award3].forEach(
      (award) => (award.style.display = "none")
    );

    if (this.points >= 10) {
      [...this.award1].forEach((award) => (award.style.display = "flex"));
    }
    if (this.points >= 20) {
      [...this.award2].forEach((award) => (award.style.display = "flex"));
    }
    if (this.points >= 30) {
      [...this.award3].forEach((award) => (award.style.display = "flex"));
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new PointsManager();
});
