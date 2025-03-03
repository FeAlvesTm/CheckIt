import View from "./view.js";

class TaskView extends View {
  constructor() {
    super();
    this.editBtn = document.querySelector(".button__opt--created--task");
    this.topicsContainer = document.querySelector(".main__container");
  }

  createTaskHTML(taskData, taskInfo) {
    const {
      taskTitle,
      taskDescription,
      taskImg,
      taskSectionClass,
      taskPriority,
      taskId,
    } = taskData;
    const { date, index } = taskInfo;
    const formattedPriority =
      taskPriority && typeof taskPriority === "string"
        ? taskPriority.toLowerCase()
        : "default";

    const sectionClass = View.getCurrentSectionClass();

    let missingFields = [];

    if (!taskTitle) missingFields.push("Title");
    if (!taskDescription) missingFields.push("Task Description");
    if (!taskPriority) missingFields.push("Priority");
    if (!taskImg) missingFields.push("Image");
    console.log(missingFields);

    if (missingFields.length > 0) {
      alert(`The following fields are missing: ${missingFields.join(", ")}`);
    }
    View.setTaskMissingFields(missingFields);

    let taskHTML = "";

    if (sectionClass === "in__review--section") {
      taskHTML = `<div id="created__task--${index}" class="w-layout-blockcontainer main__container--2 w-container" data-task-id= "${taskId}">
    <div class="w-layout-blockcontainer review__overview w-container">
                <h1 contenteditable="true" class="heading-4">Problem<br />Overview</h1>
              </div>
        <div class="w-layout-blockcontainer  main__content--1 main__content--2 w-container">
          <div class="w-layout-blockcontainer container-8 w-container"></div>
          <div class="w-layout-blockcontainer header__in--review w-container">
            <div class="div-block-2">
              <div class="priority__progress priority__${formattedPriority}">
                ${taskPriority}
              </div>
              <div class="date__progress">
                <span class="text-span-2"> </span>${date}
              </div>
            </div>
            <div class="div-block-3">
              <div class="button__opt--created--task w-dropdown">
                <div class="dropdown-toggle w-dropdown-toggle" aria-expanded="false" role="button">
                  <div class="task-text-block text-block"></div>
                </div>
                <nav class="task__progress--opt w-dropdown-list">
                  <a href="#" class="button__opt--list--created--task button__favorite--opt--list--created--task w-dropdown-link">Favorite</a>
                  <a href="#" class="button__opt--list--created--task button__delete--opt--list--created--task w-dropdown-link">Delete</a>
                  <a href="#" class="button__opt--list--created--task button__edit--opt--list--created--task w-dropdown-link">Edit</a>
                  <a href="#" class="button__opt--list--created--task button__move--to--finished--opt--list--created--task w-dropdown-link">Move to finished</a>
                </nav>
              </div>
            </div>
          </div>
          <div class="w-layout-blockcontainer in__progress--img---container w-container">
            <img src="${taskImg}" loading="lazy" alt="" class="in__progress-img" />
          </div>
          <div class="w-layout-blockcontainer in__progress--title w-container">
            <h3 class="task__progress-title">${taskTitle}</h3>
          </div>
          <div class="w-layout-blockcontainer in__progress-description w-container">
            <div class="task__progress-description">${taskDescription}</div>
          </div>
          <button class="save__btn">Save</button>

        </div>
      </div>`;
    } else {
      taskHTML = `
      <div id="created__task--${index}" class="w-layout-blockcontainer main__container--2 w-container" data-task-id= "${taskId}">
        <div class="w-layout-blockcontainer main__content--1 main__content--2 w-container">
          <div class="w-layout-blockcontainer container-8 w-container"></div>
          <div class="w-layout-blockcontainer header__in--review w-container">
            <div class="div-block-2">
              <div class="priority__progress priority__${formattedPriority}">
                ${taskPriority}
              </div>
              <div class="date__progress">
                <span class="text-span-2"> </span>${date}
              </div>
            </div>
            <div class="div-block-3">
              <div class="button__opt--created--task w-dropdown">
                <div class="dropdown-toggle w-dropdown-toggle" aria-expanded="false" role="button">
                  <div class="task-text-block text-block"></div>
                </div>
                <nav class="task__progress--opt w-dropdown-list">
                  <a href="#" class="button__opt--list--created--task button__favorite--opt--list--created--task w-dropdown-link">Favorite</a>
                  <a href="#" class="button__opt--list--created--task button__delete--opt--list--created--task w-dropdown-link">Delete</a>
                  <a href="#" class="button__opt--list--created--task button__edit--opt--list--created--task w-dropdown-link">Edit</a>
                  <a href="#" class="button__opt--list--created--task button__move--to--finished--opt--list--created--task w-dropdown-link">Move to finished</a>
                </nav>
              </div>
            </div>
          </div>
          <div class="w-layout-blockcontainer in__progress--img---container w-container">
            <img src="${taskImg}" loading="lazy" alt="" class="in__progress-img" />
          </div>
          <div class="w-layout-blockcontainer in__progress--title w-container">
            <h3 class="task__progress-title">${taskTitle}</h3>
          </div>
          <div class="w-layout-blockcontainer in__progress-description w-container">
            <div class="task__progress-description">${taskDescription}</div>
          </div>
          <button class="save__btn hidden">Save</button>
        </div>
      </div>
    `;
    }

    return { taskHTML, taskSectionClass };
  }

