import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test.describe("Locator syntax rules", () => {
  test("Locators", async ({ page }) => {
    // by Tag name
    page.locator("input");

    //by Id
    page.locator("#inputEmail1");

    //by Class name
    page.locator(".shape-rectangle");

    //by attribute
    page.locator('[placeholder="Email"]');

    //by class value (full)
    page.locator(
      'class="input-full-width size-medium status-basic shape-rectangle nb-transition"',
    );

    //combine different selectors
    page.locator('input[placeholder="Email"].shape-rectangle');

    //by XPath (NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail1"]');

    //by partial text match
    page.locator(':text("Using)');

    // by exact text match
    page.locator(':text-is("Using the Grid")');
  });

  test("User Facing Locators", async ({ page }) => {
    await page.getByRole("button", { name: "Sign in" }).first().click();

    await page.getByLabel("Email").first().click();

    await page.getByPlaceholder("Jane Doe").first().click();

    await page.getByText("Using the Grid").first().click();

    await page.getByTestId("SignIn").first().click();

    await page.getByTitle("IoT Dashboard").first().click();
  });

  test("Child elements", async ({ page }) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click();
    await page
      .locator("nb-card")
      .locator("nb-radio")
      .locator(':text-is("Option 2")')
      .click();

    // Click on "Sign In" under "Using the Grid"
    await page
      .locator("nb-card")
      .getByRole("button", { name: "Sign in" })
      .first()
      .click();
    await page.locator("nb-card").nth(2).getByRole("button").click();
  });

  test("Parent elements", async ({ page }) => {
    // Click on "Email" under "Using the Grid"
    await page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" })
      .click();

    // Click on "radio button Option 2" on the form that contains Email1
    await page
      .locator("nb-card", { has: page.locator("#inputEmail1") })
      .locator(':text-is("Option 2")')
      .click();

    // Click on "Email" under "Basic form"
    await page
      .locator("nb-card")
      .filter({ hasText: "Basic form" })
      .getByRole("textbox", { name: "Email" })
      .click();

    // Click on "Submit" on the Basic form
    await page
      .locator("nb-card")
      .filter({ has: page.locator(".status-danger") })
      .getByRole("button")
      .click();

    // Filter those nb-card that has a checkbox and 'Sign in' button, and finally click on the Email field
    await page
      .locator("nb-card")
      .filter({ has: page.locator("nb-checkbox") })
      .filter({ hasText: "Sign in" })
      .getByRole("textbox", { name: "Email" })
      .click();

    // Using xpath parent '..'
    await page
      .locator(':text-is("Using the Grid")')
      .locator("..")
      .getByRole("textbox", { name: "Email" })
      .click();
  });

  test("Reusing locators", async ({ page }) => {
    /* await page
    .locator("nb-card")
    .filter({ hasText: "Basic form" })
    .getByRole("textbox", { name: "Email" })
    .fill('test@test.com');

    await page
    .locator("nb-card")
    .filter({ hasText: "Basic form" })
    .getByRole("textbox", { name: "Password" })
    .fill('Welcome123');

    await page
    .locator("nb-card")
    .filter({ hasText: "Basic form" })
    .getByRole("button")
    .click();*/

    const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
    const emailField = basicForm.getByRole("textbox", { name: "Email" });
    const emailValue = "test@test.com";

    await emailField.fill(emailValue);

    await basicForm
      .getByRole("textbox", { name: "Password" })
      .fill("Welcome123");

    await basicForm.locator("nb-checkbox").click();

    await basicForm.getByRole("button").click();

    await expect(emailField).toHaveValue(emailValue);
  });

  test("Extracting Values", async ({ page }) => {
    // Single text value
    const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
    const buttonText = await basicForm.locator("button").textContent();
    expect(buttonText).toEqual("Submit");

    // All text value
    const allRBLabels = await page.locator("nb-radio").allTextContents();
    expect(allRBLabels).toContain("Option 1");

    //input value
    const emailField = basicForm.getByRole("textbox", { name: "Email" });
    await emailField.fill("test@test.com");
    const emailValue = await emailField.inputValue();
    expect(emailValue).toEqual("test@test.com");

    //Get placeholder
    const placeholderValue = await emailField.getAttribute("placeholder");
    expect(placeholderValue).toEqual("Email");
  });

  test("Assertions", async ({ page }) => {
    // General assertions
    const value = 5;
    expect(value).toEqual(5);

    const basicFormButton = page
      .locator("nb-card")
      .filter({ hasText: "Basic form" })
      .locator("Button");
    const text = await basicFormButton.textContent();
    expect(text).toEqual("Submit");

    //Locator assertion
    await expect(basicFormButton).toHaveText("Submit");

    //Soft Assertion
    await expect.soft(basicFormButton).toHaveText("Submit");
    await basicFormButton.click();
  });
});
