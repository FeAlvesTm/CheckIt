export const overlayfadeOut = function () {
  const overlay = document.querySelector(".form__overlay"); // Seletor do seu overlay
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

export const formActiveBtn = function () {
  const priorityBtnsContainer = document.querySelector(".priority__btns");
  priorityBtnsContainer.addEventListener("click", function (e) {
    e.preventDefault();
    const btn = e.target;
    console.log("a");
    const priorityBtns = priorityBtnsContainer.querySelectorAll(
      ".btn_low, .btn_medium, .btn__high"
    );
    priorityBtns.forEach((otherBtn) => {
      otherBtn.classList.remove(
        "btn_low--active",
        "btn_medium--active",
        "btn__high--active"
      );
    });

    if (btn.classList.contains("btn_low")) {
      btn.classList.toggle("btn_low--active");
    }
    if (btn.classList.contains("btn_medium")) {
      btn.classList.toggle("btn_medium--active");
    }
    if (btn.classList.contains("btn__high")) {
      btn.classList.toggle("btn__high--active");
    }
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
      prioridade = "Low";
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

  // Meses do ano em formato abreviado
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
  const month = months[today.getMonth()]; // Pega o nome do mês em formato abreviado
  const year = today.getFullYear();

  // Formata a data como "nov 10, 2024"
  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
};