  handleOptBtns(handlers) {
    this.contentSection.addEventListener("click", (event) => {
      const actions = {
        "button__favorite--opt--list--created--task": this.handleFavoriteBtn,
        "button__delete--opt--list--created--task": this.handleDeleteBtn,
        "button__edit--opt--list--created--task": this.handleEditBtn,
        "button__move--to--finished--opt--list--created--task":
          this.handleMoveBtn,
      };

      for (const className in actions) {
        if (event.target.classList.contains(className)) {
          actions[className].call(
            this,
            event,
            handlers[actions[className].name]
          );
          break;
        }
      }
    });
  }

  handleFavoriteBtn(event) {
    console.log("11111111111111111111111");
  }

  handleDeleteBtn(event, deleteHandler) {
    const taskToDelete = event.target.closest(".main__container--2");
    const taskToDeleteId = taskToDelete.dataset.taskId;
    console.log(deleteHandler);
    deleteHandler(taskToDeleteId);
    taskToDelete.remove();

    console.log("22222222222222222222");
  }

  handleEditBtn(event, editHandler) {
    const taskToEdit = event.target.closest(".main__container--2");
    const taskToEditId = taskToEdit.dataset.taskId;

    const taskTitle = taskToEdit.querySelector(".task__progress-title");
    const taskDescription = taskToEdit.querySelector(
      ".task__progress-description"
    );
    const saveBtn = taskToEdit.querySelector(".save__btn");

    const taskOriginalTitle = taskTitle.textContent.trim();
    const taskOriginalDescription = taskDescription.textContent.trim();

    const newFields = {
      taskId: taskToEditId,
      newTaskTitle: "",
      newTaskDescription: "",
    };

    saveBtn.classList.remove("hidden");

    if (!taskToEdit || !taskDescription) return;
    if (taskTitle || taskDescription) {
      taskTitle.textContent = "";
      taskDescription.textContent = "";

      taskTitle.contentEditable = true;
      taskDescription.contentEditable = true;
      taskTitle.classList.add("field__in--editing");
      taskDescription.classList.add("field__in--editing");
    }

    function setNewFields(el) {
      const originalText =
        el === taskTitle ? taskOriginalTitle : taskOriginalDescription;

      saveBtn.addEventListener("click", () => {
        if (!el.textContent.trim()) {
          el.textContent = originalText; // Restaura o valor original
        }
        el.classList.remove("field__in--editing");
        el.contentEditable = false;
        newFields.newTaskTitle = taskTitle.textContent;
        newFields.newTaskDescription = taskDescription.textContent;
        console.log("a", newFields.newTaskTitle);
        console.log("a", newFields.newTaskDescription);
        saveBtn.classList.add("hidden");
        editHandler(newFields);
      });
    }

    [taskTitle, taskDescription].forEach((el) => setNewFields(el));

    console.log("333333333333333333333");
  }

  handleMoveBtn() {
    console.log("4444444444444444444444444444");
  }

  handleTaskOrder(taskOrderHandler) {
    this.topicsContainer.addEventListener("click", (e) => {
      if (!e.target.dataset.order) return;
      const sorting = e.target.dataset.order;
      const section = e.target.dataset.section;
      console.log(sorting);
      console.log(section);
    });
  }
}

export default new TaskView();
