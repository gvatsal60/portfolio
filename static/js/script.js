document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // element toggle function
  const elementToggleFunc = function(elem) { elem.classList.toggle("active"); };

  // sidebar variables
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  // sidebar toggle functionality for mobile
  if (sidebarBtn) {
    sidebarBtn.addEventListener("click", function() {
      if (sidebar) {
        sidebar.classList.toggle("active");
      }
    });
  }

  // testimonials variables
  const testimonialsItem =
      document.querySelectorAll("[data-testimonials-item]");
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");

  // modal variable
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  // modal toggle function
  const testimonialsModalFunc = function() {
    if (modalContainer && overlay) {
      modalContainer.classList.toggle("active");
      overlay.classList.toggle("active");
    }
  };

  // add click event to all modal items
  if (testimonialsItem) {
    testimonialsItem.forEach((item) => {
      item.addEventListener("click", function() {
        if (modalImg && modalTitle && modalText) {
          modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
          modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
          modalTitle.innerHTML =
              this.querySelector("[data-testimonials-title]").innerHTML;
          modalText.innerHTML =
              this.querySelector("[data-testimonials-text]").innerHTML;

          testimonialsModalFunc();
        }
      });
    });
  }

  // add click event to modal close button
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  }
  if (overlay) {
    overlay.addEventListener("click", testimonialsModalFunc);
  }

  // custom select variables
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-select-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");

  if (select) {
    select.addEventListener("click", function() { elementToggleFunc(this); });
  }

  // add event in all select items
  if (selectItems) {
    selectItems.forEach((item) => {
      item.addEventListener("click", function() {
        let selectedValue = this.innerText.toLowerCase();
        if (selectValue) {
          selectValue.innerText = this.innerText;
        }
        elementToggleFunc(select);
        filterFunc(selectedValue);
      });
    });
  }

  // filter variables
  const filterItems = document.querySelectorAll("[data-filter-item]");

  const filterFunc = function(selectedValue) {
    if (filterItems) {
      filterItems.forEach((item) => {
        if (selectedValue === "all") {
          item.classList.add("active");
        } else if (selectedValue === item.dataset.category) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    }
  };

  // add event in all filter button items for large screen
  let lastClickedBtn = filterBtn[0];

  if (filterBtn) {
    filterBtn.forEach((btn) => {
      btn.addEventListener("click", function() {
        let selectedValue = this.innerText.toLowerCase();
        if (selectValue) {
          selectValue.innerText = this.innerText;
        }
        filterFunc(selectedValue);

        if (lastClickedBtn) {
          lastClickedBtn.classList.remove("active");
        }
        this.classList.add("active");
        lastClickedBtn = this;
      });
    });
  }

  // contact form variables
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  // add event to all form input field
  if (formInputs) {
    formInputs.forEach((input) => {
      input.addEventListener("input", function() {
        if (form && form.checkValidity()) {
          if (formBtn) {
            formBtn.removeAttribute("disabled");
          }
        } else {
          if (formBtn) {
            formBtn.setAttribute("disabled", "");
          }
        }
      });
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
});
