import { Page, expect } from "@playwright/test";

export class DatePickerPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectCommonDatePickerFromToday(numberOfDaysFromToday: number) {
    const calerndarInputField = this.page.getByPlaceholder("Form Picker");
    await calerndarInputField.click();
    const dateToAssert = await this.selectDateInTheCalendar(
      numberOfDaysFromToday,
    );
    await expect(calerndarInputField).toHaveValue(dateToAssert);
  }

  async selectDatepickerWithRangeFromToday(startDay: number, endDate: number) {
    const calerndarInputField = this.page.getByPlaceholder("Range Picker");
    await calerndarInputField.click();
    const dateToAssertStart = await this.selectDateInTheCalendar(
        startDay,
    );
    const dateToAssertEnd = await this.selectDateInTheCalendar(
        endDate,
    );
    const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`
    await expect(calerndarInputField).toHaveValue(dateToAssert);
  }

  private async selectDateInTheCalendar(numberOfDaysFromToday: number) {
    let date = new Date();
    date.setDate(date.getDate() + numberOfDaysFromToday);
    const expectedDate = date.getDate().toString();
    const expectedMonthShort = date.toLocaleString("En-US", { month: "short" });
    const expectedMonthLong = date.toLocaleString("En-US", { month: "long" });
    const expectedYear = date.getFullYear();
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

    let calendarMonthAndYear = await this.page
      .locator("nb-calendar-view-mode")
      .textContent();
    const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`;
    console.log(date);
    console.log(calendarMonthAndYear);
    console.log(expectedMonthAndYear);
    while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
      await this.page.locator(".next-month").click();
      calendarMonthAndYear = await this.page
        .locator("nb-calendar-view-mode")
        .textContent();
    }
    await this.page
      .locator('.day-cell.ng-star-inserted')
      .getByText(expectedDate, { exact: true })
      .click();

    return dateToAssert;
  }
}
