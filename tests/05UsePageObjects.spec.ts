import {test, expect} from '@playwright/test'
import {NavigationPage} from "../page-objects/navigationPage"
import { FormLayoutsPage } from '../page-objects/formLayoutsPage';

test.beforeEach(async ({page})=>{
    await page.goto("http://localhost:4200");
})

test('Navigate to form page',async ({page}) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutPage()
    await navigateTo.datepickerPage()
    await navigateTo.smartTablePage()
    await navigateTo.toastrPage()
    await navigateTo.tooltipPage()
})


test('Submit Using the Grid',async ({page}) => {
   const formLayout = new FormLayoutsPage(page)
   const navigateTo = new NavigationPage(page)
   await navigateTo.formLayoutPage()
   await formLayout.submitUsingTheGridFormWithCredentialsAndSelectOption('toni@test.com', 'Pass123', 'Option 1')
})

/**
 * 
 */
test('Submit Inline Form',async ({page}) => {
    const formLayout = new FormLayoutsPage(page)
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutPage()
    await formLayout.submitInlineFormWithNameEmailAndCheckbox('Toni' ,'toni@test.com',  false)
 })
