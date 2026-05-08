document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // sidebar variables
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  // sidebar toggle functionality for mobile
  if (sidebarBtn) {
    sidebarBtn.addEventListener("click", function () {
      if (sidebar) {
        sidebar.classList.toggle("active");
      }
    });
  }

  // contact form variables
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  // Ensure the elements exist before proceeding
  if (form && formInputs.length && formBtn) {
    // Use event delegation to minimize event listeners
    form.addEventListener("input", () => {
      formBtn.disabled = !form.checkValidity();
    });
  }

  // Select navigation links and pages
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  // Add click event listeners to navigation links
  if (navigationLinks) {
    navigationLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const targetPage = link.textContent.trim().toLowerCase();

        // Toggle active class for pages
        if (pages) {
          pages.forEach((page) => {
            if (page.dataset.page === targetPage) {
              page.classList.add("active");
            } else {
              page.classList.remove("active");
            }
          });
        }

        // Toggle active class for navigation links
        navigationLinks.forEach((navLink) => {
          if (navLink === link) {
            navLink.classList.add("active");
          } else {
            navLink.classList.remove("active");
          }
        });

        // Scroll to the top of the page
        window.scrollTo(0, 0);
      });
    });
  }

  const contactForm = document.getElementById("contactForm");
  const thankYouMessage = document.getElementById("thankYouMessage");

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(contactForm);

    try {
      // Send the form data
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        // Hide the form and show the thank you message
        contactForm.style.display = "none";
        thankYouMessage.style.display = "block";
      } else {
        alert("There was an issue sending your message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("There was an error. Please try again later.");
    }
  });
});
