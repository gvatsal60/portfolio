const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests/automation",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:4000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
  webServer: {
    command: "bundle exec jekyll serve --incremental --source ./src --destination ./_site",
    url: "http://localhost:4000",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});