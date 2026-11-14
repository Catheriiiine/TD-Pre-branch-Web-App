import { expect, test } from "@playwright/test";

test("mobile booking sheet closes to chat and retains a confirmation", async ({ page }, testInfo) => {
  await page.goto("/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await page.screenshot({ path: testInfo.outputPath("welcome-mobile.png"), fullPage: true });
  await page.getByRole("button", { name: /Explore a TFSA/ }).click();
  const sheet = page.getByRole("dialog");
  await expect(sheet).toBeVisible();
  await page.getByRole("button", { name: "Close panel" }).click();
  await expect(page.getByLabel("Your banking question")).toBeFocused();
  await page.getByRole("button", { name: "What should I bring?" }).click();
  await expect(page.getByText("Your sample preparation checklist", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Explore an appointment" }).click();
  await page.getByRole("radio", { name: "14:00" }).check();
  await page.getByRole("button", { name: "Confirm simulated booking" }).click();
  await expect(sheet.getByText("Your demo visit is planned.")).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("booking-mobile.png") });
  await page.getByRole("button", { name: "Back to conversation" }).click();
  await expect(sheet).toHaveCount(0);
  await expect(page.getByRole("button", { name: "View simulated booking" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
});
