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
const multer_1 = __importDefault(require("multer"));
const AssociateDAO_1 = require("../domain/daos/AssociateDAO");
const Associate_1 = require("../domain/models/Associate");
const firebase_1 = require("../infraestructure/database/firebase");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: "uploads/" });
// Middleware of field validation
const fieldValidate = [
    (0, express_validator_1.body)("fullName").isString().notEmpty(),
    (0, express_validator_1.body)("socialName").isString(),
    (0, express_validator_1.body)("cpf").isString().notEmpty(),
    (0, express_validator_1.body)("idPassport").isString(),
    (0, express_validator_1.body)("email").isString().notEmpty(),
    (0, express_validator_1.body)("emailSecondary").isString(),
    (0, express_validator_1.body)("phone").isString().notEmpty(),
    (0, express_validator_1.body)("contryOfResidence").isString().notEmpty(),
    (0, express_validator_1.body)("stateOfResidence").isString(),
    (0, express_validator_1.body)("cityOfResidence").isString(),
    (0, express_validator_1.body)("nationality").isString().notEmpty(),
    (0, express_validator_1.body)("stateOfBirth").isString(),
    (0, express_validator_1.body)("cityOfBirth").isString(),
    (0, express_validator_1.body)("profilePhoto").isString().notEmpty(),
    (0, express_validator_1.body)("profession").isString().notEmpty(),
    (0, express_validator_1.body)("dateOfAdmission").isISO8601().toDate(),
    (0, express_validator_1.body)("employmentContractIsCurrentlyValid").isBoolean().notEmpty(),
    (0, express_validator_1.body)("personalCode").isNumeric().notEmpty(),
    (0, express_validator_1.body)("isAwarePrivacyPolicy").isBoolean().notEmpty(),
    (0, express_validator_1.body)("grantConcentUseData").isBoolean().notEmpty(),
    (0, express_validator_1.body)("dateOfConcentUseData").isISO8601().toDate(),
    (0, express_validator_1.body)("dateLastMSFJob").isISO8601().toDate(),
    (0, express_validator_1.body)("isHealthcareField").isBoolean().notEmpty(),
    (0, express_validator_1.body)("hasMsfXpOutsideHomeContry").isBoolean().notEmpty(),
    (0, express_validator_1.body)("hasMsfXPinBrazilOrAmerica").isBoolean().notEmpty(),
    (0, express_validator_1.body)("lastPosition").isString().notEmpty(),
    (0, express_validator_1.body)("contractType").isString().notEmpty(),
    (0, express_validator_1.body)("personalHighlightOfXpWorkingWithMsf").isString().notEmpty(),
    (0, express_validator_1.body)("dateOfBirth").isISO8601().toDate(),
    (0, express_validator_1.body)("languages").isArray(),
    (0, express_validator_1.body)("otherLanguages").isString(),
    (0, express_validator_1.body)("gender").isString().notEmpty(),
    (0, express_validator_1.body)("lgbtqiapnplusMember").isString().notEmpty(),
    (0, express_validator_1.body)("race").isString().notEmpty(),
    (0, express_validator_1.body)("otherRace").isString(),
    (0, express_validator_1.body)("ethnicity").isString(),
    (0, express_validator_1.body)("underrepresentedGroup").isString(),
    (0, express_validator_1.body)("communicationAccebilityResources").isArray(),
    (0, express_validator_1.body)("otherCommunicationAccebilityResources").isString(),
    (0, express_validator_1.body)("physicalDisabilityOrReducedMobility").isString(),
    (0, express_validator_1.body)("physicalDisabilityOrReducedMobilityDescription").isString(),
    (0, express_validator_1.body)("physicalDisabilityOrReducedMobilityDescription").isString(),
    (0, express_validator_1.body)("memberShip.memberType").isString().notEmpty(),
    (0, express_validator_1.body)("memberShip.infoDate").isISO8601().toDate(),
    (0, express_validator_1.body)("memberShip.lastRegistrationUpdate").isISO8601().toDate(),
    (0, express_validator_1.body)("memberShip.excludedInfo").isString(),
    (0, express_validator_1.body)("moreThanSixMonthsWithMSF").isBoolean().notEmpty(),
    (0, express_validator_1.body)("moreThanTwelveMonthsInternOrVolunteer").isBoolean().notEmpty(),
    (0, express_validator_1.body)("reciveMessageApp").isBoolean().notEmpty(),
    (0, express_validator_1.body)("reciveGeneralEmails").isBoolean().notEmpty(),
    (0, express_validator_1.body)("events").isArray(),
    (0, express_validator_1.body)("initiatives").isArray(),
    (0, express_validator_1.body)("committee").isArray(),
    (0, express_validator_1.body)("board").isArray(),
    (0, express_validator_1.body)("fiscalCouncil").isArray(),
    (0, express_validator_1.body)("otherInitiatives").isString(),
];
const associateDao = new AssociateDAO_1.AssociateDAO(firebase_1.database);
router.post("/create", fieldValidate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // states if a error occours in validation
    const validateError = (0, express_validator_1.validationResult)(req);
    if (!validateError.isEmpty()) {
        return res.status(400).json({ validateError: validateError.array() });
    }
    const associateParams = req.body;
    const associateToBeCreated = new Associate_1.Associate(associateParams.fullName, associateParams.socialName, associateParams.cpf, associateParams.idPassport, associateParams.email, associateParams.emailSecondary, associateParams.phone, associateParams.contryOfResidence, associateParams.stateOfResidence, associateParams.cityOfResidence, associateParams.nationality, associateParams.stateOfBirth, associateParams.cityOfBirth, associateParams.profilePhoto, associateParams.profession, new Date(associateParams.dateOfAdmission), associateParams.employmentContractIsCurrentlyValid, new Date(associateParams.dateLastMSFJob), associateParams.isHealthcareField, associateParams.hasMsfXpOutsideHomeContry, associateParams.hasMsfXPinBrazilOrAmerica, associateParams.lastPosition, associateParams.contractType, associateParams.personalHighlightOfXpWorkingWithMsf, new Date(associateParams.dateOfBirth), associateParams.languages, associateParams.otherLanguages, associateParams.gender, associateParams.lgbtqiapnplusMember, associateParams.race, associateParams.otherRace, associateParams.ethnicity, associateParams.underrepresentedGroup, associateParams.communicationAccebilityResources, associateParams.otherCommunicationAccebilityResources, associateParams.physicalDisabilityOrReducedMobility, associateParams.physicalDisabilityOrReducedMobilityDescription, {
        memberType: associateParams.memberShip.memberType,
        infoDate: new Date(associateParams.memberShip.infoDate),
        lastRegistrationUpdate: new Date(associateParams.memberShip.lastRegistrationUpdate),
        excludedInfo: associateParams.memberShip.excludedInfo,
    }, associateParams.personalCode, associateParams.isAwarePrivacyPolicy, associateParams.grantConcentUseData, associateParams.dateOfConcentUseData, associateParams.moreThanSixMonthsWithMSF, associateParams.moreThanTwelveMonthsInternOrVolunteer, associateParams.reciveMessageApp, associateParams.reciveGeneralEmails, associateParams.events, associateParams.initiatives.map((iniciative) => {
        let newEndDate = iniciative.endDate ? new Date(iniciative.endDate) : null;
        return {
            title: iniciative.title,
            otherDescription: iniciative.otherDescription,
            startDate: new Date(iniciative.startDate),
            endDate: newEndDate,
            isCurrentlyValid: iniciative.isCurrentlyValid,
        };
    }), associateParams.committee.map((committeeItem) => {
        let newEndDate = committeeItem.endDate
            ? new Date(committeeItem.endDate)
            : null;
        return {
            title: committeeItem.title,
            otherDescription: committeeItem.otherDescription,
            startDate: new Date(committeeItem.startDate),
            endDate: newEndDate,
            isCurrentlyValid: committeeItem.isCurrentlyValid,
        };
    }), associateParams.board.map((boardItem) => {
        let newEndDate = boardItem.endDate ? new Date(boardItem.endDate) : null;
        return {
            title: boardItem.title,
            startDate: new Date(boardItem.startDate),
            endDate: newEndDate,
            extraInfo: boardItem.extraInfo,
            isCurrentlyValid: boardItem.isCurrentlyValid,
        };
    }), associateParams.fiscalCouncil.map((fiscalCouncilItem) => {
        let newEndDate = fiscalCouncilItem.endDate
            ? new Date(fiscalCouncilItem.endDate)
            : null;
        return {
            title: fiscalCouncilItem.title,
            startDate: new Date(fiscalCouncilItem.startDate),
            endDate: newEndDate,
            extraInfo: fiscalCouncilItem.extraInfo,
            isCurrentlyValid: fiscalCouncilItem.isCurrentlyValid,
        };
    }), associateParams.otherInitiatives, associateParams.lastAssociateUpdate.map((associateUpdate) => {
        let newUpdateDate = new Date(associateUpdate.date);
        return {
            userId: associateUpdate.userId,
            date: newUpdateDate,
        };
    }));
    const result = yield associateDao.create(associateToBeCreated);
    console.log(result);
    res.status(result.status).send(result.response);
}));
router.put("/update/:associateId", fieldValidate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const associateId = req.params.associateId;
    // states if a error occours in validation
    const validateError = (0, express_validator_1.validationResult)(req);
    if (!validateError.isEmpty()) {
        return res.status(400).json({ validateError: validateError.array() });
    }
    const associateParams = req.body;
    associateParams.lastAssociateUpdate[0] = {
        userId: associateParams.lastAssociateUpdate[0].userId,
        date: new Date(associateParams.lastAssociateUpdate[0].date),
    };
    const associateToBeUpdated = new Associate_1.Associate(associateParams.fullName, associateParams.socialName, associateParams.cpf, associateParams.idPassport, associateParams.email, associateParams.emailSecondary, associateParams.phone, associateParams.contryOfResidence, associateParams.stateOfResidence, associateParams.cityOfResidence, associateParams.nationality, associateParams.stateOfBirth, associateParams.cityOfBirth, associateParams.profilePhoto, associateParams.profession, new Date(associateParams.dateOfAdmission), associateParams.employmentContractIsCurrentlyValid, new Date(associateParams.dateLastMSFJob), associateParams.isHealthcareField, associateParams.hasMsfXpOutsideHomeContry, associateParams.hasMsfXPinBrazilOrAmerica, associateParams.lastPosition, associateParams.contractType, associateParams.personalHighlightOfXpWorkingWithMsf, new Date(associateParams.dateOfBirth), associateParams.languages, associateParams.otherLanguages, associateParams.gender, associateParams.lgbtqiapnplusMember, associateParams.race, associateParams.otherRace, associateParams.ethnicity, associateParams.underrepresentedGroup, associateParams.communicationAccebilityResources, associateParams.otherCommunicationAccebilityResources, associateParams.physicalDisabilityOrReducedMobility, associateParams.physicalDisabilityOrReducedMobilityDescription, {
        memberType: associateParams.memberShip.memberType,
        infoDate: new Date(associateParams.memberShip.infoDate),
        lastRegistrationUpdate: new Date(associateParams.memberShip.lastRegistrationUpdate),
        excludedInfo: associateParams.memberShip.excludedInfo,
    }, associateParams.personalCode, associateParams.isAwarePrivacyPolicy, associateParams.grantConcentUseData, associateParams.dateOfConcentUseData, associateParams.moreThanSixMonthsWithMSF, associateParams.moreThanTwelveMonthsInternOrVolunteer, associateParams.reciveMessageApp, associateParams.reciveGeneralEmails, associateParams.events, associateParams.initiatives.map((iniciative) => {
        let newEndDate = iniciative.endDate
            ? new Date(iniciative.endDate)
            : null;
        return {
            title: iniciative.title,
            otherDescription: iniciative.otherDescription,
            startDate: new Date(iniciative.startDate),
            endDate: newEndDate,
            isCurrentlyValid: iniciative.isCurrentlyValid,
        };
    }), associateParams.committee.map((committeeItem) => {
        let newEndDate = committeeItem.endDate
            ? new Date(committeeItem.endDate)
            : null;
        return {
            title: committeeItem.title,
            otherDescription: committeeItem.otherDescription,
            startDate: new Date(committeeItem.startDate),
            endDate: newEndDate,
            isCurrentlyValid: committeeItem.isCurrentlyValid,
        };
    }), associateParams.board.map((boardItem) => {
        let newEndDate = boardItem.endDate ? new Date(boardItem.endDate) : null;
        return {
            title: boardItem.title,
            startDate: new Date(boardItem.startDate),
            endDate: newEndDate,
            extraInfo: boardItem.extraInfo,
            isCurrentlyValid: boardItem.isCurrentlyValid,
        };
    }), associateParams.fiscalCouncil.map((fiscalCouncilItem) => {
        let newEndDate = fiscalCouncilItem.endDate
            ? new Date(fiscalCouncilItem.endDate)
            : null;
        return {
            title: fiscalCouncilItem.title,
            startDate: new Date(fiscalCouncilItem.startDate),
            endDate: newEndDate,
            extraInfo: fiscalCouncilItem.extraInfo,
            isCurrentlyValid: fiscalCouncilItem.isCurrentlyValid,
        };
    }), associateParams.otherInitiatives, associateParams.lastAssociateUpdate);
    const result = yield associateDao.update(associateId, associateToBeUpdated);
    console.log(result);
    res.status(result.status).send(result.response);
}));
router.delete("/delete/:associateId", [(0, express_validator_1.param)("associateId").exists()], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const associateId = req.params.associateId;
    const result = yield associateDao.delete(associateId);
    console.log(result);
    res.status(result.status).send(result.response);
}));
router.get("/read/:associateId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const associateId = req.params.associateId;
    const result = yield associateDao.read(associateId);
    console.log(result);
    res.status(result.status).send(result.response);
}));
router.get("/readWithQuery/:parameterInputed/:stringOperatorInputed/:valueInputed", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const associateParameterInputed = req.params.parameterInputed;
    const associateStringOperatorInputed = req.params.stringOperatorInputed;
    const associateValueInputed = req.params.valueInputed;
    const result = yield associateDao.readWithQuery(associateParameterInputed, associateStringOperatorInputed, associateValueInputed);
    console.log(result);
    res.status(result.status).send(result.response);
}));
router.get("/readall", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield associateDao.readAll();
    console.log(result);
    res.status(result.status).send(result.response);
}));
router.post("/profilepic/upload", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("file:\n", req.file);
    if (req.file) {
        let profilePic = req.file;
        const result = yield associateDao.updateProfilePhoto("teste", profilePic);
        res.status(result.status).send(result.response);
    }
    else {
        res.status(500).send("Something gone wrong... Is there a file?");
    }
}));
router.all("*", (req, res, next) => {
    res.status(500).send("Something gone wrong...");
});
exports.default = router;
