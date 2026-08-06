const { test, expect } = require("@playwright/test");

test.describe("Navigation Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should load the homepage with correct title", async ({ page }) => {
    await expect(page).toHaveTitle("Portfolio");
  });

  test("should display the About section by default", async ({ page }) => {
    const aboutSection = page.locator('[data-page="about"]');
    await expect(aboutSection).toBeVisible();
    await expect(aboutSection).toHaveClass(/active/);
  });

  test("should not display Resume section by default", async ({ page }) => {
    const resumeSection = page.locator('[data-page="resume"]');
    await expect(resumeSection).not.toHaveClass(/active/);
  });

  test("should not display Contact section by default", async ({ page }) => {
    const contactSection = page.locator('[data-page="contact"]');
    await expect(contactSection).not.toHaveClass(/active/);
  });

  test("should switch to Resume section when Resume nav is clicked", async ({ page }) => {
    const resumeLink = page.locator('[data-nav-link]:has-text("Resume")');
    await resumeLink.click();

    const resumeSection = page.locator('[data-page="resume"]');
    await expect(resumeSection).toHaveClass(/active/);

    const aboutSection = page.locator('[data-page="about"]');
    await expect(aboutSection).not.toHaveClass(/active/);
  });

  test("should switch to Contact section when Contact nav is clicked", async ({ page }) => {
    const contactLink = page.locator('[data-nav-link]:has-text("Contact")');
    await contactLink.click();

    const contactSection = page.locator('[data-page="contact"]');
    await expect(contactSection).toHaveClass(/active/);

    const aboutSection = page.locator('[data-page="about"]');
    await expect(aboutSection).not.toHaveClass(/active/);
  });

  test("should switch back to About section when About nav is clicked", async ({ page }) => {
    const resumeLink = page.locator('[data-nav-link]:has-text("Resume")');
    await resumeLink.click();

    const aboutLink = page.locator('[data-nav-link]:has-text("About")');
    await aboutLink.click();

    const aboutSection = page.locator('[data-page="about"]');
    await expect(aboutSection).toHaveClass(/active/);
  });

  test("should highlight the active nav link", async ({ page }) => {
    const aboutLink = page.locator('[data-nav-link]:has-text("About")');
    await expect(aboutLink).toHaveClass(/active/);

    const resumeLink = page.locator('[data-nav-link]:has-text("Resume")');
    await resumeLink.click();

    await expect(resumeLink).toHaveClass(/active/);
    await expect(aboutLink).not.toHaveClass(/active/);
  });

  test("should scroll to top when navigating", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 500));
    const resumeLink = page.locator('[data-nav-link]:has-text("Resume")');
    await resumeLink.click();

    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBe(0);
  });

  test("should have all three navigation links", async ({ page }) => {
    const navLinks = page.locator('[data-nav-link]');
    await expect(navLinks).toHaveCount(3);
  });
});

test.describe("Sidebar Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should toggle sidebar on mobile when sidebar button is clicked", async ({ page }) => {
    const sidebar = page.locator("[data-sidebar]");
    const sidebarBtn = page.locator("[data-sidebar-btn]");

    await expect(sidebar).toBeVisible();

    const initialClass = await sidebar.getAttribute("class");
    await sidebarBtn.click();

    const afterClass = await sidebar.getAttribute("class");
    expect(afterClass).not.toBe(initialClass);
  });

  test("should show contact info when sidebar is toggled", async ({ page }) => {
    const sidebarInfoMore = page.locator(".sidebar-info_more");
    await expect(sidebarInfoMore).not.toBeVisible();

    const sidebarBtn = page.locator("[data-sidebar-btn]");
    await sidebarBtn.click();

    await expect(sidebarInfoMore).toBeVisible();
  });

  test("should have social links in sidebar", async ({ page }) => {
    const socialLinks = page.locator(".social-link");
    await expect(socialLinks).toHaveCount(3);
  });

  test("should have LinkedIn link", async ({ page }) => {
    const linkedin = page.locator(
      '.social-link[href*="linkedin"]'
    );
    await expect(linkedin).toBeVisible();
  });

  test("should have GitHub link", async ({ page }) => {
    const github = page.locator(
      '.social-link[href*="github"]'
    );
    await expect(github).toBeVisible();
  });

  test("should have StackOverflow link", async ({ page }) => {
    const stackoverflow = page.locator(
      '.social-link[href*="stackoverflow"]'
    );
    await expect(stackoverflow).toBeVisible();
  });
});

