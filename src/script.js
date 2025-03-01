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
    this.handlers = {
      // handleFavoriteBtn: favHandler,
      handleDeleteBtn: model.deleteTask.bind(model),
      handleEditBtn: model.editTask.bind(model),
      // handleMoveBtn: moveHandler,
    };

    this.setup();
  }

  setup() {
    document.addEventListener("DOMContentLoaded", () => {
      model.updateTitle(titleEditView.getOldTitle());
      this.placeEvents();
      model.loadTasks(formView.insertTask.bind(formView));
    });
  }

  placeEvents() {
    updateCarouselView.updateCarousel();
    toggleSectionView.addToggleSection();
    titleEditView.addTitleEdit(
      model.editProjectTitle.bind(model),
      model.updateTitle.bind(model)
    );
    toggleDropdownView.addDropdownToggle();
    addBtnsView.handleAddBtns();
    taskView.handleOptBtns(this.handlers);

    formView.addGetFormActiveBtn();
    formView.addGetImg();
    formView.addSubmitBtnHandler(
      taskView.createTaskHTML,
      model.getTaskInfo.bind(model),
      model.saveTask.bind(model)
    );
  }
}

const CheckItApp = new CheckIt();
