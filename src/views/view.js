class View {
  constructor() {
    this.submitButton = document.querySelector(".btn__form--submit");
    this.formPriorityBtnsContainer = document.querySelector(".priority__btns");
    this.formPriorityBtns = this.formPriorityBtnsContainer.querySelectorAll(
      ".btn_low, .btn_medium, .btn__high"
    );
    this.form = document.querySelector(".form__content");
    this.carousel = document.querySelector(".carousel");

    this.contentSection = document.querySelector(".content");
    this.currentSelectedSection = "";
    this.sectionClass = "";

    this.task = "";
  }
  static TaskMissingFields = [];

  static setTask(taskHTML) {
    this.task = taskHTML;
    console.log(taskHTML);
  }
  static getTask() {
    return this.task;
  }

  static setTaskMissingFields(missingFields) {
    this.TaskMissingFields.splice(0, this.TaskMissingFields.length);

    missingFields.forEach((field) => {
      this.TaskMissingFields.push(field);
      console.log(this.TaskMissingFields);
    });
  }

  static getTaskMissingFields() {
    return this.TaskMissingFields;
  }

  static setCurrentSection(section) {
    this.currentSelectedSection = section;
    console.log(this.currentSelectedSection);
  }
  static getCurrentSection() {
    return this.currentSelectedSection;
  }
  static setCurrentclass(sectionClass) {
    this.sectionClass = sectionClass;
    console.log(this.sectionClass);
  }

  static getCurrentSectionClass() {
    return this.sectionClass;
  }
}

export default View;
