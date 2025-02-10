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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const firebase_1 = require("../infraestructure/database/firebase");
const Event_1 = require("../domain/models/Event");
const EventDAO_1 = require("../domain/daos/EventDAO");
const AssociateDAO_1 = require("../domain/daos/AssociateDAO");
const Associate_1 = require("../domain/models/Associate");
const router = express_1.default.Router();
// Middleware of field validation
const fieldValidate = [
    (0, express_validator_1.body)("title").isString().notEmpty(),
    (0, express_validator_1.body)("titleDescription").isString(),
    (0, express_validator_1.body)("date").isISO8601().toDate(),
];
const eventDao = new EventDAO_1.EventDAO(firebase_1.database);
const associateDao = new AssociateDAO_1.AssociateDAO(firebase_1.database);
router.post("/create", fieldValidate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // states if a error occours in validation
    const validateError = (0, express_validator_1.validationResult)(req);
    if (!validateError.isEmpty()) {
        return res.status(400).json({ validateError: validateError.array() });
    }
    const eventParams = req.body;
    const eventToBeCreated = new Event_1.Event(eventParams.title, eventParams.titleDescription, eventParams.date);
    const result = yield eventDao.create(eventToBeCreated);
    console.log(result);
    res.status(result.status).send(result.response);
}));
router.put("/update/:eventId", fieldValidate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.eventId;
    // states if a error occours in validation
    const validateError = (0, express_validator_1.validationResult)(req);
    if (!validateError.isEmpty()) {
        return res.status(400).json({ validateError: validateError.array() });
    }
    const eventParams = req.body;
    const eventToBeUpdated = new Event_1.Event(eventParams.title, eventParams.titleDescription, new Date(eventParams.date));
    const result = yield eventDao.update(eventId, eventToBeUpdated);
    console.log(result);
    res.status(result.status).send(result.response);
}));
router.put("/update/participants/:eventId/add/:associateId", fieldValidate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.eventId;
    const associateId = req.params.associateId;
    const update = req.body;
    const associateToBeUpdated = yield associateDao.read(associateId);
    let newAssociateToBeUpdated = Object.assign(Object.assign({}, associateToBeUpdated.response[0].data), { events: [...associateToBeUpdated.response[0].data.events, eventId], lastAssociateUpdate: [
            update,
            ...associateToBeUpdated.response[0].data.lastAssociateUpdate,
        ] });
    let associateUpdated = new Associate_1.Associate(newAssociateToBeUpdated.fullName, newAssociateToBeUpdated.socialName, newAssociateToBeUpdated.cpf, newAssociateToBeUpdated.idPassport, newAssociateToBeUpdated.email, newAssociateToBeUpdated.emailSecondary, newAssociateToBeUpdated.phone, newAssociateToBeUpdated.contryOfResidence, newAssociateToBeUpdated.stateOfResidence, newAssociateToBeUpdated.cityOfResidence, newAssociateToBeUpdated.nationality, newAssociateToBeUpdated.stateOfBirth, newAssociateToBeUpdated.cityOfBirth, newAssociateToBeUpdated.profilePhoto, newAssociateToBeUpdated.profession, newAssociateToBeUpdated.dateOfAdmission, newAssociateToBeUpdated.employmentContractIsCurrentlyValid, newAssociateToBeUpdated.dateLastMSFJob, newAssociateToBeUpdated.isHealthcareField, newAssociateToBeUpdated.hasMsfXpOutsideHomeContry, newAssociateToBeUpdated.hasMsfXPinBrazilOrAmerica, newAssociateToBeUpdated.lastPosition, newAssociateToBeUpdated.contractType, newAssociateToBeUpdated.personalHighlightOfXpWorkingWithMsf, newAssociateToBeUpdated.dateOfBirth, newAssociateToBeUpdated.languages, newAssociateToBeUpdated.otherLanguages, newAssociateToBeUpdated.gender, newAssociateToBeUpdated.lgbtqiapnplusMember, newAssociateToBeUpdated.race, newAssociateToBeUpdated.otherRace, newAssociateToBeUpdated.ethnicity, newAssociateToBeUpdated.underrepresentedGroup, newAssociateToBeUpdated.communicationAccebilityResources, newAssociateToBeUpdated.otherCommunicationAccebilityResources, newAssociateToBeUpdated.physicalDisabilityOrReducedMobility, newAssociateToBeUpdated.physicalDisabilityOrReducedMobilityDescription, newAssociateToBeUpdated.memberShip, newAssociateToBeUpdated.personalCode, newAssociateToBeUpdated.isAwarePrivacyPolicy, newAssociateToBeUpdated.grantConcentUseData, newAssociateToBeUpdated.dateOfConcentUseData, newAssociateToBeUpdated.moreThanSixMonthsWithMSF, newAssociateToBeUpdated.moreThanTwelveMonthsInternOrVolunteer, newAssociateToBeUpdated.reciveMessageApp, newAssociateToBeUpdated.reciveGeneralEmails, newAssociateToBeUpdated.events, newAssociateToBeUpdated.initiatives, newAssociateToBeUpdated.committee, newAssociateToBeUpdated.board, newAssociateToBeUpdated.fiscalCouncil, newAssociateToBeUpdated.otherInitiatives, newAssociateToBeUpdated.lastAssociateUpdate);
    yield associateDao.update(associateToBeUpdated.response[0].id, associateUpdated);
    let result = yield associateDao.readWithQuery("events", "array-contains", eventId);
    console.log(result);
    res.status(result.status).send(result.response);
}));
router.put("/update/participants/:eventId/remove/:associateId", fieldValidate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.eventId;
    const associateId = req.params.associateId;
    const associateToBeUpdated = yield associateDao.read(associateId);
    const update = req.body;
    let newAssociateToBeUpdated = Object.assign(Object.assign({}, associateToBeUpdated.response[0].data), { events: associateToBeUpdated.response[0].data.events.filter((event) => event !== eventId), lastAssociateUpdate: [
            update,
            ...associateToBeUpdated.response[0].data.lastAssociateUpdate,
        ] });
    let associateUpdated = new Associate_1.Associate(newAssociateToBeUpdated.fullName, newAssociateToBeUpdated.socialName, newAssociateToBeUpdated.cpf, newAssociateToBeUpdated.idPassport, newAssociateToBeUpdated.email, newAssociateToBeUpdated.emailSecondary, newAssociateToBeUpdated.phone, newAssociateToBeUpdated.contryOfResidence, newAssociateToBeUpdated.stateOfResidence, newAssociateToBeUpdated.cityOfResidence, newAssociateToBeUpdated.nationality, newAssociateToBeUpdated.stateOfBirth, newAssociateToBeUpdated.cityOfBirth, newAssociateToBeUpdated.profilePhoto, newAssociateToBeUpdated.profession, newAssociateToBeUpdated.dateOfAdmission, newAssociateToBeUpdated.employmentContractIsCurrentlyValid, newAssociateToBeUpdated.dateLastMSFJob, newAssociateToBeUpdated.isHealthcareField, newAssociateToBeUpdated.hasMsfXpOutsideHomeContry, newAssociateToBeUpdated.hasMsfXPinBrazilOrAmerica, newAssociateToBeUpdated.lastPosition, newAssociateToBeUpdated.contractType, newAssociateToBeUpdated.personalHighlightOfXpWorkingWithMsf, newAssociateToBeUpdated.dateOfBirth, newAssociateToBeUpdated.languages, newAssociateToBeUpdated.otherLanguages, newAssociateToBeUpdated.gender, newAssociateToBeUpdated.lgbtqiapnplusMember, newAssociateToBeUpdated.race, newAssociateToBeUpdated.otherRace, newAssociateToBeUpdated.ethnicity, newAssociateToBeUpdated.underrepresentedGroup, newAssociateToBeUpdated.communicationAccebilityResources, newAssociateToBeUpdated.otherCommunicationAccebilityResources, newAssociateToBeUpdated.physicalDisabilityOrReducedMobility, newAssociateToBeUpdated.physicalDisabilityOrReducedMobilityDescription, newAssociateToBeUpdated.memberShip, newAssociateToBeUpdated.personalCode, newAssociateToBeUpdated.isAwarePrivacyPolicy, newAssociateToBeUpdated.grantConcentUseData, newAssociateToBeUpdated.dateOfConcentUseData, newAssociateToBeUpdated.moreThanSixMonthsWithMSF, newAssociateToBeUpdated.moreThanTwelveMonthsInternOrVolunteer, newAssociateToBeUpdated.reciveMessageApp, newAssociateToBeUpdated.reciveGeneralEmails, newAssociateToBeUpdated.events, newAssociateToBeUpdated.initiatives, newAssociateToBeUpdated.committee, newAssociateToBeUpdated.board, newAssociateToBeUpdated.fiscalCouncil, newAssociateToBeUpdated.otherInitiatives, newAssociateToBeUpdated.lastAssociateUpdate);
    yield associateDao.update(associateToBeUpdated.response[0].id, associateUpdated);
    let result = yield associateDao.readWithQuery("events", "array-contains", eventId);
    console.log(result);
    res.status(result.status).send(result.response);
}));
router.delete("/delete/:eventId", [(0, express_validator_1.param)("eventId").exists()], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.eventId;
    const associatesWithEventToBeUpdated = yield associateDao.readWithQuery("events", "array-contains", eventId);
    associatesWithEventToBeUpdated.response.map((associateToBeUpdated) => __awaiter(void 0, void 0, void 0, function* () {
        let associateToBeUpdatedWithoutEventId = Object.assign(Object.assign({}, associateToBeUpdated.data), { events: associateToBeUpdated.data.events.filter((event) => event !== eventId) });
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log(associateToBeUpdatedWithoutEventId);
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        let associateUpdated = new Associate_1.Associate(associateToBeUpdatedWithoutEventId.fullName, associateToBeUpdatedWithoutEventId.socialName, associateToBeUpdatedWithoutEventId.cpf, associateToBeUpdatedWithoutEventId.idPassport, associateToBeUpdatedWithoutEventId.email, associateToBeUpdatedWithoutEventId.emailSecondary, associateToBeUpdatedWithoutEventId.phone, associateToBeUpdatedWithoutEventId.contryOfResidence, associateToBeUpdatedWithoutEventId.stateOfResidence, associateToBeUpdatedWithoutEventId.cityOfResidence, associateToBeUpdatedWithoutEventId.nationality, associateToBeUpdatedWithoutEventId.stateOfBirth, associateToBeUpdatedWithoutEventId.cityOfBirth, associateToBeUpdatedWithoutEventId.profilePhoto, associateToBeUpdatedWithoutEventId.profession, associateToBeUpdatedWithoutEventId.dateOfAdmission, associateToBeUpdatedWithoutEventId.employmentContractIsCurrentlyValid, associateToBeUpdatedWithoutEventId.dateLastMSFJob, associateToBeUpdatedWithoutEventId.isHealthcareField, associateToBeUpdatedWithoutEventId.hasMsfXpOutsideHomeContry, associateToBeUpdatedWithoutEventId.hasMsfXPinBrazilOrAmerica, associateToBeUpdatedWithoutEventId.lastPosition, associateToBeUpdatedWithoutEventId.contractType, associateToBeUpdatedWithoutEventId.personalHighlightOfXpWorkingWithMsf, associateToBeUpdatedWithoutEventId.dateOfBirth, associateToBeUpdatedWithoutEventId.languages, associateToBeUpdatedWithoutEventId.otherLanguages, associateToBeUpdatedWithoutEventId.gender, associateToBeUpdatedWithoutEventId.lgbtqiapnplusMember, associateToBeUpdatedWithoutEventId.race, associateToBeUpdatedWithoutEventId.otherRace, associateToBeUpdatedWithoutEventId.ethnicity, associateToBeUpdatedWithoutEventId.underrepresentedGroup, associateToBeUpdatedWithoutEventId.communicationAccebilityResources, associateToBeUpdatedWithoutEventId.otherCommunicationAccebilityResources, associateToBeUpdatedWithoutEventId.physicalDisabilityOrReducedMobility, associateToBeUpdatedWithoutEventId.physicalDisabilityOrReducedMobilityDescription, associateToBeUpdatedWithoutEventId.memberShip, associateToBeUpdatedWithoutEventId.personalCode, associateToBeUpdatedWithoutEventId.isAwarePrivacyPolicy, associateToBeUpdatedWithoutEventId.grantConcentUseData, associateToBeUpdatedWithoutEventId.dateOfConcentUseData, associateToBeUpdatedWithoutEventId.moreThanSixMonthsWithMSF, associateToBeUpdatedWithoutEventId.moreThanTwelveMonthsInternOrVolunteer, associateToBeUpdatedWithoutEventId.reciveMessageApp, associateToBeUpdatedWithoutEventId.reciveGeneralEmails, associateToBeUpdatedWithoutEventId.events, associateToBeUpdatedWithoutEventId.initiatives, associateToBeUpdatedWithoutEventId.committee, associateToBeUpdatedWithoutEventId.board, associateToBeUpdatedWithoutEventId.fiscalCouncil, associateToBeUpdatedWithoutEventId.otherInitiatives, associateToBeUpdatedWithoutEventId.lastAssociateUpdate);
        yield associateDao.update(associateToBeUpdated.id, associateUpdated);
    }));
    const deleteResult = yield eventDao.delete(eventId);
    console.log(associatesWithEventToBeUpdated);
    res
        .status(deleteResult.status)
        .send(associatesWithEventToBeUpdated.response);
}));
router.get("/read/:eventId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.eventId;
    const result = yield eventDao.read(eventId);
    console.log(result);
    res.status(result.status).send(result.response);
}));
router.get("/participantsof/:eventId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.eventId;
    const result = yield associateDao.readWithQuery("events", "array-contains", eventId);
    console.log(result);
    res.status(result.status).send(result.response);
}));
router.get("/readall", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield eventDao.readAll();
    console.log(result);
    res.status(result.status).send(result.response);
}));
router.all("*", (req, res, next) => {
    res.status(500).send("Something gone wrong...");
});
exports.default = router;
