import { test } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";
import {faker} from '@faker-js/faker'

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Navigate to form page @smoke", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutPage();
  await pm.navigateTo().datepickerPage();
  await pm.navigateTo().smartTablePage();
  await pm.navigateTo().toastrPage();
  await pm.navigateTo().tooltipPage();
});

test("Submit Using the Grid @regression", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutPage();
  await pm
    .onFormLayoutPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOption(
      process.env.EMAIL,
      process.env.PASSWORD,
      "Option 1",
    );
});

test("Submit Inline Form", async ({ page }) => {
  const pm = new PageManager(page);
  const randomFullName = faker.person.fullName();
  const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`
  await pm.navigateTo().formLayoutPage();
  await pm
    .onFormLayoutPage()
    .submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false);
});

test("Calendar", async ({ page }) => {
  const pm = new PageManager(page);

  await pm.navigateTo().datepickerPage();
  await pm.onDatepickerPage().selectCommonDatePickerFromToday(200);
  await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(30, 60);
});
