import { EntriesType } from "../types/YearType";

export class Year {
  private _year: number;
  private _entries: EntriesType[];

  constructor(year: number, entries: EntriesType[]) {
    this._year = year;
    this._entries = entries;
  }

  get year(): number {
    return this._year;
  }

  set year(value: number) {
    this._year = value;
  }

  get entries(): EntriesType[] {
    return this._entries;
  }

  set entries(value: EntriesType[]) {
    this._entries = value;
  }
}
