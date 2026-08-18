import { expect, test } from "@playwright/test";

test("home renders bilingual navigation and WhatsApp CTA", async ({ page }) => {
  await page.addInitScript(() => {
    sessionStorage.setItem("galan_intro_seen", "1");
  });
  await page.goto("/en");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Moving Freight");
  const wa = page.getByRole("link", { name: /WhatsApp/i }).first();
  await expect(wa).toHaveAttribute("href", /wa\.me\/16892530469/);
});

test("language switch preserves the careers path", async ({ page }) => {
  await page.addInitScript(() => {
    sessionStorage.setItem("galan_intro_seen", "1");
  });
  await page.goto("/en/careers");
  await page.getByRole("button", { name: "ES" }).first().click();
  await expect(page).toHaveURL(/\/es\/careers/);
  await expect(page.getByRole("heading", { level: 2 }).first()).toBeVisible();
});

test("contact form shows validation errors", async ({ page }) => {
  await page.addInitScript(() => {
    sessionStorage.setItem("galan_intro_seen", "1");
  });
  await page.goto("/en/contact");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText(/full name|valid email|required/i).first()).toBeVisible();
});
