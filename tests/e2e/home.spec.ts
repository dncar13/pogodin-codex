import { expect, test } from "@playwright/test";

test("hero toggles copy and respects keyboard", async ({ page }) => {
  await page.goto("/");
  const heroTitle = page.locator("#hero h1");
  const initial = await heroTitle.textContent();
  const portrait = page.locator("#portrait-panel");
  await portrait.focus();
  await page.keyboard.press("Enter");
  await expect(heroTitle).not.toHaveText(initial ?? "");
});

test("contact form blocks fast submissions", async ({ page }) => {
  await page.goto("/");
  await page.fill("#name", "Test User");
  await page.fill("#email", "test@example.com");
  await page.fill("#message", "This is a valid message with more than ten chars.");
  await page.click('button[type="submit"]');
  await expect(page.getByRole("status")).toContainText(/משהו|Something/);
});
