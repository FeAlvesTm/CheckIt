import {
  overlayfadeOut,
  cleanBtns,
  getPriority,
  getDate,
  createTaskHTML,
  insertTaskHTML,
  selectedImg,
  initEvents,
} from "./helpers.js";

const inProgressSection = document.querySelector(".in__progress-section");
const todoSection = document.querySelector(".todo__section");
const form = document.querySelector(".form__content");
const submitButton = document.querySelector(".btn__form--submit");
const addBtns = document.querySelectorAll(".btn__add--task--2");

const checkIt = {
  currentSelectedSection: "",

  init() {
    document.addEventListener("DOMContentLoaded", initEvents);

    addBtns.forEach((el) => {
      el.addEventListener("click", function () {
        checkIt.currentSelectedSection = el.getAttribute("data-section");
        console.log(checkIt.currentSelectedSection);
      });
    });

    submitButton.addEventListener("click", () => {
      if (!checkIt.currentSelectedSection) return; // Não fazer nada se nenhuma seção foi selecionada

      overlayfadeOut();

      const title = document.querySelector(".form__task--title").value;
      const taskDescription = document.querySelector(
        ".form__task--description"
      ).value;
      const priority = getPriority();
      const date = getDate();
      const img = selectedImg;
      console.log(img);

      const taskHTML = createTaskHTML(
        title,
        taskDescription,
        priority,
        date,
        img
      );
      insertTaskHTML(checkIt.currentSelectedSection, taskHTML);

      form.reset();
      cleanBtns();
    });
  },
};

checkIt.init();
