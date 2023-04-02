import { Log } from "~/services/log";
import { formatCurrency, formatDate } from "~/utils/index";

export type CampaignAPI = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  Budget: number;
};

export class Campaign {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  Budget: number;

  #nameSearchable?: string;
  #budgetFormat?: string;
  #startDateObj?: Date;
  #startDateFormat?: string;
  #endDateObj?: Date;
  #endDateFormat?: string;

  constructor(item: CampaignAPI) {
    this.id = item.id;
    this.name = item.name;
    this.startDate = item.startDate;
    this.endDate = item.endDate;
    this.Budget = item.Budget;
  }

  getNameSearchable() {
    if (this.#nameSearchable === undefined) {
      this.#nameSearchable = this.name.toLowerCase();
    }
    return this.#nameSearchable;
  }

  toStringBudget() {
    if (this.#budgetFormat === undefined) {
      this.#budgetFormat = formatCurrency(this.Budget);
    }
    return this.#budgetFormat;
  }

  getStartDateObj() {
    if (this.#startDateObj == undefined) {
      this.#startDateObj = new Date(this.startDate);
      if (isNaN(this.#startDateObj.getTime())) {
        Log.error(
          "[models/campaign:startDateObj] Invalid Date",
          this.startDate
        );
        throw `Invalid Date [${this.startDate}]`;
      }
    }
    return this.#startDateObj;
  }

  toStringStartDate() {
    if (this.#startDateFormat === undefined) {
      this.#startDateFormat = formatDate(this.getStartDateObj());
    }
    return this.#startDateFormat;
  }

  getEndDateObj() {
    if (this.#endDateObj == undefined) {
      this.#endDateObj = new Date(this.endDate);
      if (isNaN(this.#endDateObj.getTime())) {
        Log.error("[models/campaign:getEndDateObj] Invalid Date", this.endDate);
        throw `Invalid Date [${this.endDate}]`;
      }
    }
    return this.#endDateObj;
  }

  toStringEndDate() {
    if (this.#endDateFormat === undefined) {
      this.#endDateFormat = formatDate(this.getEndDateObj());
    }
    return this.#endDateFormat;
  }

  isActive(currentDate: Date) {
    const startDateObj = this.getStartDateObj();
    const endDateObj = this.getEndDateObj();
    if (currentDate < startDateObj) {
      return false;
    }
    if (endDateObj < currentDate) {
      return false;
    }
    return true;
  }
}
