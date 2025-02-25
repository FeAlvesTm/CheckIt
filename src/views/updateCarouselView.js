import View from "./view.js";

class UpdateCarouselView extends View {
  constructor() {
    super();
    this.carouselPrevButton = document.querySelector(".prev");
    this.carouselNextButton = document.querySelector(".next");
    this.carouselItems = document.querySelectorAll(".carousel-item");
    this.carouselImages = document.querySelectorAll(".carousel-item img");
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

export default new UpdateCarouselView();
