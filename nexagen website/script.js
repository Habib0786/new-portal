window.addEventListener("scroll", function () {
  const header = document.getElementById("header");
  const logo = document.getElementById("logo");

  if (window.scrollY > 50) {
    header.classList.add("scrolled");
    logo.src = "img/logo-dark.png"; // 🔄 Change to dark logo
  } else {
    header.classList.remove("scrolled");
    logo.src = "img/logo-light.png"; // 🔁 Change back to light logo
  }
});

const slider = document.getElementById("slider");
const slides = [...slider.children];
const slideWidth = 230; // width + margin/gap of each slide
let currentIndex = slides.length;

// Clone slides to the beginning and end
slides.forEach((slide) => {
  slider.appendChild(slide.cloneNode(true)); // clone to end
  slider.insertBefore(slide.cloneNode(true), slider.firstChild); // clone to start
});

// Scroll to first real slide set
window.onload = () => {
  slider.scrollLeft = currentIndex * slideWidth;
};

// Scroll function
function scrollSlider(direction) {
  currentIndex += direction;

  slider.scrollTo({
    left: currentIndex * slideWidth,
    behavior: "smooth",
  });

  // After scroll completes, snap to real items if needed
  setTimeout(() => {
    const totalSlides = slides.length;
    if (currentIndex >= totalSlides * 2) {
      currentIndex = totalSlides;
      slider.scrollLeft = currentIndex * slideWidth;
    } else if (currentIndex <= 0) {
      currentIndex = totalSlides;
      slider.scrollLeft = currentIndex * slideWidth;
    }
  }, 400); // must match scroll animation time
}

// const carousel = document.getElementById("carousel");
// const scrollLeftBtn = document.getElementById("scroll-left");
// const scrollRightBtn = document.getElementById("scroll-right");

// // Duplicate content to fake infinite scroll
// carousel.innerHTML += carousel.innerHTML;

// const cardWidth = carousel.querySelector(".partner-card").offsetWidth + 20; // includes gap
// let scrollPosition = 0;

// // Autoscroll every 2 seconds
// function autoScroll() {
//   scrollPosition += cardWidth;
//   if (scrollPosition >= carousel.scrollWidth / 2) {
//     scrollPosition = 0;
//     carousel.scrollLeft = 0;
//   }
//   carousel.scrollTo({
//     left: scrollPosition,
//     behavior: "smooth",
//   });
// }

// let scrollInterval = setInterval(autoScroll, 2000);

// // Button Scrolls
// scrollRightBtn.addEventListener("click", () => {
//   scrollPosition += cardWidth;
//   if (scrollPosition >= carousel.scrollWidth / 2) {
//     scrollPosition = 0;
//     carousel.scrollLeft = 0;
//   }
//   carousel.scrollTo({ left: scrollPosition, behavior: "smooth" });
// });

// scrollLeftBtn.addEventListener("click", () => {
//   scrollPosition -= cardWidth;
//   if (scrollPosition < 0) {
//     scrollPosition = carousel.scrollWidth / 2 - cardWidth;
//     carousel.scrollLeft = scrollPosition;
//   }
//   carousel.scrollTo({ left: scrollPosition, behavior: "smooth" });
// });

// // Pause on hover
// carousel.addEventListener("mouseenter", () => clearInterval(scrollInterval));
// carousel.addEventListener("mouseleave", () => {
//   scrollInterval = setInterval(autoScroll, 2000);
// });


const carousel = document.getElementById("carousel");
const scrollLeftBtn = document.getElementById("scroll-left");
const scrollRightBtn = document.getElementById("scroll-right");

// Duplicate content to simulate infinite scroll
carousel.innerHTML += carousel.innerHTML;

const cardWidth = carousel.querySelector(".partner-card").offsetWidth + 20; // includes margin/gap
let scrollPosition = 0;

// Function to smoothly scroll
function scrollToPosition(pos, smooth = true) {
  carousel.scrollTo({
    left: pos,
    behavior: smooth ? "smooth" : "auto",
  });
}

// Autoscroll every 2 seconds
function autoScroll() {
  scrollPosition += cardWidth;

  scrollToPosition(scrollPosition);

  // If passed half (end of original), reset instantly to start
  if (scrollPosition >= carousel.scrollWidth / 2) {
    scrollPosition = 0;
    setTimeout(() => scrollToPosition(scrollPosition, false), 300); // jump without animation
  }
}

let scrollInterval = setInterval(autoScroll, 2000);

// Right button
scrollRightBtn.addEventListener("click", () => {
  scrollPosition += cardWidth;
  scrollToPosition(scrollPosition);

  if (scrollPosition >= carousel.scrollWidth / 2) {
    scrollPosition = 0;
    setTimeout(() => scrollToPosition(scrollPosition, false), 300);
  }
});

// Left button
scrollLeftBtn.addEventListener("click", () => {
  scrollPosition -= cardWidth;

  // If before 0, jump to the second half
  if (scrollPosition < 0) {
    scrollPosition = carousel.scrollWidth / 2 - cardWidth;
    scrollToPosition(scrollPosition, false);
  } else {
    scrollToPosition(scrollPosition);
  }
});

// Pause on hover
carousel.addEventListener("mouseenter", () => clearInterval(scrollInterval));
carousel.addEventListener("mouseleave", () => {
  scrollInterval = setInterval(autoScroll, 2000);
});








  window.addEventListener("DOMContentLoaded", () => {
    const carousel1 = document.getElementById("carousel1");
    const scrollLeftBtn1 = document.getElementById("scroll-left1");
    const scrollRightBtn1 = document.getElementById("scroll-right1");

    const card = carousel1.querySelector(".portfolio-card");
    if (!carousel1 || !card) {
      console.error("❌ carousel1 or portfolio cards not found!");
      return;
    }

    const style = getComputedStyle(card);
    const cardWidth1 = card.offsetWidth + parseInt(style.marginRight || 0);
    let scrollPosition1 = 0;

    function scrollSlider1(direction) {
      scrollPosition1 += direction * cardWidth1;

      const maxScroll = carousel1.scrollWidth - carousel1.clientWidth;
      if (scrollPosition1 < 0) scrollPosition1 = 0;
      if (scrollPosition1 > maxScroll) scrollPosition1 = maxScroll;

      carousel1.scrollTo({ left: scrollPosition1, behavior: "smooth" });
    }

    scrollLeftBtn1?.addEventListener("click", () => scrollSlider1(-1));
    scrollRightBtn1?.addEventListener("click", () => scrollSlider1(1));
  });



