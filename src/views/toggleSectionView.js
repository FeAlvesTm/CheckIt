import View from "./view.js";

class ToggleSectionView extends View {
  constructor() {
    super();
    this.toggleSectionBtn = document.querySelector(
      ".button-__completed--header"
    );
    this.completedSection = document.querySelector(".completed");
    this.topics = document.querySelector(".topics");
    this.content = document.querySelector(".content");
  }

  addToggleSection() {
    this.toggleSectionBtn.addEventListener("click", (event) => {
      this.toggleSection(event);
    });
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
}

export default new ToggleSectionView();
