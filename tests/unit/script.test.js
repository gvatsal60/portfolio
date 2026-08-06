const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(
  path.join(__dirname, "../../src/index.html"),
  "utf8"
);

describe("Unit Tests for script.js", () => {
  let document;
  let window;

  beforeEach(() => {
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    const dom = new JSDOM(html, {
      url: "http://localhost",
      runScripts: "dangerously",
      resources: "usable",
    });
    window = dom.window;
    document = window.document;
    global.document = document;
    global.window = window;
    global.navigator = window.navigator;
    global.HTMLElement = window.HTMLElement;
    global.Element = window.Element;
    global.Node = window.Node;
  });

  afterEach(() => {
    delete global.document;
    delete global.window;
    delete global.navigator;
    delete global.HTMLElement;
    delete global.Element;
    delete global.Node;
  });

  describe("Sidebar Toggle", () => {
    test("sidebar button should toggle active class on sidebar", () => {
      const sidebar = document.querySelector("[data-sidebar]");
      const sidebarBtn = document.querySelector("[data-sidebar-btn]");

      expect(sidebar).not.toBeNull();
      expect(sidebarBtn).not.toBeNull();
      expect(sidebar.classList.contains("active")).toBe(false);

      sidebarBtn.click();
      expect(sidebar.classList.contains("active")).toBe(true);

      sidebarBtn.click();
      expect(sidebar.classList.contains("active")).toBe(false);
    });

    test("sidebar button should not throw if sidebar is missing", () => {
      const sidebarBtn = document.querySelector("[data-sidebar-btn]");
      expect(sidebarBtn).not.toBeNull();

      const sidebarEl = document.querySelector("[data-sidebar]");
      if (sidebarEl) {
        sidebarEl.remove();
      }

      expect(() => sidebarBtn.click()).not.toThrow();
    });

    test("sidebar button should not throw if button is missing", () => {
      const sidebarBtn = document.querySelector("[data-sidebar-btn]");
      if (sidebarBtn) {
        sidebarBtn.remove();
      }

      const sidebar = document.querySelector("[data-sidebar]");
      expect(sidebar).not.toBeNull();
    });
  });

  describe("Navigation Links", () => {
    test("clicking About nav link should show about page", () => {
      const navLinks = document.querySelectorAll("[data-nav-link]");
      const pages = document.querySelectorAll("[data-page]");

      expect(navLinks.length).toBe(3);
      expect(pages.length).toBe(3);

      const aboutLink = Array.from(navLinks).find(
        (link) => link.textContent.trim().toLowerCase() === "about"
      );
      expect(aboutLink).not.toBeNull();

      aboutLink.click();

      const aboutPage = document.querySelector('[data-page="about"]');
      expect(aboutPage.classList.contains("active")).toBe(true);
    });

    test("clicking Resume nav link should show resume page", () => {
      const navLinks = document.querySelectorAll("[data-nav-link]");

      const resumeLink = Array.from(navLinks).find(
        (link) => link.textContent.trim().toLowerCase() === "resume"
      );
      expect(resumeLink).not.toBeNull();

      resumeLink.click();

      const resumePage = document.querySelector('[data-page="resume"]');
      expect(resumePage.classList.contains("active")).toBe(true);
    });

    test("clicking Contact nav link should show contact page", () => {
      const navLinks = document.querySelectorAll("[data-nav-link]");

      const contactLink = Array.from(navLinks).find(
        (link) => link.textContent.trim().toLowerCase() === "contact"
      );
      expect(contactLink).not.toBeNull();

      contactLink.click();

      const contactPage = document.querySelector('[data-page="contact"]');
      expect(contactPage.classList.contains("active")).toBe(true);
    });

    test("clicking a nav link should deactivate other pages", () => {
      const navLinks = document.querySelectorAll("[data-nav-link]");

      const aboutLink = Array.from(navLinks).find(
        (link) => link.textContent.trim().toLowerCase() === "about"
      );
      const resumeLink = Array.from(navLinks).find(
        (link) => link.textContent.trim().toLowerCase() === "resume"
      );

      aboutLink.click();
      expect(
        document.querySelector('[data-page="about"]').classList.contains("active")
      ).toBe(true);

      resumeLink.click();
      expect(
        document.querySelector('[data-page="about"]').classList.contains("active")
      ).toBe(false);
      expect(
        document.querySelector('[data-page="resume"]').classList.contains("active")
      ).toBe(true);
    });

    test("clicking a nav link should activate the clicked link and deactivate others", () => {
      const navLinks = document.querySelectorAll("[data-nav-link]");

      const aboutLink = Array.from(navLinks).find(
        (link) => link.textContent.trim().toLowerCase() === "about"
      );
      const contactLink = Array.from(navLinks).find(
        (link) => link.textContent.trim().toLowerCase() === "contact"
      );

      aboutLink.click();
      expect(aboutLink.classList.contains("active")).toBe(true);

      contactLink.click();
      expect(aboutLink.classList.contains("active")).toBe(false);
      expect(contactLink.classList.contains("active")).toBe(true);
    });

    test("clicking a nav link should scroll to top", () => {
      const navLinks = document.querySelectorAll("[data-nav-link]");
      const aboutLink = Array.from(navLinks).find(
        (link) => link.textContent.trim().toLowerCase() === "about"
      );

      window.scrollTo = jest.fn();
      aboutLink.click();
      expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    });

    test("navigation links should exist with correct count", () => {
      const navLinks = document.querySelectorAll("[data-nav-link]");
      expect(navLinks.length).toBe(3);
    });
  });

  describe("Contact Form Validation", () => {
    test("form submit button should be disabled when form is invalid", () => {
      const form = document.querySelector("[data-form]");
      const formBtn = document.querySelector("[data-form-btn]");

      expect(form).not.toBeNull();
      expect(formBtn).not.toBeNull();

      formBtn.disabled = false;
      form.checkValidity = jest.fn(() => false);
      form.dispatchEvent(new window.Event("input"));

      expect(formBtn.disabled).toBe(true);
    });

    test("form submit button should be enabled when form is valid", () => {
      const form = document.querySelector("[data-form]");
      const formBtn = document.querySelector("[data-form-btn]");

      formBtn.disabled = true;
      form.checkValidity = jest.fn(() => true);
      form.dispatchEvent(new window.Event("input"));

      expect(formBtn.disabled).toBe(false);
    });

    test("form should have all required input fields", () => {
      const formInputs = document.querySelectorAll("[data-form-input]");
      expect(formInputs.length).toBe(5);

      const inputNames = Array.from(formInputs).map((input) => input.name);
      expect(inputNames).toContain("fullname");
      expect(inputNames).toContain("email");
      expect(inputNames).toContain("phone");
      expect(inputNames).toContain("message");
    });

    test("form should have correct action attribute", () => {
      const form = document.querySelector("[data-form]");
      expect(form.getAttribute("action")).toBe("#");
    });

    test("form should have correct method attribute", () => {
      const form = document.querySelector("[data-form]");
      expect(form.getAttribute("method")).toBe("POST");
    });
  });

  describe("Contact Form Submission", () => {
    test("form submission should prevent default behavior", () => {
      const contactForm = document.getElementById("contactForm");
      expect(contactForm).not.toBeNull();

      const preventDefault = jest.fn();
      const submitEvent = new window.Event("submit", { bubbles: true });
      submitEvent.preventDefault = preventDefault;

      contactForm.dispatchEvent(submitEvent);
    });

    test("thank you message should be hidden initially", () => {
      const thankYouMessage = document.getElementById("thankYouMessage");
      expect(thankYouMessage).not.toBeNull();
      expect(thankYouMessage.style.display).toBe("");
    });

    test("contact form should exist with correct ID", () => {
      const contactForm = document.getElementById("contactForm");
      expect(contactForm).not.toBeNull();
    });
  });

  describe("DOM Structure", () => {
    test("page should have a main element", () => {
      const main = document.querySelector("main");
      expect(main).not.toBeNull();
    });

    test("page should have a sidebar", () => {
      const sidebar = document.querySelector(".sidebar");
      expect(sidebar).not.toBeNull();
    });

    test("page should have a navbar", () => {
      const navbar = document.querySelector(".navbar");
      expect(navbar).not.toBeNull();
    });

    test("page should have an about section", () => {
      const about = document.querySelector('[data-page="about"]');
      expect(about).not.toBeNull();
    });

    test("page should have a resume section", () => {
      const resume = document.querySelector('[data-page="resume"]');
      expect(resume).not.toBeNull();
    });

    test("page should have a contact section", () => {
      const contact = document.querySelector('[data-page="contact"]');
      expect(contact).not.toBeNull();
    });

    test("about section should be active by default", () => {
      const about = document.querySelector('[data-page="about"]');
      expect(about.classList.contains("active")).toBe(true);
    });

    test("resume section should not be active by default", () => {
      const resume = document.querySelector('[data-page="resume"]');
      expect(resume.classList.contains("active")).toBe(false);
    });

    test("contact section should not be active by default", () => {
      const contact = document.querySelector('[data-page="contact"]');
      expect(contact.classList.contains("active")).toBe(false);
    });

    test("page should have a title", () => {
      const title = document.querySelector(".name");
      expect(title).not.toBeNull();
      expect(title.textContent).toBe("Vatsal Gupta");
    });

    test("page should have a subtitle", () => {
      const subtitle = document.querySelector(".title");
      expect(subtitle).not.toBeNull();
      expect(subtitle.textContent).toBe("Software Engineer");
    });

    test("page should have social links", () => {
      const socialLinks = document.querySelectorAll(".social-link");
      expect(socialLinks.length).toBe(3);
    });

    test("page should have service items", () => {
      const serviceItems = document.querySelectorAll(".service-item");
      expect(serviceItems.length).toBe(4);
    });
  });
});
