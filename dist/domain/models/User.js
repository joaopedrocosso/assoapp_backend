"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(email) {
        this._email = email;
    }
    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }
}
exports.User = User;
