"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
class Event {
    constructor(title, titleDescription, date) {
        this._title = title;
        this._titleDescription = titleDescription;
        this._date = date;
    }
    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
    }
    get titleDescription() {
        return this._titleDescription;
    }
    set titleDescription(value) {
        this._titleDescription = value;
    }
    get date() {
        return this._date;
    }
    set date(value) {
        this._date = value;
    }
}
exports.Event = Event;
