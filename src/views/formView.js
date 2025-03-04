import taskView from "./taskView.js";
import View from "./view.js";

class FormView extends View {
  constructor() {
    super();
    this.formTitle = document.querySelector(".form__task--Title");
    this.taskDescription = document.querySelector(".form__task--description");
    this.overlay = document.querySelector(".form__overlay");

    this.formActiveBtn = "";
    this.priority = "";
    this.selectedImg = "";

    this.todoModel = document.querySelector(".main__container--1");
    this.inProgressModel = document.querySelector(".main__container--2");
    this.inReviewModel = document.querySelector(".main__container--3");
  }

  addGetImg() {
    this.carousel.addEventListener("click", (event) => {
      this.getImg(event);
    });
  }

  addGetFormActiveBtn() {
    this.formPriorityBtnsContainer.addEventListener("click", (event) => {
      this.handleFormActiveBtn(event);
    });
  }

  addSubmitBtnHandler(createTaskHTML, taskInfos, saveTaskHandler) {
    this.submitButton.addEventListener("click", () => {
      const taskInfo = taskInfos();
      const { index, date } = taskInfo;

      console.log(index);

      const taskData = {
        taskTitle: this.formTitle.value,
        taskDescription: this.taskDescription.value,
        taskImg: this.selectedImg,
        taskSectionClass: View.getCurrentSectionClass(),
        taskPriority: this.getPriority(),
        taskId: `task-${index}`,
      };

      const { taskHTML, taskSectionClass } = createTaskHTML.bind(taskView)(
        taskData,
        taskInfo
      );
      console.log(taskHTML);
      View.setTask(taskHTML);

      this.insertTask(taskHTML, taskSectionClass);

      const allTaskData = {
        taskTitle: taskData.taskTitle,
        taskDescription: taskData.taskDescription,
        taskImg: taskData.taskImg,
        taskSectionClass: taskData.taskSectionClass,
        taskPriority: taskData.taskPriority,
        taskId: taskData.taskId,
        index: index,
        date: date,
      };

      this.saveTaskHTML(saveTaskHandler, allTaskData);
    });
  }

  saveTaskHTML(handler, allTaskData) {
    handler(allTaskData);
  }

  insertTask(taskHTML, taskSectionClass) {
    const taskMissingFields = View.getTaskMissingFields();
    if (taskMissingFields.length >= 1) return;

    console.log(taskSectionClass);

    let taskSection = "";
    if (taskSectionClass === "todo__section") {
      this.todoModel.remove();
      taskSection = document.querySelector(".todo__section");
    }
    if (taskSectionClass === "in__progress-section") {
      this.inProgressModel.remove();
      taskSection = document.querySelector(".in__progress-section");
    }
    if (taskSectionClass === "in__review--section") {
      this.inReviewModel.remove();
      taskSection = document.querySelector(".in__review--section");
    }

    console.log(taskSectionClass);
    console.log(taskSection);

    console.log(taskSection);
    taskSection.insertAdjacentHTML("beforeend", taskHTML);
    this.resetForm();
  }

  handleFormActiveBtn(event) {
    event.preventDefault();
    const btn = event.target;

    if (!btn.classList.contains(`${btn.classList[0]}--active`)) {
      this.formPriorityBtns.forEach((otherBtn) => {
        otherBtn.classList.remove(
          "btn_low--active",
          "btn_medium--active",
          "btn__high--active"
        );
      });
    }

    btn.classList.toggle(`${btn.classList[0]}--active`);
    this.formActiveBtn = btn;
    console.log(this.formActiveBtn);
  }

  getImg(event) {
    if (!event) return "";
    console.log(event.target);
    const fullImgSrc = event.target.src;
    const selectedImg = fullImgSrc.split("/").slice(3).join("/");
    console.log(selectedImg);
    this.selectedImg = selectedImg;
  }

  getPriority() {
    if (this.formActiveBtn) {
      console.log(this.formActiveBtn);
      if (this.formActiveBtn.classList.contains("btn_low")) {
        this.priority = "Low";
      } else if (this.formActiveBtn.classList.contains("btn_medium")) {
        this.priority = "Medium";
      } else if (this.formActiveBtn.classList.contains("btn__high")) {
        this.priority = "High";
      }
    }
    return this.priority;
  }

  overlayfadeOut = function () {
    let opacity = 1;
    const fadeOutInterval = setInterval(() => {
      opacity -= 0.05;
      this.overlay.style.opacity = opacity;

      if (opacity <= 0) {
        clearInterval(fadeOutInterval);
        this.overlay.style.display = "none";
      }
    }, 25);
  };

  cleanBtns() {
    this.formPriorityBtns.forEach((btn) => {
      btn.classList.remove(
        "btn_low--active",
        "btn_medium--active",
        "btn__high--active"
      );
    });
  }

  resetForm() {
    this.form.reset();
    this.cleanBtns();
    this.overlayfadeOut();
  }
}

export default new FormView();
