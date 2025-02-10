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
exports.YearDAO = void 0;
class YearDAO {
    constructor(repository) {
        this.repository = repository;
    }
    create(yearToBeCreated) {
        return __awaiter(this, void 0, void 0, function* () {
            const createResult = this.repository.create("years", {
                year: yearToBeCreated.year,
                entries: yearToBeCreated.entries,
            });
            return createResult;
        });
    }
    update(yearIdToBeUpdated, yearToBeUpdated) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateResult = this.repository.update("years", yearIdToBeUpdated, {
                year: yearToBeUpdated.year,
                entries: yearToBeUpdated.entries,
            });
            return updateResult;
        });
    }
    delete(yearIdToBeUpdated) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteResult = this.repository.delete("years", yearIdToBeUpdated);
            return deleteResult;
        });
    }
    read(yearsIdToBeRead) {
        return __awaiter(this, void 0, void 0, function* () {
            const readResult = this.repository.read("years", yearsIdToBeRead);
            return readResult;
        });
    }
    readAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const readAllResult = this.repository.readAll("years");
            return readAllResult;
        });
    }
    readUserInYears(userIdToBeRead) {
        return __awaiter(this, void 0, void 0, function* () {
            const readAllResult = this.repository.readAll("years");
            console.log(readAllResult);
            return readAllResult;
        });
    }
}
exports.YearDAO = YearDAO;
