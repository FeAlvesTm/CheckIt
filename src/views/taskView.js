import View from "./view.js";

class TaskView extends View {
  constructor() {
    super();
  }
  createTaskHTML(taskData, taskInfo) {
    const { title, description, img, section, priority } = taskData;
    const { date, index } = taskInfo;
    const formattedPriority =
      priority && typeof priority === "string"
        ? priority.toLowerCase()
        : "default";

    if (section !== "in__review--section") {
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
                  <div class="text-block"></div>
                </div>
                <nav class="task__progress--opt w-dropdown-list">
                  <a href="#" class="button__opt--list--created--task w-dropdown-link">Favorite</a>
                  <a href="#" class="button__opt--list--created--task w-dropdown-link">Delete</a>
                  <a href="#" class="button__opt--list--created--task w-dropdown-link">Edit</a>
                  <a href="#" class="button__opt--list--created--task w-dropdown-link">Mover para Concluído</a>
                </nav>
              </div>
            </div>
          </div>
          <div class="w-layout-blockcontainer in__progress--img---container w-container">
            <img src="${img}" loading="lazy" alt="" class="in__progress-img" />
          </div>
          <div class="w-layout-blockcontainer in__progress--title w-container">
            <h3 class="task__progress-title">${title.value}</h3>
          </div>
          <div class="w-layout-blockcontainer in__progress-description w-container">
            <div class="task__progress-description">${description}</div>
          </div>
        </div>
      </div>
    `;
    } else {
      return `<div id="created__task--${index}" class="w-layout-blockcontainer main__container--2 w-container">
    <div class="w-layout-blockcontainer review__overview w-container">
                <h1 contenteditable="true" class="heading-4">Problem<br />Overview</h1>
              </div>
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
                  <div class="text-block"></div>
                </div>
                <nav class="task__progress--opt w-dropdown-list">
                  <a href="#" class="button__opt--list--created--task w-dropdown-link">Favorite</a>
                  <a href="#" class="button__opt--list--created--task w-dropdown-link">Delete</a>
                  <a href="#" class="button__opt--list--created--task w-dropdown-link">Edit</a>
                  <a href="#" class="button__opt--list--created--task w-dropdown-link">Mover para Concluído</a>
                </nav>
              </div>
            </div>
          </div>
          <div class="w-layout-blockcontainer in__progress--img---container w-container">
            <img src="${img}" loading="lazy" alt="" class="in__progress-img" />
          </div>
          <div class="w-layout-blockcontainer in__progress--title w-container">
            <h3 class="task__progress-title">${title}</h3>
          </div>
          <div class="w-layout-blockcontainer in__progress-description w-container">
            <div class="task__progress-description">${description}</div>
          </div>
        </div>
      </div>`;
    }
  }

  handleEditBtns(event) {
    console.log(event.target);

    if (event.target.classList.contains("button__opt--created--task")) {
      console.log("oi");
    }
  }
}

export default new TaskView();
