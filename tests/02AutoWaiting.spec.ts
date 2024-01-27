import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto("http://www.uitestingplayground.com/ajax");
  await page.getByText("Button Triggering AJAX Request").click();
  testInfo.setTimeout(testInfo.timeout + 2000); // This change the timeout for the whole suite
});

test("Autowaiting", async ({ page }) => {
  const successMessageElement = page.locator(".bg-success");
  const successMessage = await successMessageElement.textContent();
  expect(successMessage).toEqual("Data loaded with AJAX get request.");

  // Auto waiting doesn't wait for allTextContents
  // const allText = await successMessageElement.allTextContents()  - This will fail

  // To make it wait for allTextContents
  await successMessageElement.waitFor({ state: "attached" });
  const allText = await successMessageElement.allTextContents();
  expect(allText).toContain("Data loaded with AJAX get request.");
});

test("Autowaiting for locator-assertion", async ({ page }) => {
  const successMessageElement = page.locator(".bg-success");

  // Locator-assertion only waits 5 seconds
  //await expect(successMessageElement).toHaveText("Data loaded with AJAX get request.");

  // To make it wait longer
  await expect(successMessageElement).toHaveText(
    "Data loaded with AJAX get request.",
    { timeout: 20000 },
  );
});

test("Alternative waits - Wait for element", async ({ page }) => {
  const successMessageElement = page.locator(".bg-success");

  // Wait for element
  await page.waitForSelector(".bg-success");

  const allText = await successMessageElement.allTextContents();
  expect(allText).toContain("Data loaded with AJAX get request.");
});

test("Alternative waits - Wait for particular response", async ({ page }) => {
  const successMessageElement = page.locator(".bg-success");

  // Wait for particular response
  await page.waitForResponse("http://www.uitestingplayground.com/ajaxdata");

  const allText = await successMessageElement.allTextContents();
  expect(allText).toContain("Data loaded with AJAX get request.");
});

test("Alternative waits - Wait for all network call", async ({ page }) => {
  const successMessageElement = page.locator(".bg-success");

  // Wait for network calls to be completed (NOT RECOMMENDED)
  await page.waitForLoadState("networkidle");

  const allText = await successMessageElement.allTextContents();
  expect(allText).toContain("Data loaded with AJAX get request.");
});

test.skip("Timeouts", async ({ page }) => {
  const successMessageElement = page.locator(".bg-success");

  // actionTimeout is set in the config file to 5secs, therefore would fail. But adding a timeout inside click it will pass
  await successMessageElement.click({ timeout: 16000 });
});

test.skip("Timeouts 2", async ({ page }) => {
  /* Go to the playwright.config.ts and change
    timeout: 10000
    remove actionTimeout
    */

  test.slow(); //Slow test will be given triple the default timeout.
  const successMessageElement = page.locator(".bg-success");
  await successMessageElement.click();
});
