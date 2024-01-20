import {test} from '@playwright/test'

test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click()
})

test.describe('Locator syntax rules', ()=>{
    test('Locators', async ({page})=>{
       // by Tag name
       page.locator('input')  

       //by Id
       page.locator('#inputEmail1')

       //by Class name
       page.locator('.shape-rectangle')

       //by attribute
       page.locator('[placeholder="Email"]')

       //by class value (full)
       page.locator('class="input-full-width size-medium status-basic shape-rectangle nb-transition"')

       //combine different selectors
       page.locator('input[placeholder="Email"].shape-rectangle')

       //by XPath (NOT RECOMMENDED)
       page.locator('//*[@id="inputEmail1"]')

       //by partial text match
       page.locator(':text("Using)')

       // by exact text match
       page.locator(':text-is("Using the Grid")')


    })

    
})


