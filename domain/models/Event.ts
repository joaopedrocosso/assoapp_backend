import { EventENUM } from "../types/EventType";

export class Event {
  private _title: EventENUM;
  private _titleDescription: string | null;
  private _date: Date;

  constructor(title: EventENUM, titleDescription: string | null, date: Date) {
    this._title = title;
    this._titleDescription = titleDescription;
    this._date = date;
  }

  get title(): EventENUM {
    return this._title;
  }

  set title(value: EventENUM) {
    this._title = value;
  }

  get titleDescription(): string | null {
    return this._titleDescription;
  }

  set titleDescription(value: string) {
    this._titleDescription = value;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }
}
