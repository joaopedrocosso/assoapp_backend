"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Year = void 0;
class Year {
    constructor(year, entries) {
        this._year = year;
        this._entries = entries;
    }
    get year() {
        return this._year;
    }
    set year(value) {
        this._year = value;
    }
    get entries() {
        return this._entries;
    }
    set entries(value) {
        this._entries = value;
    }
}
exports.Year = Year;
