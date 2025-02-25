import View from "./view.js";

class ToggleDropdownView extends View {
  constructor() {
    super();
    this.allDropdowns = document.querySelectorAll(".w-dropdown");
    this.contentSection = document.querySelector(".content");
  }

  addDropdownToggle() {
    this.contentSection.addEventListener("click", (event) => {
      console.log(this.contentSection);
      console.log(event.target);

      if (event.target.closest(".w-dropdown")) {
        console.log("tome");
        this.ToggleDropdown(event);
      }
    });
  }

  ToggleDropdown(event) {
    if (event.target && event.target.classList.contains("w-dropdown-toggle")) {
      const dropdown = event.target.closest(".w-dropdown");
      this.list = dropdown.querySelector(".w-dropdown-list");

      // Fecha todos os outros dropdowns
      this.allDropdowns.forEach((dropdown) => {
        if (dropdown !== dropdown) {
          dropdown.classList.remove("w--open");
          if (this.list) this.list.classList.remove("w--open");
        }
      });

      // Alterna o estado do dropdown clicado
      const isOpen = dropdown.classList.contains("w--open");

      dropdown.classList.toggle("w--open");
      if (this.list) {
        this.list.classList.toggle("w--open");
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
}

export default new ToggleDropdownView();
