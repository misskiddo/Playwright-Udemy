import { test } from "../test-option";
import { faker } from "@faker-js/faker";

/*
test.beforeEach(async ({ page }) => {
  await page.goto("/");
});*/

test("Submit Forms", async ({ pageManager }) => {
 
  const randomFullName = faker.person.fullName();
  const randomEmail = `${randomFullName.replace(" ", "")}${faker.number.int(100)}@test.com`;
  //await pm.navigateTo().formLayoutPage();
  await pageManager
    .onFormLayoutPage()
    .submitInlineFormWithNameEmailAndCheckbox(
      randomFullName,
      randomEmail,
      false,
    );
  await pageManager
    .onFormLayoutPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOption(
      process.env.EMAIL,
      process.env.PASSWORD,
      "Option 1",
    );
});
