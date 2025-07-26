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

const carousel = document.getElementById("carousel");
const scrollLeftBtn = document.getElementById("scroll-left");
const scrollRightBtn = document.getElementById("scroll-right");

// Duplicate content to fake infinite scroll
carousel.innerHTML += carousel.innerHTML;

const cardWidth = carousel.querySelector(".partner-card").offsetWidth + 20; // includes gap
let scrollPosition = 0;

// Autoscroll every 2 seconds
function autoScroll() {
  scrollPosition += cardWidth;
  if (scrollPosition >= carousel.scrollWidth / 2) {
    scrollPosition = 0;
    carousel.scrollLeft = 0;
  }
  carousel.scrollTo({
    left: scrollPosition,
    behavior: "smooth",
  });
}

let scrollInterval = setInterval(autoScroll, 2000);

// Button Scrolls
scrollRightBtn.addEventListener("click", () => {
  scrollPosition += cardWidth;
  if (scrollPosition >= carousel.scrollWidth / 2) {
    scrollPosition = 0;
    carousel.scrollLeft = 0;
  }
  carousel.scrollTo({ left: scrollPosition, behavior: "smooth" });
});

scrollLeftBtn.addEventListener("click", () => {
  scrollPosition -= cardWidth;
  if (scrollPosition < 0) {
    scrollPosition = carousel.scrollWidth / 2 - cardWidth;
    carousel.scrollLeft = scrollPosition;
  }
  carousel.scrollTo({ left: scrollPosition, behavior: "smooth" });
});

// Pause on hover
carousel.addEventListener("mouseenter", () => clearInterval(scrollInterval));
carousel.addEventListener("mouseleave", () => {
  scrollInterval = setInterval(autoScroll, 2000);
});
