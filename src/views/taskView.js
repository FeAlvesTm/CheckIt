import View from "./view.js";
import {
  TASK_TITLE_MAX_LENGTH,
  TASK_DESCRIPTION_MAX_LENGTH,
} from "../config.js";

class TaskView extends View {
  constructor() {
    super();
    this.editBtn = document.querySelector(".button__opt--created--task");
  }
  createTaskHTML(taskData, taskInfo) {
    const { formTitle, description, img, section, priority } = taskData;
    const { date, index } = taskInfo;
    const formattedPriority =
      priority && typeof priority === "string"
        ? priority.toLowerCase()
        : "default";

    if (section === "todo__section" || section === "in__progress-section") {
      return `<div id="created__task--${index}" class="w-layout-blockcontainer main__container--2 w-container">
    <div class="w-layout-blockcontainer review__overview w-container">
                <h1 contenteditable="true" class="heading-4">Problem<br />Overview</h1>
              </div>
        <div class="w-layout-blockcontainer main__content--1 main__content--2 w-container">
          <div class="w-layout-blockcontainer container-8 w-container"></div>
          <div class="w-layout-blockcontainer header__in--review w-container">
            <div class="div-block-2">
              <div class="priority__progress priority__${formattedPriority}">
                ${priority}
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
                <nav class="created__task--progress--opt w-dropdown-list">
                  <a href="#" class="button__opt--list--created--task button__favorite--opt--list--created--task w-dropdown-link">Favorite</a>
                  <a href="#" class="button__opt--list--created--task button__delete--opt--list--created--task w-dropdown-link">Delete</a>
                  <a href="#" class="button__opt--list--created--task button__edit--opt--list--created--task w-dropdown-link">Edit</a>
                  <a href="#" class="button__opt--list--created--task button__move--to--finished--opt--list--created--task w-dropdown-link">Move to finished</a>
                </nav>
              </div>
            </div>
          </div>
          <div class="w-layout-blockcontainer in__progress--img---container w-container">
            <img src="${img}" loading="lazy" alt="" class="in__progress-img" />
          </div>
          <div class="w-layout-blockcontainer in__progress--title w-container">
            <h3 class="task__progress-title">${formTitle}</h3>
          </div>
          <div class="w-layout-blockcontainer in__progress-description w-container">
            <div class="task__progress-description">${description}</div>
          </div>
        </div>
      </div>`;
    } else {
      return `
      <div id="created__task--${index} "class=" w-layout-blockcontainer main__container--2 w-container">
        <div class="w-layout-blockcontainer main__content--2 w-container">
          <div class="w-layout-blockcontainer container-8 w-container"></div>
          <div class="w-layout-blockcontainer header__in--review w-container">
            <div class="div-block-2">
              <div class="priority__progress priority__${formattedPriority}">
                ${priority}
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
            <img src="${img}" loading="lazy" alt="" class="in__progress-img" />
          </div>
          <div class="w-layout-blockcontainer in__progress--title w-container">
            <h3 class="task__progress-title">${formTitle}</h3>
          </div>
          <div class="w-layout-blockcontainer in__progress-description w-container">
            <div class="task__progress-description">${description}</div>
          </div>
        </div>
      </div>
    `;
    }
  }

  handleOptBtns() {
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
          actions[className].call(this, event);
          break;
        }
      }
    });
  }

  handleFavoriteBtn(event) {
    console.log("11111111111111111111111");
  }

  handleDeleteBtn(event) {
    const task = event.target.closest(".main__container--2");
    task.remove();
    console.log("22222222222222222222");
  }

  handleEditBtn(event) {
    const taskContainer = event.target.closest(".main__container--2");
    const taskTitle = taskContainer.querySelector(".task__progress-title");
    const taskDescription = taskContainer.querySelector(
      ".task__progress-description"
    );
    const originalTitle = taskTitle.textContent.trim();
    const originalTaskDescription = taskDescription.textContent.trim();

    if (!taskContainer || !taskDescription) return;
    if (taskTitle || taskDescription) {
      taskTitle.contentEditable = true;
      taskDescription.contentEditable = true;
      taskTitle.classList.add("field__in--editing");
      console.log(taskTitle);
      taskDescription.classList.add("field__in--editing");
    }

    taskTitle.addEventListener("input", function (e) {
      if (taskTitle.textContent.length >= TASK_TITLE_MAX_LENGTH) {
        e.preventDefault(); // Impede mudanças extras
        taskTitle.textContent = taskTitle.textContent.slice(
          0,
          TASK_TITLE_MAX_LENGTH
        ); // Garante que o limite seja mantido
      }
    });

    taskDescription.addEventListener("input", function (e) {
      if (taskDescription.textContent.length >= TASK_DESCRIPTION_MAX_LENGTH) {
        e.preventDefault(); // Impede mudanças extras
        taskDescription.textContent = taskDescription.textContent.slice(
          0,
          TASK_DESCRIPTION_MAX_LENGTH
        ); // Garante que o limite seja mantido
      }
    });

    taskTitle.addEventListener("blur", () => {
      if (!taskTitle.textContent.trim()) {
        taskTitle.textContent = originalTitle; // Restaura o título original
      }
      taskTitle.classList.remove("field__in--editing");

      taskTitle.contentEditable = false;
    });

    taskDescription.addEventListener("blur", () => {
      if (!taskDescription.textContent.trim()) {
        taskDescription.textContent = originalTaskDescription; // Restaura o título original
      }
      taskDescription.classList.remove("field__in--editing");

      taskDescription.contentEditable = false;
    });

    console.log("333333333333333333333");
  }

  handleMoveBtn() {
    console.log("4444444444444444444444444444");
  }
}

export default new TaskView();
