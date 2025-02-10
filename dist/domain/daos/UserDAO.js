"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDAO = void 0;
class UserDAO {
    constructor(repository) {
        this.repository = repository;
    }
    getAuth(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const getAuthResponse = this.repository.getAuth(email, password);
            return getAuthResponse;
        });
    }
    getUserInfo(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const getUserInfoReponse = this.repository.readWithQuery("backofficeusers", "uid", "==", uid);
            return getUserInfoReponse;
        });
    }
    getUserAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const getUserInfoReponse = this.repository.readAll("backofficeusers");
            return getUserInfoReponse;
        });
    }
}
exports.UserDAO = UserDAO;
