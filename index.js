 // Smooth scrolling
    function scrollToSection(id) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }

    // Resume Modal
    const resumeModal = document.getElementById("resumeModal");
    const resumeBtn = document.getElementById("resumeBtn");
    const closeResume = document.getElementById("closeResume");

    resumeBtn.addEventListener("click", () => {
      resumeModal.style.display = "flex";
    });

    closeResume.addEventListener("click", () => {
      resumeModal.style.display = "none";
    });

    // Contact Modal
    const contactModal = document.getElementById("contactModal");
    const contactBtn = document.getElementById("contactBtn");
    const closeContact = document.getElementById("closeContact");

    contactBtn.addEventListener("click", () => {
      contactModal.style.display = "flex";
    });

    closeContact.addEventListener("click", () => {
      contactModal.style.display = "none";
    });

    // Close modals by clicking outside
    window.addEventListener("click", (e) => {
      if (e.target === resumeModal) resumeModal.style.display = "none";
      if (e.target === contactModal) contactModal.style.display = "none";
    });

    // Contact form submission (basic validation)
    const contactForm = document.getElementById("contactForm");
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (name && email && message) {
        alert("Thank you, " + name + "! Your message has been sent.");
        contactModal.style.display = "none";
        contactForm.reset();
      } else {
        alert("Please fill in all fields before submitting.");
      }
    });