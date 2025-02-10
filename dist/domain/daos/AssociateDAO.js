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
exports.AssociateDAO = void 0;
class AssociateDAO {
    constructor(repository) {
        this.repository = repository;
    }
    create(associateToBeCreated) {
        return __awaiter(this, void 0, void 0, function* () {
            const createResult = this.repository.create("associates", {
                fullName: associateToBeCreated.fullName,
                socialName: associateToBeCreated.socialName,
                cpf: associateToBeCreated.cpf,
                idPassport: associateToBeCreated.idPassport,
                email: associateToBeCreated.email,
                emailSecondary: associateToBeCreated.emailSecondary,
                phone: associateToBeCreated.phone,
                contryOfResidence: associateToBeCreated.contryOfResidence,
                stateOfResidence: associateToBeCreated.stateOfResidence,
                cityOfResidence: associateToBeCreated.cityOfResidence,
                nationality: associateToBeCreated.nationality,
                stateOfBirth: associateToBeCreated.stateOfBirth,
                cityOfBirth: associateToBeCreated.cityOfBirth,
                profilePhoto: associateToBeCreated.profilePhoto,
                profession: associateToBeCreated.profession,
                dateOfAdmission: associateToBeCreated.dateOfAdmission,
                employmentContractIsCurrentlyValid: associateToBeCreated.employmentContractIsCurrentlyValid,
                dateLastMSFJob: associateToBeCreated.dateLastMSFJob,
                isHealthcareField: associateToBeCreated.isHealthcareField,
                hasMsfXpOutsideHomeContry: associateToBeCreated.hasMsfXpOutsideHomeContry,
                hasMsfXPinBrazilOrAmerica: associateToBeCreated.hasMsfXPinBrazilOrAmerica,
                lastPosition: associateToBeCreated.lastPosition,
                contractType: associateToBeCreated.contractType,
                personalHighlightOfXpWorkingWithMsf: associateToBeCreated.personalHighlightOfXpWorkingWithMsf,
                dateOfBirth: associateToBeCreated.dateOfBirth,
                languages: associateToBeCreated.languages,
                otherLanguages: associateToBeCreated.otherLanguages,
                gender: associateToBeCreated.gender,
                lgbtqiapnplusMember: associateToBeCreated.lgbtqiapnplusMember,
                race: associateToBeCreated.race,
                otherRace: associateToBeCreated.otherRace,
                ethnicity: associateToBeCreated.ethnicity,
                underrepresentedGroup: associateToBeCreated.underrepresentedGroup,
                communicationAccebilityResources: associateToBeCreated.communicationAccebilityResources,
                otherCommunicationAccebilityResources: associateToBeCreated.otherCommunicationAccebilityResources,
                physicalDisabilityOrReducedMobility: associateToBeCreated.physicalDisabilityOrReducedMobility,
                physicalDisabilityOrReducedMobilityDescription: associateToBeCreated.physicalDisabilityOrReducedMobilityDescription,
                memberShip: associateToBeCreated.memberShip,
                personalCode: associateToBeCreated.personalCode,
                isAwarePrivacyPolicy: associateToBeCreated.isAwarePrivacyPolicy,
                grantConcentUseData: associateToBeCreated.grantConcentUseData,
                dateOfConcentUseData: associateToBeCreated.dateOfConcentUseData,
                moreThanSixMonthsWithMSF: associateToBeCreated.moreThanSixMonthsWithMSF,
                moreThanTwelveMonthsInternOrVolunteer: associateToBeCreated.moreThanTwelveMonthsInternOrVolunteer,
                reciveMessageApp: associateToBeCreated.reciveMessageApp,
                reciveGeneralEmails: associateToBeCreated.reciveGeneralEmails,
                events: associateToBeCreated.events,
                initiatives: associateToBeCreated.initiatives,
                committee: associateToBeCreated.committee,
                board: associateToBeCreated.board,
                fiscalCouncil: associateToBeCreated.fiscalCouncil,
                otherInitiatives: associateToBeCreated.otherInitiatives,
                lastAssociateUpdate: associateToBeCreated.lastAssociateUpdate,
            });
            return createResult;
        });
    }
    update(associateIdToBeUpdated, associateToBeUpdated) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateResult = this.repository.update("associates", associateIdToBeUpdated, {
                fullName: associateToBeUpdated.fullName,
                socialName: associateToBeUpdated.socialName,
                cpf: associateToBeUpdated.cpf,
                idPassport: associateToBeUpdated.idPassport,
                email: associateToBeUpdated.email,
                emailSecondary: associateToBeUpdated.emailSecondary,
                phone: associateToBeUpdated.phone,
                contryOfResidence: associateToBeUpdated.contryOfResidence,
                stateOfResidence: associateToBeUpdated.stateOfResidence,
                cityOfResidence: associateToBeUpdated.cityOfResidence,
                nationality: associateToBeUpdated.nationality,
                stateOfBirth: associateToBeUpdated.stateOfBirth,
                cityOfBirth: associateToBeUpdated.cityOfBirth,
                profilePhoto: associateToBeUpdated.profilePhoto,
                profession: associateToBeUpdated.profession,
                dateOfAdmission: associateToBeUpdated.dateOfAdmission,
                employmentContractIsCurrentlyValid: associateToBeUpdated.employmentContractIsCurrentlyValid,
                dateLastMSFJob: associateToBeUpdated.dateLastMSFJob,
                isHealthcareField: associateToBeUpdated.isHealthcareField,
                hasMsfXpOutsideHomeContry: associateToBeUpdated.hasMsfXpOutsideHomeContry,
                hasMsfXPinBrazilOrAmerica: associateToBeUpdated.hasMsfXPinBrazilOrAmerica,
                lastPosition: associateToBeUpdated.lastPosition,
                contractType: associateToBeUpdated.contractType,
                personalHighlightOfXpWorkingWithMsf: associateToBeUpdated.personalHighlightOfXpWorkingWithMsf,
                dateOfBirth: associateToBeUpdated.dateOfBirth,
                languages: associateToBeUpdated.languages,
                otherLanguages: associateToBeUpdated.otherLanguages,
                gender: associateToBeUpdated.gender,
                lgbtqiapnplusMember: associateToBeUpdated.lgbtqiapnplusMember,
                race: associateToBeUpdated.race,
                otherRace: associateToBeUpdated.otherRace,
                ethnicity: associateToBeUpdated.ethnicity,
                underrepresentedGroup: associateToBeUpdated.underrepresentedGroup,
                communicationAccebilityResources: associateToBeUpdated.communicationAccebilityResources,
                otherCommunicationAccebilityResources: associateToBeUpdated.otherCommunicationAccebilityResources,
                physicalDisabilityOrReducedMobility: associateToBeUpdated.physicalDisabilityOrReducedMobility,
                physicalDisabilityOrReducedMobilityDescription: associateToBeUpdated.physicalDisabilityOrReducedMobilityDescription,
                memberShip: associateToBeUpdated.memberShip,
                personalCode: associateToBeUpdated.personalCode,
                isAwarePrivacyPolicy: associateToBeUpdated.isAwarePrivacyPolicy,
                grantConcentUseData: associateToBeUpdated.grantConcentUseData,
                dateOfConcentUseData: associateToBeUpdated.dateOfConcentUseData,
                moreThanSixMonthsWithMSF: associateToBeUpdated.moreThanSixMonthsWithMSF,
                moreThanTwelveMonthsInternOrVolunteer: associateToBeUpdated.moreThanTwelveMonthsInternOrVolunteer,
                reciveMessageApp: associateToBeUpdated.reciveMessageApp,
                reciveGeneralEmails: associateToBeUpdated.reciveGeneralEmails,
                events: associateToBeUpdated.events,
                initiatives: associateToBeUpdated.initiatives,
                committee: associateToBeUpdated.committee,
                board: associateToBeUpdated.board,
                fiscalCouncil: associateToBeUpdated.fiscalCouncil,
                otherInitiatives: associateToBeUpdated.otherInitiatives,
                lastAssociateUpdate: associateToBeUpdated.lastAssociateUpdate,
            });
            return updateResult;
        });
    }
    delete(associateIdToBeUpdated) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteResult = this.repository.delete("associates", associateIdToBeUpdated);
            return deleteResult;
        });
    }
    read(associateIdToBeRead) {
        return __awaiter(this, void 0, void 0, function* () {
            const readResult = this.repository.read("associates", associateIdToBeRead);
            return readResult;
        });
    }
    readWithQuery(parameterInputed, stringOperatorInputed, valueInputed) {
        return __awaiter(this, void 0, void 0, function* () {
            const readWithQueryResult = this.repository.readWithQuery("associates", parameterInputed, stringOperatorInputed, valueInputed);
            return readWithQueryResult;
        });
    }
    readAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const readAllResult = this.repository.readAll("associates");
            return readAllResult;
        });
    }
    updateProfilePhoto(associateName, profilePic) {
        return __awaiter(this, void 0, void 0, function* () {
            const profilePhotoName = associateName.concat(new Date().toLocaleDateString("pt-br").replace("/", "-").replace("/", "-"));
            const uploadFile = this.repository.uploadFile("profilePhotos", profilePhotoName, profilePic.originalname, profilePic);
            return uploadFile;
        });
    }
}
exports.AssociateDAO = AssociateDAO;
