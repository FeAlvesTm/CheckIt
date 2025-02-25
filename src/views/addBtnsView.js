import View from "./view.js";

class addBtnsView extends View {
  constructor() {
    super();
    this.addBtns = document.querySelectorAll(".btn__add--task--2");
  }

  handleAddBtns() {
    this.addBtns.forEach((btn) =>
      btn.addEventListener("click", () => {
        const sectionClass = btn.getAttribute("data-section");
        View.setCurrentclass(sectionClass);
        View.setCurrentSection(document.querySelector(`.${sectionClass}`));
        console.log(this.currentSelectedSection);
        console.log(this.sectionClass);

        this.form.addEventListener("click", (event) => {
          event.stopPropagation();
        });
      })
    );
  }
}

export default new addBtnsView();
