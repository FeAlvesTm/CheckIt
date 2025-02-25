import View from "./view.js";

class FormView extends View {
  constructor() {
    super();
    this.formTitle = document.querySelector(".form__task--Title");
    this.taskDescription = document.querySelector(".form__task--description");
    this.overlay = document.querySelector(".form__overlay");

    this.todoModel = document.querySelector(".main__container--1");
    this.inProgressModel = document.querySelector(".main__container--2");
    this.inReviewModel = document.querySelector(".main__container--3");

    this.formActiveBtn = "";
    this.priority = "";
    this.selectedImg = "";
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

  addSubmitBtnHandler(createTaskHTML, taskInfos) {
    this.submitButton.addEventListener("click", () => {
      const taskData = {
        formTitle: this.formTitle.value,
        description: this.taskDescription.value,
        img: this.selectedImg,
        section: this.currentSelectedSection,
        priority: this.getPriority(),
      };
      const taskInfo = taskInfos();
      const taskHTML = createTaskHTML(taskData, taskInfo);
      this.insertTask(taskHTML, taskData);
      this.resetForm();
    });
  }

  insertTask(taskHTML, taskData) {
    const { formTitle, description, img, priority } = taskData;
    let missingFields = [];

    console.log(formTitle, description, img, priority);

    if (!formTitle) missingFields.push("Title");
    if (!description) missingFields.push("Task Description");
    if (!priority) missingFields.push("Priority");
    if (!img) missingFields.push("Image");
    console.log(missingFields);

    const sectionClass = View.getCurrentSectionClass();

    if (missingFields.length > 0) {
      alert(`The following fields are missing: ${missingFields.join(", ")}`);
    } else {
      if (sectionClass === "todo__section") {
        this.todoModel.remove();
      }
      if (sectionClass === "in__progress-section") {
        this.inProgressModel.remove();
      }
      if (sectionClass === "in__review--section") {
        this.inReviewModel.remove();
      }
    }
    const section = View.getCurrentSection();
    console.log(section);
    section.insertAdjacentHTML("beforeend", taskHTML);
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
        this.priority = "low";
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
