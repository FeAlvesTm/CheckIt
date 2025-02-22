class CheckIt {
  constructor() {
    this.form = document.querySelector(".form__content");
    this.formPriorityBtnsContainer = document.querySelector(".priority__btns");
    this.formPriorityBtns = this.formPriorityBtnsContainer.querySelectorAll(
      ".btn_low, .btn_medium, .btn__high"
    );
    this.formActiveBtn = "";
    this.selectedImg = "";
    this.overlay = document.querySelector(".form__overlay");
    this.submitButton = document.querySelector(".btn__form--submit");

    this.carousel = document.querySelector(".carousel");
    this.carouselPrevButton = document.querySelector(".prev");
    this.carouselNextButton = document.querySelector(".next");
    this.carouselItems = document.querySelectorAll(".carousel-item");
    this.carouselImages = document.querySelectorAll(".carousel-item img");

    this.inProgressSection = document.querySelector(".in__progress-section");
    this.todoModel = document.querySelector(".main__container--1");
    this.inProgressModel = document.querySelector(".main__container--2");
    this.inReviewModel = document.querySelector(".main__container--3");
    this.dropdownList = document.querySelector(".w-dropdown-list");
    this.addBtns = document.querySelectorAll(".btn__add--task--2");
    this.topics = document.querySelector(".topics");
    this.content = document.querySelector(".content");
    this.completedSection = document.querySelector(".completed");
    this.title = document.querySelector(".title__header");
    this.btnEditTitle = document.querySelector(".button__header--edit");
    this.toggleSectionBtn = document.querySelector(
      ".button-__completed--header"
    );
    this.currentSelectedSection = "";
    this.index = 1;

    this.addEvents();
  }

  addEvents() {
    this.btnEditTitle.addEventListener("click", () => {
      this.handleTitleEdit();
    });

    this.addBtns.forEach((el) => {
      el.addEventListener("click", () => this.handleAddBtns(el));
    });

    this.toggleSectionBtn.addEventListener("click", (event) => {
      this.toggleSection(event);
    });

    document.body.addEventListener("click", (event) => {
      this.addToggleDropdown(event);
    });

    this.form.addEventListener("click", (event) => {
      this.formHelper(event);
    });

    this.formPriorityBtnsContainer.addEventListener("click", (event) => {
      this.getFormActiveBtn(event);
    });

    this.carousel.addEventListener("click", (event) => {
      this.getImg(event);
    });

    this.submitButton.addEventListener("click", () => {
      this.createTask();
    });

    this.inProgressSection.addEventListener("click", (event) => {
      this.handleEditBtns(event);
    });

    this.updateCarousel();
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

  handleAddBtns(el) {
    this.currentSelectedSection = el.getAttribute("data-section");
    console.log(this.currentSelectedSection);
  }

  handleEditBtns(event) {
    console.log(event.target);

    if (event.target.classList.contains("button__opt--created--task")) {
      console.log("oi");
    }
  }

  toggleSection(event) {
    if (
      this.toggleSectionBtn.classList.contains(
        "button-__completed--header-active"
      )
    ) {
      event.preventDefault();
      event.stopPropagation();
      this.completedSection.style.transition = "opacity 0.2s ease";
      this.completedSection.style.opacity = 0;
      this.completedSection.style.transform = "translateX(100%)";
      this.completedSection.style.display = "none";
      this.topics.style.display = "flex";
      this.content.style.display = "flex";
    }

    this.toggleSectionBtn.classList.toggle("button-__completed--header-active");
  }

  addToggleDropdown(event) {
    if (event.target && event.target.classList.contains("w-dropdown-toggle")) {
      const dropdown = event.target.closest(".w-dropdown");

      // Fecha todos os outros dropdowns
      const allDropdowns = document.querySelectorAll(".w-dropdown");
      allDropdowns.forEach((d) => {
        if (d !== dropdown) {
          d.classList.remove("w--open");
          const list = d.querySelector(".w-dropdown-list");
          if (list) list.classList.remove("w--open");
        }
      });

      // Alterna o estado do dropdown clicado
      const isOpen = dropdown.classList.contains("w--open");

      dropdown.classList.toggle("w--open");
      const list = dropdown.querySelector(".w-dropdown-list");
      if (list) {
        list.classList.toggle("w--open");
      }

      // Define o atributo aria-expanded
      event.target.setAttribute("aria-expanded", isOpen ? "false" : "true");

      // Ajusta o z-index
      if (isOpen) {
        dropdown.style.zIndex = "";
      } else {
        dropdown.style.zIndex = "901";
      }

      console.log("Estado do dropdown:", isOpen ? "Fechado" : "Aberto");
    }
  }

  overlayfadeOut = function () {
    let opacity = 1;
    const fadeOutInterval = setInterval(() => {
      opacity -= 0.05;
      this.overlay.style.opacity = opacity;

      if (opacity <= 0) {
        clearInterval(fadeOutInterval);
        this.overlay.style.display = "none";
      }
    }, 50);
  };

  formHelper(event) {
    event.stopPropagation();
  }

  getFormActiveBtn(event) {
    event.preventDefault();
    const btn = event.target;

    if (!btn.classList.contains(`${btn.classList[0]}--active`)) {
      this.formPriorityBtns.forEach((otherBtn) => {
        otherBtn.classList.remove(
          "btn_low--active",
          "btn_medium--active",
          "btn__high--active"
        );
      });
    }

    btn.classList.toggle(`${btn.classList[0]}--active`);
    this.formActiveBtn = btn;
    console.log(this.formActiveBtn);
  }

  cleanBtns() {
    this.formPriorityBtns.forEach((btn) => {
      btn.classList.remove(
        "btn_low--active",
        "btn_medium--active",
        "btn__high--active"
      );
    });
  }

  getPriority() {
    if (this.formActiveBtn) {
      let priority = "";
      console.log(this.formActiveBtn);
      if (this.formActiveBtn.classList.contains("btn_low")) {
        priority = "low";
      } else if (this.formActiveBtn.classList.contains("btn_medium")) {
        priority = "Medium";
      } else if (this.formActiveBtn.classList.contains("btn__high")) {
        priority = "High";
      }
      return priority;
    }
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

  getImg(event) {
    if (!event) return "";
    console.log(event.target);
    const fullImgSrc = event.target.src;
    const selectedImg = fullImgSrc.split("/").slice(3).join("/");
    console.log(selectedImg);
    this.selectedImg = selectedImg;
  }

  resetForm() {
    this.form.reset();
    this.cleanBtns();
    this.overlayfadeOut();
  }

  createTaskHTML = (
    index,
    title,
    description,
    priority,
    date,
    img,
    section
  ) => {
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
            <h3 class="task__progress-title">${title}</h3>
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
  };

  insertTaskHTML = function (section, taskHTML) {
    const sectionEl = document.querySelector(`.${section}`);
    sectionEl.insertAdjacentHTML("beforeend", taskHTML);
  };

  createTask() {
    if (!this.currentSelectedSection) return;

    const title = document.querySelector(".form__task--title").value;
    const taskDescription = document.querySelector(
      ".form__task--description"
    ).value;
    const priority = this.getPriority();
    console.log(priority);
    const index = this.index;
    console.log(index);

    const date = this.getDate();
    const img = this.selectedImg;

    console.log(img);
    let missingFields = [];
    if (!title) missingFields.push("Title");
    if (!taskDescription) missingFields.push("Task Description");
    if (!priority) missingFields.push("Priority");
    if (!img) missingFields.push("Image");
    console.log(missingFields);

    const taskHTML = this.createTaskHTML(
      index,
      title,
      taskDescription,
      priority,
      date,
      img,
      this.currentSelectedSection
    );
    if (missingFields.length > 0) {
      alert(`The following fields are missing: ${missingFields.join(", ")}`);
    } else {
      if (this.currentSelectedSection === "todo__section") {
        this.todoModel.remove();
      }
      if (this.currentSelectedSection === "in__progress-section") {
        this.inProgressModel.remove();
      }
      if (this.currentSelectedSection === "in__review--section") {
        this.inReviewModel.remove();
      }
      this.insertTaskHTML(this.currentSelectedSection, taskHTML);
      this.resetForm();
      this.index++;
    }
  }

  updateCarousel() {
    const totalItems = this.carouselItems.length / 3;
    let currentIndex = 0;

    const getSelectedImg = (event) => {
      const clickedImage = event.target;
      if (!clickedImage.classList.contains("selected")) {
        this.carouselImages.forEach((img) => img.classList.remove("selected"));
      }
      clickedImage.classList.toggle("selected");
      console.log(clickedImage);
    };

    const updateTransform = () => {
      this.carousel.style.transform = `translateX(-${100 * currentIndex}%)`;
    };

    const updateCarouselLeft = () => {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = totalItems - 1;
        updateTransform();
      } else {
        updateTransform();
      }
    };
    const updateCarouselRight = () => {
      currentIndex++;
      if (currentIndex >= totalItems) {
        currentIndex = 0;
        updateTransform();
      } else {
        updateTransform();
      }
    };

    this.carousel.addEventListener("click", (event) => {
      getSelectedImg(event);
    });

    this.carouselPrevButton.addEventListener("click", () => {
      updateCarouselLeft();
    });

    this.carouselNextButton.addEventListener("click", () => {
      updateCarouselRight();
    });
  }
}

const CheckItApp = new CheckIt();
