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
const Year_1 = require("../domain/models/Year");
const YearDAO_1 = require("../domain/daos/YearDAO");
const AssociateDAO_1 = require("../domain/daos/AssociateDAO");
const Associate_1 = require("../domain/models/Associate");
const router = express_1.default.Router();
// Middleware of field validation
const fieldValidate = [
    (0, express_validator_1.body)("year").isNumeric().notEmpty(),
    (0, express_validator_1.body)("entries").isArray(),
];
const yearDao = new YearDAO_1.YearDAO(firebase_1.database);
const associateDao = new AssociateDAO_1.AssociateDAO(firebase_1.database);
router.post("/create", fieldValidate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // states if a error occours in validation
    const validateError = (0, express_validator_1.validationResult)(req);
    if (!validateError.isEmpty()) {
        return res.status(400).json({ validateError: validateError.array() });
    }
    let yearEntriesToBeCreated = [];
    const yearParams = req.body;
    yearParams.entries.map((yearParamsEntrie) => {
        console.log(yearParamsEntrie.annualFeeValue);
        yearEntriesToBeCreated.push({
            id: yearParamsEntrie.id,
            annualFeeValue: yearParamsEntrie.annualFeeValue,
            date: new Date(yearParamsEntrie.date),
            otherChoiceRightToVote: yearParamsEntrie.otherChoiceRightToVote,
            otherPaymentMethod: yearParamsEntrie.otherPaymentMethod,
            paymentMethod: yearParamsEntrie.paymentMethod,
            receipt: yearParamsEntrie.receipt,
            rightToVote: yearParamsEntrie.rightToVote,
            voted: yearParamsEntrie.voted,
        });
    });
    console.log(yearEntriesToBeCreated);
    const yearToBeCreated = new Year_1.Year(yearParams.year, yearEntriesToBeCreated);
    const result = yield yearDao.create(yearToBeCreated);
    console.log(result);
    res.status(result.status).send(result.response);
}));
router.put("/update/:yearId/associate/:associateId", fieldValidate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const associateId = req.params.associateId;
    const associateToBeUpdatedInYear = yield associateDao.read(associateId);
    const update = {
        userId: req.body.update.userId,
        date: new Date(req.body.update.date),
    };
    let associateToBeUpdated = Object.assign(Object.assign({}, associateToBeUpdatedInYear.response[0].data), { lastAssociateUpdate: [
            update,
            ...associateToBeUpdatedInYear.response[0].data.lastAssociateUpdate,
        ] });
    let associateUpdated = new Associate_1.Associate(associateToBeUpdated.fullName, associateToBeUpdated.socialName, associateToBeUpdated.cpf, associateToBeUpdated.idPassport, associateToBeUpdated.email, associateToBeUpdated.emailSecondary, associateToBeUpdated.phone, associateToBeUpdated.contryOfResidence, associateToBeUpdated.stateOfResidence, associateToBeUpdated.cityOfResidence, associateToBeUpdated.nationality, associateToBeUpdated.stateOfBirth, associateToBeUpdated.cityOfBirth, associateToBeUpdated.profilePhoto, associateToBeUpdated.profession, associateToBeUpdated.dateOfAdmission, associateToBeUpdated.employmentContractIsCurrentlyValid, associateToBeUpdated.dateLastMSFJob, associateToBeUpdated.isHealthcareField, associateToBeUpdated.hasMsfXpOutsideHomeContry, associateToBeUpdated.hasMsfXPinBrazilOrAmerica, associateToBeUpdated.lastPosition, associateToBeUpdated.contractType, associateToBeUpdated.personalHighlightOfXpWorkingWithMsf, associateToBeUpdated.dateOfBirth, associateToBeUpdated.languages, associateToBeUpdated.otherLanguages, associateToBeUpdated.gender, associateToBeUpdated.lgbtqiapnplusMember, associateToBeUpdated.race, associateToBeUpdated.otherRace, associateToBeUpdated.ethnicity, associateToBeUpdated.underrepresentedGroup, associateToBeUpdated.communicationAccebilityResources, associateToBeUpdated.otherCommunicationAccebilityResources, associateToBeUpdated.physicalDisabilityOrReducedMobility, associateToBeUpdated.physicalDisabilityOrReducedMobilityDescription, associateToBeUpdated.memberShip, associateToBeUpdated.personalCode, associateToBeUpdated.isAwarePrivacyPolicy, associateToBeUpdated.grantConcentUseData, associateToBeUpdated.dateOfConcentUseData, associateToBeUpdated.moreThanSixMonthsWithMSF, associateToBeUpdated.moreThanTwelveMonthsInternOrVolunteer, associateToBeUpdated.reciveMessageApp, associateToBeUpdated.reciveGeneralEmails, associateToBeUpdated.events, associateToBeUpdated.initiatives, associateToBeUpdated.committee, associateToBeUpdated.board, associateToBeUpdated.fiscalCouncil, associateToBeUpdated.otherInitiatives, associateToBeUpdated.lastAssociateUpdate);
    const associateUpdateResult = yield associateDao.update(associateToBeUpdatedInYear.response[0].id, associateUpdated);
    const yearId = req.params.yearId;
    // states if a error occours in validation
    const validateError = (0, express_validator_1.validationResult)(req);
    if (!validateError.isEmpty()) {
        return res.status(400).json({ validateError: validateError.array() });
    }
    let yearEntriesToBeUpdated = [];
    const yearParams = req.body;
    yearParams.entries.map((yearParamsEntrie) => {
        yearEntriesToBeUpdated.push({
            id: yearParamsEntrie.id,
            annualFeeValue: yearParamsEntrie.annualFeeValue,
            date: new Date(yearParamsEntrie.date),
            otherChoiceRightToVote: yearParamsEntrie.otherChoiceRightToVote,
            otherPaymentMethod: yearParamsEntrie.otherPaymentMethod,
            paymentMethod: yearParamsEntrie.paymentMethod,
            receipt: yearParamsEntrie.receipt,
            rightToVote: yearParamsEntrie.rightToVote,
            voted: yearParamsEntrie.voted,
        });
    });
    console.log(yearEntriesToBeUpdated);
    const yearToBeUpdated = new Year_1.Year(yearParams.year, yearEntriesToBeUpdated);
    const result = yield yearDao.update(yearId, yearToBeUpdated);
    result.response.push(associateUpdateResult);
    res.status(result.status).send(result.response);
}));
router.put("/update/:yearId", fieldValidate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const yearId = req.params.yearId;
    // states if a error occours in validation
    const validateError = (0, express_validator_1.validationResult)(req);
    if (!validateError.isEmpty()) {
        return res.status(400).json({ validateError: validateError.array() });
    }
    let yearEntriesToBeUpdated = [];
    const yearParams = req.body;
    yearParams.entries.map((yearParamsEntrie) => {
        yearEntriesToBeUpdated.push({
            id: yearParamsEntrie.id,
            annualFeeValue: yearParamsEntrie.annualFeeValue,
            date: new Date(yearParamsEntrie.date),
            otherChoiceRightToVote: yearParamsEntrie.otherChoiceRightToVote,
            otherPaymentMethod: yearParamsEntrie.otherPaymentMethod,
            paymentMethod: yearParamsEntrie.paymentMethod,
            receipt: yearParamsEntrie.receipt,
            rightToVote: yearParamsEntrie.rightToVote,
            voted: yearParamsEntrie.voted,
        });
    });
    console.log(yearEntriesToBeUpdated);
    const yearToBeUpdated = new Year_1.Year(yearParams.year, yearEntriesToBeUpdated);
    const result = yield yearDao.update(yearId, yearToBeUpdated);
    console.log(result);
    res.status(result.status).send(result.response);
}));
router.delete("/delete/:yearId", [(0, express_validator_1.param)("yearId").exists()], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const yearId = req.params.yearId;
    const result = yield yearDao.delete(yearId);
    console.log(result);
    res.status(result.status).send(result.response);
}));
router.get("/read/:yearId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const yearId = req.params.yearId;
    const result = yield yearDao.read(yearId);
    console.log(result);
    res.status(result.status).send(result.response);
}));
router.get("/readall", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield yearDao.readAll();
    console.log(result);
    res.status(result.status).send(result.response);
}));
router.get("/readUser/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    let resultResponse = [];
    let isUserFound = false;
    const resultUserInYears = yield yearDao.readUserInYears(userId);
    const resultUserInYearsValues = Object.values(resultUserInYears.response);
    resultUserInYearsValues.map((yearResponse) => {
        const year = yearResponse.data.year;
        yearResponse.data.entries.map((entrie) => {
            if (userId == entrie.id) {
                resultResponse.push({ year: year, entries: entrie });
                isUserFound = true;
            }
        });
    });
    let resultStatus = 500;
    isUserFound ? (resultStatus = 200) : (resultStatus = 404);
    const result = {
        status: resultStatus,
        response: resultResponse,
    };
    res.status(result.status).send(result.response);
}));
router.all("*", (req, res, next) => {
    res.status(500).send("Something gone wrong...");
});
exports.default = router;
