import { Associate } from "../models/Associate";
import { AssociateType } from "../types/AssociateType";
import { ResponseType } from "../types/ResponseType";

interface AssociateRepository {
  create: (
    collection: string,
    associate: AssociateType
  ) => Promise<ResponseType>;
  update: (
    collection: string,
    associateId: string,
    associate: AssociateType
  ) => Promise<ResponseType>;
  delete: (collection: string, associateId: string) => Promise<ResponseType>;
  read: (collection: string, associate: string) => Promise<ResponseType>;
  readAll: (collection: string) => Promise<ResponseType>;
  readWithQuery: (
    collectionInputed: string,
    parameterInputed: string,
    stringOperatorInputed: string,
    valueInputed: string
  ) => Promise<ResponseType>;
  uploadFile: (
    referencePath: string,
    originalName: string,
    referenceName: string,
    file: Express.Multer.File
  ) => Promise<ResponseType>;
}

export class AssociateDAO {
  private repository: AssociateRepository;

  constructor(repository: AssociateRepository) {
    this.repository = repository;
  }

  public async create(associateToBeCreated: Associate): Promise<ResponseType> {
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
      employmentContractIsCurrentlyValid:
        associateToBeCreated.employmentContractIsCurrentlyValid,
      dateLastMSFJob: associateToBeCreated.dateLastMSFJob,
      isHealthcareField: associateToBeCreated.isHealthcareField,
      hasMsfXpOutsideHomeContry: associateToBeCreated.hasMsfXpOutsideHomeContry,
      hasMsfXPinBrazilOrAmerica: associateToBeCreated.hasMsfXPinBrazilOrAmerica,
      lastPosition: associateToBeCreated.lastPosition,
      contractType: associateToBeCreated.contractType,
      personalHighlightOfXpWorkingWithMsf:
        associateToBeCreated.personalHighlightOfXpWorkingWithMsf,
      dateOfBirth: associateToBeCreated.dateOfBirth,
      languages: associateToBeCreated.languages,
      otherLanguages: associateToBeCreated.otherLanguages,
      gender: associateToBeCreated.gender,
      lgbtqiapnplusMember: associateToBeCreated.lgbtqiapnplusMember,
      race: associateToBeCreated.race,
      otherRace: associateToBeCreated.otherRace,
      ethnicity: associateToBeCreated.ethnicity,
      underrepresentedGroup: associateToBeCreated.underrepresentedGroup,
      communicationAccebilityResources:
        associateToBeCreated.communicationAccebilityResources,
      otherCommunicationAccebilityResources:
        associateToBeCreated.otherCommunicationAccebilityResources,
      physicalDisabilityOrReducedMobility:
        associateToBeCreated.physicalDisabilityOrReducedMobility,
      physicalDisabilityOrReducedMobilityDescription:
        associateToBeCreated.physicalDisabilityOrReducedMobilityDescription,
      memberShip: associateToBeCreated.memberShip,
      personalCode: associateToBeCreated.personalCode,
      isAwarePrivacyPolicy: associateToBeCreated.isAwarePrivacyPolicy,
      grantConcentUseData: associateToBeCreated.grantConcentUseData,
      dateOfConcentUseData: associateToBeCreated.dateOfConcentUseData,
      moreThanSixMonthsWithMSF: associateToBeCreated.moreThanSixMonthsWithMSF,
      moreThanTwelveMonthsInternOrVolunteer:
        associateToBeCreated.moreThanTwelveMonthsInternOrVolunteer,
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
  }