test.describe("Contact Form Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const contactLink = page.locator('[data-nav-link]:has-text("Contact")');
    await contactLink.click();
  });

  test("should display the contact form", async ({ page }) => {
    const form = page.locator("#contactForm");
    await expect(form).toBeVisible();
  });

  test("should have fullname input field", async ({ page }) => {
    const fullname = page.locator('input[name="fullname"]');
    await expect(fullname).toBeVisible();
    await expect(fullname).toHaveAttribute("placeholder", "Full Name");
    await expect(fullname).toBeRequired();
  });

  test("should have email input field", async ({ page }) => {
    const email = page.locator('input[name="email"]');
    await expect(email).toBeVisible();
    await expect(email).toHaveAttribute("placeholder", "Email Address");
    await expect(email).toBeRequired();
  });

  test("should have phone input field", async ({ page }) => {
    const phone = page.locator('input[name="phone"]');
    await expect(phone).toBeVisible();
    await expect(phone).toHaveAttribute("placeholder", "Phone Number");
    await expect(phone).toBeRequired();
  });

  test("should have message textarea", async ({ page }) => {
    const message = page.locator('textarea[name="message"]');
    await expect(message).toBeVisible();
    await expect(message).toHaveAttribute("placeholder", "Your Message");
    await expect(message).toBeRequired();
  });

  test("should have send message button", async ({ page }) => {
    const submitBtn = page.locator(
      'button[type="submit"][data-form-btn]'
    );
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toHaveText(/Send Message/);
  });

  test("should disable submit button when form is invalid", async ({ page }) => {
    const submitBtn = page.locator(
      'button[type="submit"][data-form-btn]'
    );
    await expect(submitBtn).toBeDisabled();
  });

  test("should enable submit button when all required fields are filled", async ({ page }) => {
    await page.fill('input[name="fullname"]', "Test User");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="phone"]', "1234567890");
    await page.fill('textarea[name="message"]', "Hello World");

    const submitBtn = page.locator(
      'button[type="submit"][data-form-btn]'
    );
    await expect(submitBtn).toBeEnabled();
  });

  test("should show thank you message after successful form submission", async ({ page }) => {
    await page.fill('input[name="fullname"]', "Test User");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="phone"]', "1234567890");
    await page.fill('textarea[name="message"]', "Hello World");

    const submitBtn = page.locator(
      'button[type="submit"][data-form-btn]'
    );
    await submitBtn.click();

    const thankYou = page.locator("#thankYouMessage");
    await expect(thankYou).toBeVisible();
    await expect(thankYou).toHaveClass(/active/);
  });

  test("should have correct form attributes", async ({ page }) => {
    const form = page.locator("#contactForm");
    await expect(form).toHaveAttribute("method", "POST");
  });
});

test.describe("About Section Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display the About Me heading", async ({ page }) => {
    const heading = page.locator('[data-page="about"] .article-title');
    await expect(heading).toHaveText("About Me");
  });

  test("should display the What I'm Doing heading", async ({ page }) => {
    const heading = page.locator(".service-title");
    await expect(heading).toHaveText("What I'm Doing");
  });

  test("should have 4 service items", async ({ page }) => {
    const serviceItems = page.locator(".service-item");
    await expect(serviceItems).toHaveCount(4);
  });

  test("should have System Design service", async ({ page }) => {
    const service = page.locator(
      '.service-item-title:has-text("System Design")'
    );
    await expect(service).toBeVisible();
  });

  test("should have Software Development service", async ({ page }) => {
    const service = page.locator(
      '.service-item-title:has-text("Software Development")'
    );
    await expect(service).toBeVisible();
  });

  test("should have Mobile Experiences service", async ({ page }) => {
    const service = page.locator(
      '.service-item-title:has-text("Mobile Experiences")'
    );
    await expect(service).toBeVisible();
  });

  test("should have Engineering Excellence service", async ({ page }) => {
    const service = page.locator(
      '.service-item-title:has-text("Engineering Excellence")'
    );
    await expect(service).toBeVisible();
  });

  test("should display avatar image", async ({ page }) => {
    const avatar = page.locator('img[alt="Vatsal Gupta"]');
    await expect(avatar).toBeVisible();
  });

  test("should display the name", async ({ page }) => {
    const name = page.locator(".name");
    await expect(name).toHaveText("Vatsal Gupta");
  });

  test("should display the title", async ({ page }) => {
    const title = page.locator(".title");
    await expect(title).toHaveText("Software Engineer");
  });
});

test.describe("Resume Section Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const resumeLink = page.locator('[data-nav-link]:has-text("Resume")');
    await resumeLink.click();
  });

  test("should display the Resume heading", async ({ page }) => {
    const heading = page.locator('[data-page="resume"] .article-title');
    await expect(heading).toHaveText("Resume");
  });

  test("should have download resume button", async ({ page }) => {
    const downloadBtn = page.locator(".resume-btn");
    await expect(downloadBtn).toBeVisible();
  });

  test("should have download resume text", async ({ page }) => {
    const downloadText = page.locator(
      '.resume-btn span:has-text("Download Resume")'
    );
    await expect(downloadText).toBeVisible();
  });
});

test.describe("Visual and Responsive Tests", () => {
  test("should have correct background color on body", async ({ page }) => {
    await page.goto("/");
    const backgroundColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    expect(backgroundColor).toBeTruthy();
  });

  test("should have Poppins font applied", async ({ page }) => {
    await page.goto("/");
    const fontFamily = await page.evaluate(() => {
      return window.getComputedStyle(document.documentElement).fontFamily;
    });
    expect(fontFamily).toContain("Poppins");
  });

  test("should be responsive at 580px viewport", async ({ page }) => {
    await page.setViewportSize({ width: 580, height: 800 });
    await page.goto("/");

    const main = page.locator("main");
    await expect(main).toBeVisible();
  });

  test("should be responsive at 768px viewport", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 800 });
    await page.goto("/");

    const main = page.locator("main");
    await expect(main).toBeVisible();
  });

  test("should be responsive at 1024px viewport", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 800 });
    await page.goto("/");

    const main = page.locator("main");
    await expect(main).toBeVisible();
  });

  test("should be responsive at 1250px viewport", async ({ page }) => {
    await page.setViewportSize({ width: 1250, height: 800 });
    await page.goto("/");

    const main = page.locator("main");
    await expect(main).toBeVisible();
  });
});
