import { test } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
});

test("Navigate to form page", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutPage();
  await pm.navigateTo().datepickerPage();
  await pm.navigateTo().smartTablePage();
  await pm.navigateTo().toastrPage();
  await pm.navigateTo().tooltipPage();
});

test("Submit Using the Grid", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutPage();
  await pm
    .onFormLayoutPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOption(
      "toni@test.com",
      "Pass123",
      "Option 1",
    );
});

/**
 *
 */
test("Submit Inline Form", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutPage();
  await pm
    .onFormLayoutPage()
    .submitInlineFormWithNameEmailAndCheckbox("Toni", "toni@test.com", false);
});

test("Calendar", async ({ page }) => {
  const pm = new PageManager(page);

  await pm.navigateTo().datepickerPage();
  await pm.onDatepickerPage().selectCommonDatePickerFromToday(200);

  await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(30, 60);
});
