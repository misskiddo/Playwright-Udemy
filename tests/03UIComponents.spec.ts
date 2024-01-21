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
    const usingTheGridForm = page.locator("nb-card", { hasText: "Using the Grid" })
   /* const radioButton1 = usingTheGridForm.getByText('Option 1')
                                           .getByLabel('Option 1');
    const radioButton2 = usingTheGridForm.getByText('Option 2')
                                         .getByRole('radio', {name: 'Option 2'})   
    const radioButton3 = usingTheGridForm.getByText('Disabled Option')
    
    await radioButton1.click()
    await radioButton2.click()
    await radioButton3.click()*/

    const radioButton1 = usingTheGridForm.getByLabel('Option 1');
    const radioButton2 = usingTheGridForm.getByRole('radio', {name: 'Option 2'})   
    await radioButton1.check({force: true})
    const status = await radioButton1.isChecked()
   
    //Generic assertion
    expect(status).toBeTruthy()
    expect(status).toBe(true)
    expect(await radioButton2.isChecked()).toBe(false)

    //Locator assertion
    await expect(radioButton1).toBeChecked()
    await expect(radioButton2).not.toBeChecked()

    radioButton2.check({force: true})
    
    await expect(radioButton1).not.toBeChecked()
    await expect(radioButton2).toBeChecked()
  });
});
