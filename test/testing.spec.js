const { test, expect } = require("@playwright/test");

test("Homepage request", async({ page }) => {
    await page.goto("http://localhost:3000");
    const heading = page.locator(".heading");
    await expect(heading).toHaveText("Arkhamm Web3");
});