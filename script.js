// DOM Elements
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navbar = document.getElementById("navbar");
const contactForm = document.getElementById("contactForm");
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toast-message");

// Mobile Navigation Toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Update active nav link
  updateActiveNavLink();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Contact Form Handling
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(this);
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  // Simple validation
  if (!name || !email || !subject || !message) {
    showToast("Please fill in all fields", "error");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast("Please enter a valid email address", "error");
    return;
  }

  // Simulate form submission
  const submitButton = this.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  // Simulate API call delay
  setTimeout(() => {
    // Reset form
    this.reset();
    submitButton.textContent = originalText;
    submitButton.disabled = false;

    // Show success message
    showToast(
      "Message sent successfully! I'll get back to you soon.",
      "success"
    );

    // In a real application, you would send the data to your server here
    console.log("Form submitted:", { name, email, subject, message });
  }, 2000);
});

// Toast Notification Function
function showToast(message, type = "success") {
  toastMessage.textContent = message;

  // Update toast styling based on type
  if (type === "error") {
    toast.style.backgroundColor = "#f87171";
    toast.querySelector("i").className = "fas fa-exclamation-circle";
  } else {
    toast.style.backgroundColor = "#22d3ee";
    toast.querySelector("i").className = "fas fa-check-circle";
  }

  // Show toast
  toast.classList.add("show");

  // Hide toast after 4 seconds
  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up");
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".project-card, .skill-category, .about-text, .contact-form, .contact-info"
  );
  animateElements.forEach((el) => observer.observe(el));
});

// Active navigation link highlighting
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

// Project card hover effects
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Typing animation for hero text
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize typing animation when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-text h1");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 50);
  }
});

// Skills animation on scroll
function animateSkills() {
  const skillTags = document.querySelectorAll(".skill-tag");
  skillTags.forEach((tag, index) => {
    setTimeout(() => {
      tag.style.opacity = "1";
      tag.style.transform = "translateY(0)";
    }, index * 100);
  });
}

// Initialize skills animation
const skillsSection = document.getElementById("skills");
if (skillsSection) {
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkills();
        skillsObserver.unobserve(entry.target);
      }
    });
  });
  skillsObserver.observe(skillsSection);
}

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Console message for developers
console.log(`
🚀 Welcome to Dhruv's Portfolio!
📧 Contact: dhruv04052005@gmail.com
💼 LinkedIn: linkedin.com/in/dhruv-iyer
🐙 GitHub: github.com/dhruv-iyer
📱 Phone: +91 9867582937

Thanks for checking out the code! 
Feel free to reach out if you have any questions.
`);
