const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const html = fs.readFileSync(
  path.join(__dirname, "../../src/index.html"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname, "../../src/styles/style.css"),
  "utf8"
);

describe("Functional Tests: HTML Structure", () => {
  let document;

  beforeEach(() => {
    const dom = new JSDOM(html, { url: "http://localhost" });
    document = dom.window.document;
    global.document = document;
  });

  afterEach(() => {
    delete global.document;
  });

  describe("HTML Validity", () => {
    test("document should have a DOCTYPE declaration", () => {
      expect(html.startsWith("<!DOCTYPE html>")).toBe(true);
    });

    test("document should have lang attribute on html element", () => {
      const htmlEl = document.documentElement;
      expect(htmlEl.getAttribute("lang")).toBe("en");
    });

    test("document should have a title element", () => {
      const title = document.querySelector("title");
      expect(title).not.toBeNull();
      expect(title.textContent).toBe("Portfolio");
    });

    test("document should have meta charset", () => {
      const charset = document.querySelector('meta[charset]');
      expect(charset).not.toBeNull();
      expect(charset.getAttribute("charset")).toBe("UTF-8");
    });

    test("document should have viewport meta tag", () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      expect(viewport).not.toBeNull();
      expect(viewport.getAttribute("content")).toContain("width=device-width");
    });

    test("document should have description meta tag", () => {
      const desc = document.querySelector('meta[name="description"]');
      expect(desc).not.toBeNull();
      expect(desc.getAttribute("content").length).toBeGreaterThan(0);
    });

    test("document should have keywords meta tag", () => {
      const keywords = document.querySelector('meta[name="keywords"]');
      expect(keywords).not.toBeNull();
      expect(keywords.getAttribute("content").length).toBeGreaterThan(0);
    });

    test("document should have author meta tag", () => {
      const author = document.querySelector('meta[name="author"]');
      expect(author).not.toBeNull();
      expect(author.getAttribute("content")).toBe("Vatsal Gupta, @gvatsal60");
    });

    test("document should link to the stylesheet", () => {
      const stylesheet = document.querySelector('link[rel="stylesheet"]');
      expect(stylesheet).not.toBeNull();
      expect(stylesheet.getAttribute("href")).toBe("styles/style.css");
    });

    test("document should link to the favicon", () => {
      const favicon = document.querySelector('link[rel="shortcut icon"]');
      expect(favicon).not.toBeNull();
      expect(favicon.getAttribute("href")).toBe("images/logo.ico");
    });

    test("document should include the script", () => {
      const script = document.querySelector('script[src="scripts/script.js"]');
      expect(script).not.toBeNull();
    });

    test("document should have ionicons script", () => {
      const ionicons = document.querySelector(
        'script[src*="ionicons"]'
      );
      expect(ionicons).not.toBeNull();
    });
  });

  describe("Semantic HTML Structure", () => {
    test("document should have a main element", () => {
      const main = document.querySelector("main");
      expect(main).not.toBeNull();
    });

    test("document should have an aside for sidebar", () => {
      const aside = document.querySelector("aside");
      expect(aside).not.toBeNull();
      expect(aside.classList.contains("sidebar")).toBe(true);
    });

    test("document should have article elements for pages", () => {
      const articles = document.querySelectorAll("article");
      expect(articles.length).toBe(3);
    });

    test("document should have a nav element for navbar", () => {
      const nav = document.querySelector("nav");
      expect(nav).not.toBeNull();
      expect(nav.classList.contains("navbar")).toBe(true);
    });

    test("document should have a form element for contact", () => {
      const form = document.querySelector("form");
      expect(form).not.toBeNull();
      expect(form.id).toBe("contactForm");
    });

    test("form should have input fields with correct types", () => {
      const textInput = document.querySelector('input[type="text"]');
      expect(textInput).not.toBeNull();

      const emailInput = document.querySelector('input[type="email"]');
      expect(emailInput).not.toBeNull();

      const telInput = document.querySelector('input[type="tel"]');
      expect(telInput).not.toBeNull();
    });

    test("form should have a textarea for messages", () => {
      const textarea = document.querySelector("textarea");
      expect(textarea).not.toBeNull();
      expect(textarea.name).toBe("message");
    });

    test("form should have a submit button", () => {
      const submitBtn = document.querySelector('button[type="submit"]');
      expect(submitBtn).not.toBeNull();
    });
  });

  describe("Accessibility", () => {
    test("avatar image should have alt text", () => {
      const avatar = document.querySelector('img[alt="Vatsal Gupta"]');
      expect(avatar).not.toBeNull();
    });

    test("service icons should have alt text", () => {
      const icons = document.querySelectorAll(".service-icon-box img");
      icons.forEach((icon) => {
        expect(icon.getAttribute("alt")).not.toBeNull();
        expect(icon.getAttribute("alt").length).toBeGreaterThan(0);
      });
    });

    test("nav links should be buttons for accessibility", () => {
      const navLinks = document.querySelectorAll("[data-nav-link]");
      navLinks.forEach((link) => {
        expect(link.tagName).toBe("BUTTON");
      });
    });

    test("sidebar toggle button should have aria-expanded", () => {
      const sidebarBtn = document.querySelector("[data-sidebar-btn]");
      expect(sidebarBtn).not.toBeNull();
      expect(sidebarBtn.getAttribute("aria-expanded")).toBe("false");
    });

    test("form inputs should have associated labels or placeholders", () => {
      const inputs = document.querySelectorAll("[data-form-input]");
      inputs.forEach((input) => {
        const hasPlaceholder = input.getAttribute("placeholder") !== null;
        const hasName = input.getAttribute("name") !== null;
        expect(hasPlaceholder || hasName).toBe(true);
      });
    });

    test("resume link should have rel=noopener noreferrer", () => {
      const resumeLink = document.querySelector(
        '.resume-btn[target="_blank"]'
      );
      expect(resumeLink).not.toBeNull();
      expect(resumeLink.getAttribute("rel")).toBe("noopener noreferrer");
    });
  });

  describe("Image Assets", () => {
    test("avatar image should exist in src", () => {
      const avatarPath = path.join(
        __dirname,
        "../../src/images/avatar.png"
      );
      expect(fs.existsSync(avatarPath)).toBe(true);
    });

    test("logo icon should exist in src", () => {
      const logoPath = path.join(__dirname, "../../src/images/logo.ico");
      expect(fs.existsSync(logoPath)).toBe(true);
    });

    test("all service icons should exist in src", () => {
      const icons = ["icon-design.svg", "icon-dev.svg", "icon-app.svg", "icon-photo.svg"];
      icons.forEach((icon) => {
        const iconPath = path.join(__dirname, "../../src/images", icon);
        expect(fs.existsSync(iconPath)).toBe(true);
      });
    });
  });
});

