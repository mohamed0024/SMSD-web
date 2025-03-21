document.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    const prevArrow = document.querySelector(".prev");
    const nextArrow = document.querySelector(".next");

    const headerBottom = header.offsetTop + header.offsetHeight;
    const prevArrowTop = prevArrow.offsetTop;
    const nextArrowTop = nextArrow.offsetTop;

    // Hide arrows if they overlap with the header
    if (prevArrowTop < headerBottom) {
        prevArrow.style.display = "none";
    } else {
        prevArrow.style.display = "flex";
    }

    if (nextArrowTop < headerBottom) {
        nextArrow.style.display = "none";
    } else {
        nextArrow.style.display = "flex";
    }
});

// Toggle the mobile menu
function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.toggle("active");
}

// Define slideIndex and functions in the global scope
let slideIndex = 1;

// Show the current slide
function showSlide(n) {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const slidesWrapper = document.querySelector(".slides-wrapper");
    const container = document.querySelector(".slideshow-container");
    const slideWidth = container.clientWidth; // Dynamically set slide width

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }

    // Move slides to the correct position
    slidesWrapper.style.transform = `translateX(${-slideWidth * (slideIndex - 1)}px)`;

    // Update active dot indicator
    dots.forEach(dot => {
        dot.classList.remove("active");
    });
    dots[slideIndex - 1].classList.add("active");
}

// Change slide by n increments (for arrows)
function changeSlide(n) {
    showSlide(slideIndex += n);
}

// Jump to a specific slide (for dots)
function currentSlide(n) {
    showSlide(slideIndex = n);
}

// Initialize everything when the DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });

    // Attach event listeners for navigation arrows
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    if (prevButton && nextButton) {
        prevButton.addEventListener("click", () => {
            changeSlide(-1);
        });
        nextButton.addEventListener("click", () => {
            changeSlide(1);
        });
    }

    // Attach event listeners for dot navigation
    document.querySelectorAll(".dot").forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentSlide(index + 1);
        });
    });

    // Auto-advance slides every 8 seconds
    let slideInterval = setInterval(() => {
        changeSlide(1);
    }, 8000);

    // Pause auto-advance when hovering over the slideshow
    const container = document.querySelector(".slideshow-container");

    container.addEventListener("mouseenter", () => {
        clearInterval(slideInterval);
    });

    container.addEventListener("mouseleave", () => {
        slideInterval = setInterval(() => {
            changeSlide(1);
        }, 8000);
    });

    // Initialize the slideshow
    showSlide(slideIndex);
});
