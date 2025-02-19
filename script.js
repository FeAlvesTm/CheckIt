import {
  overlayfadeOut,
  cleanBtns,
  getPriority,
  getDate,
  createTaskHTML,
  insertTaskHTML,
  selectedImg,
  initEvents,
} from "./helpers.js";

class TaskManager {
  constructor() {
    this.form = document.querySelector(".form__content");
    this.submitButton = document.querySelector(".btn__form--submit");
    this.addBtns = document.querySelectorAll(".btn__add--task--2");
    this.topics = document.querySelector(".topics");
    this.content = document.querySelector(".content");
    this.completedSection = document.querySelector(".completed");
    this.toggleSectionBtn = document.querySelector(
      ".button-__completed--header"
    );
    this.currentSelectedSection = "";

    this.init();
  }

  init() {
    this.toggleSection();
    this.handleAddBtns();
    this.handleSubmitButton();
    this.initEvents();
  }

  toggleSection() {
    this.toggleSectionBtn.addEventListener("click", (e) => {
      if (
        this.toggleSectionBtn.classList.contains(
          "button-__completed--header-active"
        )
      ) {
        e.preventDefault();
        e.stopPropagation();
        this.completedSection.style.transition = "opacity 0.2s ease";
        this.completedSection.style.opacity = 0;
        this.completedSection.style.transform = "translateX(100%)";
        this.completedSection.style.display = "none";
        this.topics.style.display = "flex";
        this.content.style.display = "flex";
      }

      this.toggleSectionBtn.classList.toggle(
        "button-__completed--header-active"
      );
    });
  }

  handleAddBtns() {
    this.addBtns.forEach((el) => {
      el.addEventListener("click", () => {
        this.currentSelectedSection = el.getAttribute("data-section");
        console.log(this.currentSelectedSection);
      });
    });
  }

  handleSubmitButton() {
    this.submitButton.addEventListener("click", () => {
      if (!this.currentSelectedSection) return;

      const title = document.querySelector(".form__task--title").value;
      const taskDescription = document.querySelector(
        ".form__task--description"
      ).value;
      const priority = getPriority();
      const date = getDate();
      const img = selectedImg;

      const taskHTML = createTaskHTML(
        title,
        taskDescription,
        priority,
        date,
        img,
        this.currentSelectedSection
      );

      let missingFields = [];
      if (!title) missingFields.push("Title");
      if (!taskDescription) missingFields.push("Task Description");
      if (!priority) missingFields.push("Priority");
      if (!img) missingFields.push("Image");

      if (missingFields.length > 0) {
        alert(`The following fields are missing: ${missingFields.join(", ")}`);
      } else {
        insertTaskHTML(this.currentSelectedSection, taskHTML);
        this.form.reset();
        cleanBtns();
        overlayfadeOut();
      }
    });
  }

  initEvents() {
    document.addEventListener("DOMContentLoaded", initEvents);
  }
}

const taskManager = new TaskManager();
document.addEventListener("DOMContentLoaded", taskManager);
