import { expect, test } from "@playwright/test";

test("welcome, scripted questions, and all four sample channels", async ({ page }, testInfo) => {
  const externalRequests: string[] = [];
  page.on("request", (request) => { if (!request.url().startsWith("http://127.0.0.1:3100")) externalRequests.push(request.url()); });
  await page.goto("/");
  await expect(page.getByText("University prototype", { exact: true })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("welcome-desktop.png"), fullPage: true });
  await page.getByRole("button", { name: /Open a chequing account/ }).click();
  await expect(page.getByRole("log").getByText("Online banking", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "What should I bring?" }).click();
  await expect(page.getByText("Your sample preparation checklist", { exact: true })).toBeVisible();
  for (const [question, channel] of [["Where can I withdraw cash?", "ATM"], ["I need help accessing online banking.", "Phone banking"], ["Can I replace my debit card online?", "Branch visit"]]) {
    await page.getByLabel("Your banking question").fill(question);
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByRole("log").getByText(channel, { exact: true })).toBeVisible();
  }
  await expect(page.getByRole("region", { name: "Appointment booking" })).toBeVisible();
  expect(externalRequests).toEqual([]);
});

test("unsupported question is honest and empty input cannot be sent", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Send message" })).toBeDisabled();
  await page.getByLabel("Your banking question").fill("What is the exact current TFSA limit?");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText(/This preview uses scripted examples/)).toBeVisible();
  await page.getByRole("button", { name: "Explore another task" }).click();
  await expect(page.getByRole("button", { name: "Explore a TFSA", exact: true })).toBeVisible();
});

test("reset invalidates an in-flight reply and refresh clears messages", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Open a chequing account/ }).click();
  await page.getByRole("button", { name: "New conversation" }).click();
  await expect(page.getByRole("heading", { name: "Let’s make your next move easier." })).toBeVisible();
  await page.waitForTimeout(650);
  await expect(page.getByRole("log")).toHaveCount(0);
  await page.getByRole("button", { name: /Withdraw cash/ }).click();
  await expect(page.getByRole("log")).toBeVisible();
  await page.reload();
  await expect(page.getByRole("log")).toHaveCount(0);
  expect(await page.evaluate(() => [localStorage.length, sessionStorage.length])).toEqual([0, 0]);
});

test("About dialog is keyboard accessible and restores focus", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "How it works" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});
