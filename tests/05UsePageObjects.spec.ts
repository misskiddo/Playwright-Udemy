import {test, expect} from '@playwright/test'
import {NavigationPage} from "../page-objects/navigationPage"
import { FormLayoutsPage } from '../page-objects/formLayoutsPage';
import { DatePickerPage } from '../page-objects/datepickerPage';

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

 test('Calendar',async ({page}) => {
    const navigateTo = new NavigationPage(page)
    const onDatepickerPage = new DatePickerPage(page)

    await navigateTo.datepickerPage()
    await onDatepickerPage.selectCommonDatePickerFromToday(200)

    await onDatepickerPage.selectDatepickerWithRangeFromToday(30, 60);
 })