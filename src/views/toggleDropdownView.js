import View from "./view.js";

class ToggleDropdownView extends View {
  constructor() {
    super();
    this.allDropdowns = document.querySelectorAll(".w-dropdown");
  }

  addDropdownToggle() {
    // Evento de clique na seção de conteúdo
    this.contentSection.addEventListener("click", (event) => {
      const dropdown = event.target.closest(".w-dropdown");
      if (dropdown) {
        this.ToggleDropdown(event, dropdown);
      } else {
        // Caso o clique seja fora do dropdown, feche todos os dropdowns
        this.closeAllDropdowns();
      }
    });
  }

  ToggleDropdown(event, dropdown) {
    const dropdownToggle = dropdown.querySelector(".w-dropdown-toggle");
    const dropdownList = dropdown.querySelector(".w-dropdown-list");

    // Alterna o estado do dropdown
    const isOpen = dropdown.classList.contains("w--open");

    // Alterna a classe 'w--open' no dropdown e na lista
    dropdown.classList.toggle("w--open", !isOpen);
    dropdownList.classList.toggle("w--open", !isOpen);

    // Alterna o atributo aria-expanded
    const ariaExpandedValue = isOpen ? "false" : "true";
    dropdownToggle.setAttribute("aria-expanded", ariaExpandedValue);

    // Ajusta o z-index
    if (isOpen) {
      dropdown.style.zIndex = "";
    } else {
      dropdown.style.zIndex = "901"; // Ajuste do z-index
    }

    console.log("Estado do dropdown:", isOpen ? "Fechado" : "Aberto");
  }

  // Função para fechar todos os dropdowns
  closeAllDropdowns() {
    const allDropdowns = document.querySelectorAll(".w-dropdown");
    allDropdowns.forEach((dropdown) => {
      dropdown.classList.remove("w--open");
      const list = dropdown.querySelector(".w-dropdown-list");
      if (list) {
        list.classList.remove("w--open");
      }

      const dropdownToggle = dropdown.querySelector(".w-dropdown-toggle");
      if (dropdownToggle) {
        dropdownToggle.setAttribute("aria-expanded", "false");
      }
    });
  }
}
export default new ToggleDropdownView();
