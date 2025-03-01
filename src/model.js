class Model {
  constructor() {
    this.index = localStorage.getItem("taskIndex") || 1;
    const storedTitle = localStorage.getItem("projectTitle");
    const storedTasks = localStorage.getItem("tasks");

    console.log(this.index);

    this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
    this.projectTitle = JSON.parse(storedTitle);

    console.log(this.tasks);
  }

  editProjectTitle(newTitle) {
    console.log(newTitle);
    this.projectTitle = newTitle;
    localStorage.setItem("projectTitle", JSON.stringify(this.projectTitle));
    console.log(this.projectTitle);
  }

  updateTitle(oldTitle) {
    console.log(oldTitle);
    oldTitle.textContent = this.projectTitle;
    console.log(oldTitle);
  }

  getDate() {
    let today = new Date();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear();
    const formattedDate = `${month} ${day}, ${year}`;
    return formattedDate;
  }

  getTaskInfo() {
    const taskInfo = { date: this.getDate(), index: this.index };
    this.index++;
    localStorage.setItem("taskIndex", this.index);
    return taskInfo;
  }

  deleteTask(taskId) {
    console.log(this.tasks);

    const taskToDelete = this.tasks.findIndex((task) => task.taskId === taskId);
    this.tasks.splice(taskToDelete, 1);

    console.log(taskToDelete);
    console.log(this.tasks);
    console.log(taskId);

    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  editTask(taskNewData) {
    const { taskId, newTaskTitle, newTaskDescription } = taskNewData;

    const taskToEditIndex = this.tasks.findIndex(
      (task) => task.taskId === taskId
    );
    console.log(taskToEditIndex);
    if (taskToEditIndex !== -1) {
      const taskToEdit = this.tasks[taskToEditIndex];

      taskToEdit.taskTitle = newTaskTitle;
      taskToEdit.taskDescription = newTaskDescription;
      console.log(this.tasks);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
  }

  saveTask(allTaskData) {
    if (!allTaskData) return;
    console.log(allTaskData);

    this.tasks.push(allTaskData);

    const stringifiedTasks = JSON.stringify(this.tasks);
    console.log(stringifiedTasks);

    // Armazena o array de tarefas de volta no localStorage
    localStorage.setItem("tasks", stringifiedTasks);
  }

  loadTasks(loader) {
    const parsedArrTask = JSON.parse(localStorage.getItem("tasks"));
    if (!parsedArrTask) {
      console.log("no tasks");
      return;
    }

    parsedArrTask.forEach((parsedTask) => {
      const {
        taskTitle,
        taskDescription,
        taskImg,
        taskSectionClass,
        taskPriority,
        taskId,
        index,
        date,
      } = parsedTask;
      const formattedPriority = taskPriority.toLowerCase();
      let task = "";

      if (taskSectionClass === "in__review--section") {
        task = `<div id="created__task--${index}" class="w-layout-blockcontainer main__container--2 w-container" data-task-id= "${taskId}">
      <div class="w-layout-blockcontainer review__overview w-container">
                  <h1 contenteditable="true" class="heading-4">Problem<br />Overview</h1>
                </div>
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
        </div>`;
      } else {
        task = `
        <div id="created__task--${index} "class=" w-layout-blockcontainer main__container--2 w-container" data-task-id= "${taskId}">
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

      loader(task, taskSectionClass);
    });
  }
}

export default new Model();
