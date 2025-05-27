const testimonials = [
  {
    stars: 5,
    text: "Smuk butik med masser af personlighed. Jeg fandt en håndlavet skål og nogle delikatesser, jeg aldrig har set før",
    author: "Caroline Petersen",
    date: "15-05-2025",
  },
  {
    stars: 5,
    text: "Elsker at handle her! Gavekurvene er så fint sammensat, og jeg kunne selv vælge indholdet. Super service og hurtig hjælp.",
    author: "Mette Andersen",
    date: "12-05-2025",
  },
  {
    stars: 5,
    text: "Fantastisk lille perle! Købte en gavekurv til min mor med lokale specialiteter, hun blev vildt glad. Kommer helt sikkert igen.",
    author: "Rosa Mertz",
    date: "08-05-2025",
  },
  {
    stars: 5,
    text: "Perfekt sted til at finde unikke gaver. Personalet er super hjælpsomme og kender virkelig deres produkter godt.",
    author: "Thomas Nielsen",
    date: "05-05-2025",
  },
  {
    stars: 5,
    text: "Højeste kvalitet og fantastisk service. Mine venner spørger altid hvor jeg handler, når de ser mine indkøb!",
    author: "Lise Mogensen",
    date: "02-05-2025",
  },
  {
    stars: 4,
    text: "Rigtig hyggelig atmosfære og gode produkter. Lidt dyrt, men kvaliteten er det værd. Kommer gerne igen.",
    author: "Erik Larsen",
    date: "28-04-2025",
  },
];

let currentIndex = 0;
const cardsPerView = 3;
let isAnimating = false;
let touchStartX = 0;
let touchEndX = 0;

const track = document.querySelector(".testimonials-track");
const dotsContainer = document.querySelector(".pagination-dots");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");

function generateStarRating(starCount) {
  let starsHTML = '<div class="star-rating">';

  for (let i = 0; i < starCount; i++) {
    starsHTML += '<i class="ph-fill ph-star"></i>';
  }

  starsHTML += "</div>";
  return starsHTML;
}

function createTestimonialCard(testimonial) {
  return `
        <div class="testimonial-card">
            <div class="testimonial-content">
                ${generateStarRating(testimonial.stars)}
                <div class="testimonial-text">
                    ${testimonial.text}
                </div>
            </div>
            <div class="testimonial-author">
                <div class="author-info">
                    <div class="author-name">${testimonial.author}</div>
                    <div class="author-date">${testimonial.date}</div>
                </div>
            </div>
        </div>
    `;
}

function initializeSlideshow() {
  track.innerHTML = "";
  dotsContainer.innerHTML = "";

  testimonials.forEach((testimonial) => {
    const cardHTML = createTestimonialCard(testimonial);
    track.innerHTML += cardHTML;
  });

  const numberOfGroups = Math.ceil(testimonials.length / cardsPerView);
  for (let i = 0; i < numberOfGroups; i++) {
    const dot = document.createElement("div");
    dot.className = "dot";
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i * cardsPerView));
    dotsContainer.appendChild(dot);
  }

  updateSlidePosition();
  updateNavigationButtons();
}

function updateSlidePosition() {
  const cardWidth = 421.33;
  const gap = 24;
  const totalCardWidth = cardWidth + gap;
  const translateX = -(currentIndex * totalCardWidth);

  track.style.transform = `translateX(${translateX}px)`;
}

function updateNavigationButtons() {
  const maxIndex = testimonials.length - cardsPerView;

  if (currentIndex <= 0) {
    prevButton.classList.add("disabled");
  } else {
    prevButton.classList.remove("disabled");
  }

  if (currentIndex >= maxIndex) {
    nextButton.classList.add("disabled");
  } else {
    nextButton.classList.remove("disabled");
  }
}

function updatePaginationDots() {
  const dots = document.querySelectorAll(".dot");
  const currentGroup = Math.floor(currentIndex / cardsPerView);

  dots.forEach((dot, index) => {
    if (index === currentGroup) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function goToSlide(index) {
  if (isAnimating) return;

  const maxIndex = testimonials.length - cardsPerView;

  if (index < 0) {
    currentIndex = 0;
  } else if (index > maxIndex) {
    currentIndex = maxIndex;
  } else {
    currentIndex = index;
  }

  isAnimating = true;

  updateSlidePosition();
  updateNavigationButtons();
  updatePaginationDots();

  setTimeout(() => {
    isAnimating = false;
  }, 500);
}

function nextSlide() {
  goToSlide(currentIndex + 1);
}

function prevSlide() {
  goToSlide(currentIndex - 1);
}

function handleTouchStart(e) {
  touchStartX = e.touches[0].clientX;
}

function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipeGesture();
}

function handleSwipeGesture() {
  const swipeDistance = touchStartX - touchEndX;
  const minSwipeDistance = 50;

  if (Math.abs(swipeDistance) > minSwipeDistance) {
    if (swipeDistance > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
}

function handleKeydown(e) {
  if (e.key === "ArrowLeft") {
    prevSlide();
  } else if (e.key === "ArrowRight") {
    nextSlide();
  }
}

function handleResize() {
  updateSlidePosition();
}

function getResponsiveCardWidth() {
  const windowWidth = window.innerWidth;

  if (windowWidth <= 768) {
    return window.innerWidth * 0.85;
  } else if (windowWidth <= 1200) {
    return (windowWidth - 80) / 3 - 16;
  } else {
    return 421.33;
  }
}

function updateSlidePositionResponsive() {
  const cardWidth = getResponsiveCardWidth();
  const gap = window.innerWidth <= 768 ? 16 : 24;
  const totalCardWidth = cardWidth + gap;
  const translateX = -(currentIndex * totalCardWidth);

  track.style.transform = `translateX(${translateX}px)`;
}

document.addEventListener("DOMContentLoaded", function () {
  initializeSlideshow();

  prevButton.addEventListener("click", prevSlide);
  nextButton.addEventListener("click", nextSlide);

  track.addEventListener("touchstart", handleTouchStart, { passive: true });
  track.addEventListener("touchend", handleTouchEnd, { passive: true });

  document.addEventListener("keydown", handleKeydown);

  window.addEventListener("resize", handleResize);
});
