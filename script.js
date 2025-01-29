import { overlayfadeOut } from "./helpers.js";
import { formActiveBtn } from "./helpers.js";
import { cleanBtns } from "./helpers.js";
import { getPriority } from "./helpers.js";
import { getDate } from "./helpers.js";

const todoSection = document.querySelector(".todo__section"); // Seletor da seção todo
const todoMainContainer = document.querySelector(".main__container--1"); // container do conteúdo principal todo
const form = document.querySelector(".form__content"); // Seletor do seu formulário
const submitButton = document.querySelector(".btn__form--submit"); // Seletor do botão de submit
const btnAddTaskTodo = document.querySelector(".btn__add--new--task"); // Seletor do botão de adicionar tarefa

const newMainContainer = `<div class="w-layout-blockcontainer main__container--2 w-container">
<div class="w-layout-blockcontainer main__content--2 w-container">
<div class="w-layout-blockcontainer container-8 w-container">
</div>
<div class="w-layout-blockcontainer header__in--review w-container">
<div class="div-block-2">
<div class="priority__progress">Medium</div>
<div class="date__progress">
<span class="text-span-2"> </span>nov 10, 2004
</div>
</div>
<div class="div-block-3">
<div data-hover="false" data-delay="0" class="button__opt--in--progress w-dropdown">
<div class="dropdown-toggle w-dropdown-toggle" id="w-dropdown-toggle-12" aria-controls="w-dropdown-list-12" aria-haspopup="menu" aria-expanded="false" role="button" tabindex="0">
<div class="text-block"></div>
</div>
<nav class="task__progress--opt w-dropdown-list" id="w-dropdown-list-12" aria-labelledby="w-dropdown-toggle-12">
<a href="#" class="task__progress--opt-1 w-dropdown-link" tabindex="0">Delete</a><a data-w-id="4fe991ce-97f3-d3aa-2ed1-06ad70cc964f" href="#" class="task__progress--opt-1 w-dropdown-link" tabindex="0">Edit</a>
</nav>
</div>
</div>
</div>
<div class="w-layout-blockcontainer in__progress--img---container w-container">
<img src="https://cdn.prod.website-files.com/6796f237a18f3d49c7ea494f/6797146abd2d61df075c3b40_The%20Ultimate%20Starter%20Bundle.png" loading="lazy" alt="" class="in__progress-img">
</div>
<div class="w-layout-blockcontainer in__progress--title w-container">
<h3 class="task__progress-title">Task title</h3>
</div>
<div class="w-layout-blockcontainer in__progress-description w-container">
<div class="task__progress-description">
Tasks that you have added will appear here 😍
</div>
</div>
</div>
</div>`;

const formHelper = function () {
  form.addEventListener("click", function (e) {
    e.stopPropagation();
    formActiveBtn();
  });
};
formHelper();

submitButton.addEventListener("click", (e) => {
  overlayfadeOut();

  const title = document.querySelector(".form__task--title").value;
  const taskDescription = document.querySelector(
    ".form__task--description"
  ).value;
  const prioridade = getPriority();
  const date = getDate();
  console.log(prioridade);
  console.log(title);
  console.log(taskDescription);
  console.log(date);

  form.reset();
  cleanBtns();
});
