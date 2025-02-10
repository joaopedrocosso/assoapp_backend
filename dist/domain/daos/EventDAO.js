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
exports.EventDAO = void 0;
class EventDAO {
    constructor(repository) {
        this.repository = repository;
    }
    create(eventToBeCreated) {
        return __awaiter(this, void 0, void 0, function* () {
            const createResult = this.repository.create("events", {
                title: eventToBeCreated.title,
                titleDescription: eventToBeCreated.titleDescription,
                date: eventToBeCreated.date,
            });
            return createResult;
        });
    }
    update(eventIdToBeUpdated, eventToBeUpdated) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateResult = this.repository.update("events", eventIdToBeUpdated, {
                title: eventToBeUpdated.title,
                titleDescription: eventToBeUpdated.titleDescription,
                date: eventToBeUpdated.date,
            });
            return updateResult;
        });
    }
    delete(eventIdToBeUpdated) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteResult = this.repository.delete("events", eventIdToBeUpdated);
            return deleteResult;
        });
    }
    read(eventsIdToBeRead) {
        return __awaiter(this, void 0, void 0, function* () {
            const readResult = this.repository.read("events", eventsIdToBeRead);
            return readResult;
        });
    }
    readAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const readAllResult = this.repository.readAll("events");
            return readAllResult;
        });
    }
}
exports.EventDAO = EventDAO;
