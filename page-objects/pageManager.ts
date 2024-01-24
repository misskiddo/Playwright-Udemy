import { Page, expect } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";
import { FormLayoutsPage } from "../page-objects/formLayoutsPage";
import { DatePickerPage } from "../page-objects/datepickerPage";

export class PageManager {
  private readonly page: Page;
  private readonly navigationPage: NavigationPage;
  private readonly formlayoutPage: FormLayoutsPage;
  private readonly datepickerPage: DatePickerPage;

  constructor(page: Page) {
    this.page = page;
    this.navigationPage = new NavigationPage(this.page);
    this.formlayoutPage = new FormLayoutsPage(this.page);
    this.datepickerPage = new DatePickerPage(this.page);
  }

  navigateTo() {
    return this.navigationPage;
  }

  onFormLayoutPage() {
    return this.formlayoutPage;
  }

  onDatepickerPage() {
    return this.datepickerPage;
  }
}