  public async update(
    associateIdToBeUpdated: string,
    associateToBeUpdated: Associate
  ): Promise<ResponseType> {
    const updateResult = this.repository.update(
      "associates",
      associateIdToBeUpdated,
      {
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
        employmentContractIsCurrentlyValid:
          associateToBeUpdated.employmentContractIsCurrentlyValid,
        dateLastMSFJob: associateToBeUpdated.dateLastMSFJob,
        isHealthcareField: associateToBeUpdated.isHealthcareField,
        hasMsfXpOutsideHomeContry:
          associateToBeUpdated.hasMsfXpOutsideHomeContry,
        hasMsfXPinBrazilOrAmerica:
          associateToBeUpdated.hasMsfXPinBrazilOrAmerica,
        lastPosition: associateToBeUpdated.lastPosition,
        contractType: associateToBeUpdated.contractType,
        personalHighlightOfXpWorkingWithMsf:
          associateToBeUpdated.personalHighlightOfXpWorkingWithMsf,
        dateOfBirth: associateToBeUpdated.dateOfBirth,
        languages: associateToBeUpdated.languages,
        otherLanguages: associateToBeUpdated.otherLanguages,
        gender: associateToBeUpdated.gender,
        lgbtqiapnplusMember: associateToBeUpdated.lgbtqiapnplusMember,
        race: associateToBeUpdated.race,
        otherRace: associateToBeUpdated.otherRace,
        ethnicity: associateToBeUpdated.ethnicity,
        underrepresentedGroup: associateToBeUpdated.underrepresentedGroup,
        communicationAccebilityResources:
          associateToBeUpdated.communicationAccebilityResources,
        otherCommunicationAccebilityResources:
          associateToBeUpdated.otherCommunicationAccebilityResources,
        physicalDisabilityOrReducedMobility:
          associateToBeUpdated.physicalDisabilityOrReducedMobility,
        physicalDisabilityOrReducedMobilityDescription:
          associateToBeUpdated.physicalDisabilityOrReducedMobilityDescription,
        memberShip: associateToBeUpdated.memberShip,
        personalCode: associateToBeUpdated.personalCode,
        isAwarePrivacyPolicy: associateToBeUpdated.isAwarePrivacyPolicy,
        grantConcentUseData: associateToBeUpdated.grantConcentUseData,
        dateOfConcentUseData: associateToBeUpdated.dateOfConcentUseData,
        moreThanSixMonthsWithMSF: associateToBeUpdated.moreThanSixMonthsWithMSF,
        moreThanTwelveMonthsInternOrVolunteer:
          associateToBeUpdated.moreThanTwelveMonthsInternOrVolunteer,
        reciveMessageApp: associateToBeUpdated.reciveMessageApp,
        reciveGeneralEmails: associateToBeUpdated.reciveGeneralEmails,
        events: associateToBeUpdated.events,
        initiatives: associateToBeUpdated.initiatives,
        committee: associateToBeUpdated.committee,
        board: associateToBeUpdated.board,
        fiscalCouncil: associateToBeUpdated.fiscalCouncil,
        otherInitiatives: associateToBeUpdated.otherInitiatives,
        lastAssociateUpdate: associateToBeUpdated.lastAssociateUpdate,
      }
    );
    return updateResult;
  }

  public async delete(associateIdToBeUpdated: string): Promise<ResponseType> {
    const deleteResult = this.repository.delete(
      "associates",
      associateIdToBeUpdated
    );
    return deleteResult;
  }

  public async read(associateIdToBeRead: string): Promise<ResponseType> {
    const readResult = this.repository.read("associates", associateIdToBeRead);
    return readResult;
  }

  public async readWithQuery(
    parameterInputed: string,
    stringOperatorInputed: string,
    valueInputed: string
  ): Promise<ResponseType> {
    const readWithQueryResult = this.repository.readWithQuery(
      "associates",
      parameterInputed,
      stringOperatorInputed,
      valueInputed
    );
    return readWithQueryResult;
  }

  public async readAll(): Promise<ResponseType> {
    const readAllResult = this.repository.readAll("associates");
    return readAllResult;
  }

  public async updateProfilePhoto(
    associateName: string,
    profilePic: Express.Multer.File
  ): Promise<ResponseType> {
    const profilePhotoName = associateName.concat(
      new Date().toLocaleDateString("pt-br").replace("/", "-").replace("/", "-")
    );
    const uploadFile = this.repository.uploadFile(
      "profilePhotos",
      profilePhotoName,
      profilePic.originalname,
      profilePic
    );
    return uploadFile;
  }
}
