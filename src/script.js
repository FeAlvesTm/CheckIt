import model from "./model.js";
import updateCarouselView from "./views/updateCarouselView.js";
import toggleSectionView from "./views/toggleSectionView.js";
import titleEditView from "./views/titleEditView.js";
import toggleDropdownView from "./views/toggleDropdownView.js";
import formView from "./views/formView.js";
import addBtnsView from "./views/addBtnsView.js";
import taskView from "./views/taskView.js";

class CheckIt {
  constructor() {
    this.setup();
  }

  setup() {
    document.addEventListener("DOMContentLoaded", () => {
      this.placeEvents();
    });
  }

  placeEvents() {
    updateCarouselView.updateCarousel();
    toggleSectionView.bindEvents();
    titleEditView.bindEvents();
    toggleDropdownView.bindEvents();

    formView.addGetFormActiveBtn();
    formView.addGetImg();
    formView.addSubmitBtnHandler(
      taskView.createTaskHTML,
      model.getTaskInfo.bind(model)
    );
    addBtnsView.handleAddBtns();
  }
}

const CheckItApp = new CheckIt();
