export const overlayfadeOut = function () {
  const overlay = document.querySelector(".form__overlay");
  let opacity = 1;
  const fadeOutInterval = setInterval(() => {
    opacity -= 0.05;
    overlay.style.opacity = opacity;

    if (opacity <= 0) {
      clearInterval(fadeOutInterval);
      overlay.style.display = "none";
    }
  }, 50);
};

export const initEvents = function () {
  updateCarousel();
  addToggleDropdown();
  formActiveBtn();
  formHelper();
  getImg();
};

const addToggleDropdown = function () {
  document.body.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("w-dropdown-toggle")) {
      const dropdown = event.target.closest(".w-dropdown");
      const dropdownList = dropdown.querySelector(".w-dropdown-list");

      if (dropdown && dropdownList) {
        const isOpen = dropdown.classList.contains("w--open");

        dropdown.classList.toggle("w--open");
        dropdownList.classList.toggle("w--open");

        event.target.setAttribute("aria-expanded", isOpen ? "false" : "true");

        if (isOpen) {
          dropdown.style.zIndex = "";
        } else {
          dropdown.style.zIndex = "901";
        }

        console.log("Estado do dropdown:", isOpen ? "Fechado" : "Aberto");
      }
    }
  });
};

const formHelper = function () {
  const form = document.querySelector(".form__content");
  form.addEventListener("click", function (e) {
    e.stopPropagation();
  });
};

const formActiveBtn = function () {
  const priorityBtnsContainer = document.querySelector(".priority__btns");

  priorityBtnsContainer.addEventListener("click", function (e) {
    e.preventDefault();
    const btn = e.target;

    const priorityBtns = priorityBtnsContainer.querySelectorAll(
      ".btn_low, .btn_medium, .btn__high"
    );
    if (!btn.classList.contains(`${btn.classList[0]}--active`)) {
      priorityBtns.forEach((otherBtn) => {
        otherBtn.classList.remove(
          "btn_low--active",
          "btn_medium--active",
          "btn__high--active"
        );
      });
    }

    btn.classList.toggle(`${btn.classList[0]}--active`);
  });
};

export const cleanBtns = function () {
  const priorityBtnsContainer = document.querySelector(".priority__btns");
  const priorityBtns = priorityBtnsContainer.querySelectorAll(
    ".btn_low, .btn_medium, .btn__high"
  );

  priorityBtns.forEach((btn) => {
    btn.classList.remove(
      "btn_low--active",
      "btn_medium--active",
      "btn__high--active"
    );
  });
};

export const getPriority = function () {
  const activeBtn = document.querySelector(
    ".btn_low--active, .btn_medium--active, .btn__high--active"
  );

  if (activeBtn) {
    let prioridade = "";

    if (activeBtn.classList.contains("btn_low")) {
      prioridade = "low";
    } else if (activeBtn.classList.contains("btn_medium")) {
      prioridade = "Medium";
    } else if (activeBtn.classList.contains("btn__high")) {
      prioridade = "High";
    }
    return prioridade;
  }
};

export const getDate = function () {
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
};

export let selectedImg = "";

export const getImg = function () {
  const carousel = document.querySelector(".carousel");

  carousel.addEventListener("click", function (e) {
    e.preventDefault();
    const fullImgSrc = e.target.src;
    selectedImg = fullImgSrc.split("/").slice(3).join("/");
    console.log(selectedImg);
  });
};

const updateCarousel = function () {
  const track = document.querySelector(".carousel");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const items = document.querySelectorAll(".carousel-item");
  const totalItems = items.length / 3;
  let currentIndex = 0;

  track.addEventListener("click", getSelectedImg);

  function getSelectedImg(e) {
    const images = document.querySelectorAll(".carousel-item img");
    const clickedImage = e.target;
    if (!clickedImage.classList.contains("selected")) {
      images.forEach((img) => img.classList.remove("selected"));
    }
    clickedImage.classList.toggle("selected");
    console.log(clickedImage);
  }

  function updateTransform() {
    track.style.transform = `translateX(-${100 * currentIndex}%)`;
  }

  prevButton.addEventListener("click", function () {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = totalItems - 1;
      updateTransform();
    } else {
      updateTransform();
    }
  });

  nextButton.addEventListener("click", function () {
    currentIndex++;
    if (currentIndex >= totalItems) {
      currentIndex = 0;
      updateTransform();
    } else {
      updateTransform();
    }
  });
};

export const createTaskHTML = (
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
    <div class="w-layout-blockcontainer main__container--2 w-container">
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
            <div class="button__opt--in--progress w-dropdown">
              <div class="dropdown-toggle w-dropdown-toggle" aria-expanded="false" role="button">
                <div class="text-block"></div>
              </div>
              <nav class="task__progress--opt w-dropdown-list">
                <a href="#" class="task__progress--opt-1 w-dropdown-link">Favorite</a>

                <a href="#" class="task__progress--opt-1 w-dropdown-link">Delete</a>
                <a href="#" class="task__progress--opt-1 w-dropdown-link">Edit</a>
                <a href="#" class="task__progress--opt-1 w-dropdown-link" id="move-to-finished">Mover para Concluído</a>
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
    return `<div class="w-layout-blockcontainer main__container--2 w-container">
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
            <div class="button__opt--in--progress w-dropdown">
              <div class="dropdown-toggle w-dropdown-toggle" aria-expanded="false" role="button">
                <div class="text-block"></div>
              </div>
              <nav class="task__progress--opt w-dropdown-list">
                <a href="#" class="task__progress--opt-1 w-dropdown-link">Delete</a>
                <a href="#" class="task__progress--opt-1 w-dropdown-link">Edit</a>
                <a href="#" class="task__progress--opt-1 w-dropdown-link" id="move-to-finished">Mover para Concluído</a>
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

export const insertTaskHTML = function (section, taskHTML) {
  const sectionEl = document.querySelector(`.${section}`);
  sectionEl.insertAdjacentHTML("beforeend", taskHTML);
};
