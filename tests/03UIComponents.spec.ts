import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
});

test.describe("Form Layout Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });

  test("Input fields", async ({ page }) => {
    const usingTheGridEmailInput = page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" });

    // We cannot chain the commands
    await usingTheGridEmailInput.fill("test@test.com");
    await usingTheGridEmailInput.clear();
    await usingTheGridEmailInput.pressSequentially("test2@test.com", {
      delay: 500,
    });

    //Generic assertion
    const inputValue = await usingTheGridEmailInput.inputValue();
    expect(inputValue).toEqual("test2@test.com");

    //Locator assertion
    await expect(usingTheGridEmailInput).toHaveValue("test2@test.com");
  });

  test("Radio Buttons", async ({ page }) => {
    const usingTheGridForm = page.locator("nb-card", {
      hasText: "Using the Grid",
    });
    /* const radioButton1 = usingTheGridForm.getByText('Option 1')
                                           .getByLabel('Option 1');
    const radioButton2 = usingTheGridForm.getByText('Option 2')
                                         .getByRole('radio', {name: 'Option 2'})   
    const radioButton3 = usingTheGridForm.getByText('Disabled Option')
    
    await radioButton1.click()
    await radioButton2.click()
    await radioButton3.click()*/

    const radioButton1 = usingTheGridForm.getByLabel("Option 1");
    const radioButton2 = usingTheGridForm.getByRole("radio", {
      name: "Option 2",
    });
    await radioButton1.check({ force: true });
    const status = await radioButton1.isChecked();

    //Generic assertion
    expect(status).toBeTruthy();
    expect(status).toBe(true);
    expect(await radioButton2.isChecked()).toBe(false);

    //Locator assertion
    await expect(radioButton1).toBeChecked();
    await expect(radioButton2).not.toBeChecked();

    radioButton2.check({ force: true });

    await expect(radioButton1).not.toBeChecked();
    await expect(radioButton2).toBeChecked();
  });
});

test.describe("Toastr Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Toastr").click();
  });

  test("Checkbox", async ({ page }) => {
    const checkbox1 = page.getByRole("checkbox", { name: "Hide on click" });
    const checkbox2 = page.getByRole("checkbox", {
      name: "Prevent arising of duplicate toast",
    });
    const checkbox3 = page.getByRole("checkbox", {
      name: "Show toast with icon",
    });

    await expect(checkbox1).toBeChecked();
    await expect(checkbox2).not.toBeChecked();
    await expect(checkbox3).toBeChecked();

    // checkbox1.check -> check the checkbox, if the checkbox is already checked, it doesn't do anything
    await checkbox1.check();
    await expect(checkbox1).toBeChecked();

    await checkbox1.click({ force: true }); // force true because of class visually-hidden
    await expect(checkbox1).not.toBeChecked();

    await checkbox2.check({ force: true });
    await checkbox3.uncheck({ force: true });

    await expect(checkbox1).not.toBeChecked();
    await expect(checkbox2).toBeChecked();
    await expect(checkbox3).not.toBeChecked();

    // Check all checkboxes
    const allCheckBoxes = page.getByRole("checkbox");
    for (const box of await allCheckBoxes.all()) {
      await box.check({ force: true });
      expect(await box.isChecked()).toBe(true);
    }
    // Uncheck all checkboxes

    for (const box of await allCheckBoxes.all()) {
      await box.uncheck({ force: true });
      expect(await box.isChecked()).toBe(false);
    }
  });
});

test("List and dropdowns", async ({ page }) => {
  const dropDownMenu = page.locator("ngx-header .select-button");
  await dropDownMenu.click();

  /*const optionList = page.locator('.option-list')
    page.getByRole('list') // when the list has a UL tag
    page.getByRole('lisitem') // when the list has a LI tag
    */
  // const optionList =  page.getByRole('list').locator('nb-option')
  const optionList = page.locator("nb-option-list nb-option");
  await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);
  await optionList.filter({ hasText: "Cosmic" }).click();

  const header = page.locator("nb-layout-header");
  await expect(header).toHaveCSS("background-color", "rgb(50, 50, 89)");

  const colors = {
    Light: "rgb(255, 255, 255)",
    Dark: "rgb(34, 43, 69)",
    Cosmic: "rgb(50, 50, 89)",
    Corporate: "rgb(255, 255, 255)",
  };

  await dropDownMenu.click();

  for (const color in colors) {
    await optionList.filter({ hasText: color }).click();
    await expect(header).toHaveCSS("background-color", colors[color]);
    if (color != "Corporate") await dropDownMenu.click();
  }
});

test("Tooltips", async ({ page }) => {
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Tooltip").click();

  const tooltipCard = page.locator("nb-card", {
    hasText: "Tooltip Placements",
  });
  await tooltipCard.getByRole("button", { name: "Top" }).hover();
  const tooltip = await page.locator("nb-tooltip").textContent();
  expect(tooltip).toEqual("This is a tooltip");
  await expect(page.locator("nb-tooltip")).toHaveText("This is a tooltip");
});

test("Dialogue Box", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  page.on("dialog", (dialog) => {
    expect(dialog.message()).toEqual("Are you sure you want to delete?");
    dialog.accept();
  });

  const row = page
    .locator("table")
    .locator("tr", { hasText: "@mdo" })
    .locator(".nb-trash");
  await row.click();

  await expect(page.locator("table tr").first()).not.toHaveText("@mdo");
});
