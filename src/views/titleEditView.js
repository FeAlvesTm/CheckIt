import View from "./view.js";

class TitleEditView extends View {
  constructor() {
    super();
    this.title = document.querySelector(".title__header");
    this.btnEditTitle = document.querySelector(".button__header--edit");
  }

  addTitleEdit(handler) {
    this.btnEditTitle.addEventListener("click", () => {
      handler();
    });
  }

  handleTitleEdit() {
    {
      this.title.contentEditable = true;
      console.log("a");
      this.title.focus();
    }
    this.title.addEventListener("blur", () => {
      this.title.contentEditable = false;
    });
  }

  bindEvents() {
    this.addTitleEdit(this.handleTitleEdit.bind(this));
  }
}
export default new TitleEditView();
