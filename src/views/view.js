class View {
  constructor() {
    this.submitButton = document.querySelector(".btn__form--submit");
    this.formPriorityBtnsContainer = document.querySelector(".priority__btns");
    this.formPriorityBtns = this.formPriorityBtnsContainer.querySelectorAll(
      ".btn_low, .btn_medium, .btn__high"
    );
    this.form = document.querySelector(".form__content");
    this.carousel = document.querySelector(".carousel");

    this.currentSelectedSection = "";
    this.sectionClass = "";
  }
  static setCurrentSection(section) {
    this.currentSelectedSection = section;
  }

  static getCurrentSection() {
    return this.currentSelectedSection;
  }
  static setCurrentclass(sectionClass) {
    this.sectionClass = sectionClass;
  }

  static getCurrentSectionClass() {
    return this.sectionClass;
  }
}

export default View;
