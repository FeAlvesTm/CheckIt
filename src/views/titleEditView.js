import View from "./view.js";

class TitleEditView extends View {
  constructor() {
    super();
    this.title = document.querySelector(".title__header");
    this.btnEditTitle = document.querySelector(".button__header--edit");
  }

  addTitleEdit(titleEditHandler) {
    this.btnEditTitle.addEventListener("click", () => {
      let newTitle = "";
      this.title.contentEditable = true;
      this.title.focus();

      this.title.addEventListener("blur", () => {
        this.title.contentEditable = false;

        newTitle = this.title.textContent;
        console.log(newTitle);

        titleEditHandler(newTitle);
      });
    });
  }

  getOldTitle() {
    const title = this.title;
    return title;
  }
}
export default new TitleEditView();
