import { expect, test } from "@playwright/test";

test("TFSA conversation leads to one simulated booking and contextual checklist", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Explore a TFSA/ }).click();
  const panel = page.getByRole("region", { name: "Appointment booking" });
  await expect(panel).toBeVisible();
  await expect(page.getByLabel("What brings you in?")).toHaveValue("tfsa");
  await page.getByRole("button", { name: "What should I bring?" }).click();
  await expect(page.getByText("Your sample preparation checklist", { exact: true })).toBeVisible();
  await panel.getByRole("button", { name: "Confirm simulated booking" }).click();
  await expect(panel.getByRole("alert")).toContainText("Choose an available time");
  await page.getByRole("radio", { name: "14:00" }).check();
  await page.getByLabel("Choose a branch").selectOption("maple");
  await expect(page.getByRole("radio", { name: "13:30" })).not.toBeChecked();
  await page.getByRole("radio", { name: "13:30" }).check();
  await panel.getByRole("button", { name: "Confirm simulated booking" }).dblclick();
  await expect(panel.getByText("Your demo visit is planned.")).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("booking-desktop.png"), fullPage: true });
  await expect(page.getByRole("log").getByText(/Your simulated appointment at Maple Square/)).toHaveCount(1);
  await page.getByRole("button", { name: "Back to conversation" }).click();
  await page.getByRole("button", { name: "Where is my appointment?" }).click();
  await expect(page.getByRole("log").getByText(/Your simulated appointment is at Maple Square/)).toBeVisible();
  await expect(page.getByRole("log").getByText(/No real appointment has been made/).last()).toBeVisible();
});

test("closing the panel preserves choices and weekends have no sample slots", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Explore an appointment" }).click();
  await page.getByLabel("Choose a branch").selectOption("cedar");
  await page.getByRole("radio", { name: "14:00" }).check();
  await page.getByRole("button", { name: "Close appointment panel" }).click();
  await page.getByRole("button", { name: "Explore an appointment" }).click();
  await expect(page.getByLabel("Choose a branch")).toHaveValue("cedar");
  await expect(page.getByRole("radio", { name: "14:00" })).toBeChecked();
  const currentDate = await page.getByLabel("Choose a date").inputValue();
  const weekend = new Date(`${currentDate}T12:00:00Z`);
  while (weekend.getUTCDay() !== 6) weekend.setUTCDate(weekend.getUTCDate() + 1);
  await page.getByLabel("Choose a date").fill(weekend.toISOString().slice(0, 10));
  await expect(page.getByText(/No sample times for this date/)).toBeVisible();
});
