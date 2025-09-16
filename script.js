// Smooth scroll for nav links
document.querySelectorAll("nav a, .btn-green").forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});
//navigation bar background change on scroll
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});
//home button scroll to top
const homeBtn = document.getElementById("homeBtn");
homeBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
//about button scroll to about section
const aboutBtn = document.getElementById("aboutBtn");
aboutBtn.addEventListener("click", () => {
  document.getElementById("about").scrollIntoView({ behavior: "smooth" });
});
//works button scroll to works section
const worksBtnNav = document.getElementById("worksBtnNav");
worksBtnNav.addEventListener("click", () => {
  document.getElementById("works").scrollIntoView({ behavior: "smooth" });
});
//services button scroll to services section
const servicesBtn = document.getElementById("servicesBtn");
servicesBtn.addEventListener("click", () => {
  document.getElementById("services").scrollIntoView({ behavior: "smooth" });
});


//contact button scroll to contact section
const contactBtn = document.getElementById("contactBtn");
contactBtn.addEventListener("click", () => {
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });

// Toggle between works and resume
const worksBtn = document.getElementById("viewWorks");
const resumeBtn = document.getElementById("resumeBtn");
const worksSection = document.getElementById("works");
const resumeSection = document.getElementById("resume");

worksBtn.addEventListener("click", () => {
  worksSection.classList.remove("hidden");
  resumeSection.classList.add("hidden");
  worksSection.scrollIntoView({ behavior: "smooth" });
});

resumeBtn.addEventListener("click", () => {
  resumeSection.classList.remove("hidden");
  worksSection.classList.add("hidden");
  resumeSection.scrollIntoView({ behavior: "smooth" });
});

// 🌙 Dark mode toggle
const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Change icon depending on mode
  if (document.body.classList.contains("dark-mode")) {
    darkModeToggle.textContent = "☀️";
  } else {
    darkModeToggle.textContent = "🌙";
  }
});

// 👀 Animate social icons on scroll
const socialIcons = document.querySelector(".social-icons");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      socialIcons.classList.add("visible");
      observer.unobserve(socialIcons); // run only once
    }
  });
}, { threshold: 0.3 });

observer.observe(socialIcons);
// Initialize EmailJS
emailjs.init("MtRMQVQnOKQkgH3gj"); // replace with your EmailJS Public Key

// Form elements
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

const nameInput = document.getElementById("from_name");
const emailInput = document.getElementById("reply_to");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

// Modal elements
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modalMessage");
const closeModal = document.getElementById("closeModal");

// Open modal helper
function openModal(message, type = "success") {
  modalMessage.textContent = message;
  modal.querySelector(".modal-content").className = "modal-content " + type;
  modal.style.display = "flex";

  // Auto-close after 4s
  setTimeout(() => {
    modal.style.display = "none";
  }, 4000);
}

// Close modal manually
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close if clicking outside modal
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Validation function
function validateForm() {
  let isValid = true;

  // Name
  if (nameInput.value.trim() === "") {
    nameError.textContent = "Name is required.";
    isValid = false;
  } else {
    nameError.textContent = "";
  }

  // Email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value.trim())) {
    emailError.textContent = "Enter a valid email.";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  // Message
  if (messageInput.value.trim().length < 10) {
    messageError.textContent = "Message must be at least 10 characters.";
    isValid = false;
  } else {
    messageError.textContent = "";
  }

  submitBtn.disabled = !isValid;
  return isValid;
}

// Attach live validation
[nameInput, emailInput, messageInput].forEach(input => {
  input.addEventListener("input", validateForm);
});

// Handle form submission
contactForm.addEventListener("submit", function(e) {
  e.preventDefault();

  if (!validateForm()) {
    openModal("❌ Please fix errors before sending.", "error");
    submitBtn.classList.add("btn-error");
    setTimeout(() => submitBtn.classList.remove("btn-error"), 3000);
    return;
  }

  // Add loading state
  submitBtn.classList.add("btn-loading");
  submitBtn.textContent = "Sending...";

  emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
    .then(() => {
      openModal("✅ Message sent successfully!", "success");
      contactForm.reset();
      submitBtn.disabled = true;

      // Success feedback
      submitBtn.classList.add("btn-success");
      setTimeout(() => submitBtn.classList.remove("btn-success"), 3000);
    })
    .catch((err) => {
      console.error("EmailJS Error:", err);
      openModal("❌ Oops! Something went wrong.", "error");

      // Error feedback
      submitBtn.classList.add("btn-error");
      setTimeout(() => submitBtn.classList.remove("btn-error"), 3000);
    })
    .finally(() => {
      // Reset button text & remove spinner
      submitBtn.classList.remove("btn-loading");
      submitBtn.textContent = "Send Message";
    });
});
});