describe("Functional Tests: CSS Structure", () => {
  test("CSS file should not be empty", () => {
    expect(css.length).toBeGreaterThan(0);
  });

  test("CSS should define custom properties in :root", () => {
    expect(css.includes(":root")).toBe(true);
    expect(css.includes("--bg-gradient-onyx")).toBe(true);
    expect(css.includes("--font-family")).toBe(false) || expect(css.includes("--ff-poppins")).toBe(true);
  });

  test("CSS should have a reset section", () => {
    expect(css.includes("margin: 0")).toBe(true);
    expect(css.includes("padding: 0")).toBe(true);
    expect(css.includes("box-sizing: border-box")).toBe(true);
  });

  test("CSS should define sidebar styles", () => {
    expect(css.includes(".sidebar")).toBe(true);
  });

  test("CSS should define navbar styles", () => {
    expect(css.includes(".navbar")).toBe(true);
  });

  test("CSS should define about section styles", () => {
    expect(css.includes(".about")).toBe(true);
  });

  test("CSS should define resume section styles", () => {
    expect(css.includes(".resume")).toBe(true) || expect(css.includes(".timeline")).toBe(true);
  });

  test("CSS should define contact section styles", () => {
    expect(css.includes(".contact")).toBe(true) || expect(css.includes(".contact-form")).toBe(true);
  });

  test("CSS should define service section styles", () => {
    expect(css.includes(".service")).toBe(true);
  });

  test("CSS should define form styles", () => {
    expect(css.includes(".form-input")).toBe(true);
    expect(css.includes(".form-btn")).toBe(true);
  });

  test("CSS should have responsive breakpoints", () => {
    expect(css.includes("@media")).toBe(true);
    expect(css.includes("min-width: 580px")).toBe(true);
    expect(css.includes("min-width: 768px")).toBe(true);
    expect(css.includes("min-width: 1024px")).toBe(true);
    expect(css.includes("min-width: 1250px")).toBe(true);
  });

  test("CSS should define active state for articles", () => {
    expect(css.includes("article.active")).toBe(true);
  });

  test("CSS should define sidebar toggle styles", () => {
    expect(css.includes(".sidebar.active")).toBe(true);
  });

  test("CSS should define navigation active link styles", () => {
    expect(css.includes(".navbar-link.active")).toBe(true);
  });

  test("CSS should define form disabled button styles", () => {
    expect(css.includes(".form-btn:disabled")).toBe(true);
  });

  test("CSS should define thank you message styles", () => {
    expect(css.includes("#thankYouMessage")).toBe(true);
  });

  test("CSS should use Poppins font family", () => {
    expect(css.includes("--ff-poppins")).toBe(true);
    expect(css.includes("Poppins")).toBe(true);
  });

  test("CSS should define color variables", () => {
    expect(css.includes("--white-1")).toBe(true);
    expect(css.includes("--smoky-black")).toBe(true);
    expect(css.includes("--orange-yellow-crayola")).toBe(true);
  });

  test("CSS should define typography scale", () => {
    expect(css.includes("--fs-1")).toBe(true);
    expect(css.includes("--fs-2")).toBe(true);
    expect(css.includes("--fs-3")).toBe(true);
    expect(css.includes("--fs-4")).toBe(true);
  });

  test("CSS should define shadow variables", () => {
    expect(css.includes("--shadow-1")).toBe(true);
    expect(css.includes("--shadow-2")).toBe(true);
  });

  test("CSS should define transition variables", () => {
    expect(css.includes("--transition-1")).toBe(true);
    expect(css.includes("--transition-2")).toBe(true);
  });
});