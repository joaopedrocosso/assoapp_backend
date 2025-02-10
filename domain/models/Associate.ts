import {
  Contract,
  Languages,
  Gender,
  Race,
  Choices,
  AccessibilityResources,
  MemberShip,
  Iniciatives,
  Committee,
  Board,
  FiscalCouncil,
  UpdateObject,
} from "../types/AssociateType";

export class Associate {
  private _fullName: string;
  private _socialName: string | null;
  private _cpf: string;
  private _idPassport: string | null;
  private _email: string;
  private _emailSecondary: string | null;
  private _phone: string;
  private _contryOfResidence: string;
  private _stateOfResidence: string | null;
  private _cityOfResidence: string | null;
  private _nationality: string;
  private _stateOfBirth: string | null;
  private _cityOfBirth: string | null;
  private _profilePhoto: string;
  private _profession: string;
  private _dateOfAdmission: Date;
  private _employmentContractIsCurrentlyValid: boolean;
  private _dateLastMSFJob: Date;
  private _isHealthcareField: boolean;
  private _hasMsfXpOutsideHomeContry: boolean;
  private _hasMsfXPinBrazilOrAmerica: boolean;
  private _lastPosition: string;
  private _contractType: Contract;
  private _personalHighlightOfXpWorkingWithMsf: string;
  private _dateOfBirth: Date;
  private _languages: Languages[];
  private _otherLanguages: string | null;
  private _gender: Gender;
  private _lgbtqiapnplusMember: Choices;
  private _race: Race;
  private _otherRace: string | null;
  private _ethnicity: string | null;
  private _underrepresentedGroup: string | null;
  private _communicationAccebilityResources: AccessibilityResources[];
  private _otherCommunicationAccebilityResources: string | null;
  private _physicalDisabilityOrReducedMobility: Choices;
  private _physicalDisabilityOrReducedMobilityDescription: string | null;
  private _memberShip: MemberShip;
  private _personalCode: number;
  private _isAwarePrivacyPolicy: boolean;
  private _grantConcentUseData: boolean;
  private _dateOfConcentUseData: Date;
  private _moreThanSixMonthsWithMSF: boolean;
  private _moreThanTwelveMonthsInternOrVolunteer: boolean;
  private _reciveMessageApp: boolean;
  private _reciveGeneralEmails: boolean;
  private _events: string[];
  private _initiatives: Iniciatives[];
  private _committee: Committee[];
  private _board: Board[];
  private _fiscalCouncil: FiscalCouncil[];
  private _otherInitiatives: string;
  private _lastAssociateUpdate: UpdateObject[];

  constructor(
    fullName: string,
    socialName: string | null,
    cpf: string,
    idPassport: string | null,
    email: string,
    emailSecondary: string | null,
    phone: string,
    contryOfResidence: string,
    stateOfResidence: string | null,
    cityOfResidence: string | null,
    nationality: string,
    stateOfBirth: string | null,
    cityOfBirth: string | null,
    profilePhoto: string,
    profession: string,
    dateOfAdmission: Date,
    employmentContractIsCurrentlyValid: boolean,
    dateLastMSFJob: Date,
    isHealthcareField: boolean,
    hasMsfXpOutsideHomeContry: boolean,
    hasMsfXPinBrazilOrAmerica: boolean,
    lastPosition: string,
    contractType: Contract,
    personalHighlightOfXpWorkingWithMsf: string,
    dateOfBirth: Date,
    languages: Languages[],
    otherLanguages: string | null,
    gender: Gender,
    lgbtqiapnplusMember: Choices,
    race: Race,
    otherRace: string | null,
    ethnicity: string | null,
    underrepresentedGroup: string | null,
    communicationAccebilityResources: AccessibilityResources[],
    otherCommunicationAccebilityResources: string | null,
    physicalDisabilityOrReducedMobility: Choices,
    physicalDisabilityOrReducedMobilityDescription: string | null,
    memberShip: MemberShip,
    personalCode: number,
    isAwarePrivacyPolicy: boolean,
    grantConcentUseData: boolean,
    dateOfConcentUseData: Date,
    moreThanSixMonthsWithMSF: boolean,
    moreThanTwelveMonthsInternOrVolunteer: boolean,
    reciveMessageApp: boolean,
    reciveGeneralEmails: boolean,
    events: string[],
    initiatives: Iniciatives[],
    committee: Committee[],
    board: Board[],
    fiscalCouncil: FiscalCouncil[],
    otherInitiatives: string,
    lastAssociateUpdate: UpdateObject[]
  ) {
    this._fullName = fullName;
    this._socialName = socialName;
    this._cpf = cpf;
    this._idPassport = idPassport;
    this._email = email;
    this._emailSecondary = emailSecondary;
    this._phone = phone;
    this._contryOfResidence = contryOfResidence;
    this._stateOfResidence = stateOfResidence;
    this._cityOfResidence = cityOfResidence;
    this._nationality = nationality;
    this._stateOfBirth = stateOfBirth;
    this._cityOfBirth = cityOfBirth;
    this._profilePhoto = profilePhoto;
    this._profession = profession;
    this._dateOfAdmission = dateOfAdmission;
    this._dateLastMSFJob = dateLastMSFJob;
    this._employmentContractIsCurrentlyValid =
      employmentContractIsCurrentlyValid;
    this._isHealthcareField = isHealthcareField;
    this._hasMsfXpOutsideHomeContry = hasMsfXpOutsideHomeContry;
    this._hasMsfXPinBrazilOrAmerica = hasMsfXPinBrazilOrAmerica;
    this._lastPosition = lastPosition;
    this._contractType = contractType;
    this._personalHighlightOfXpWorkingWithMsf =
      personalHighlightOfXpWorkingWithMsf;
    this._dateOfBirth = dateOfBirth;
    this._languages = languages;
    this._otherLanguages = otherLanguages;
    this._gender = gender;
    this._lgbtqiapnplusMember = lgbtqiapnplusMember;
    this._race = race;
    this._otherRace = otherRace;
    this._ethnicity = ethnicity;
    this._underrepresentedGroup = underrepresentedGroup;
    this._communicationAccebilityResources = communicationAccebilityResources;
    this._otherCommunicationAccebilityResources =
      otherCommunicationAccebilityResources;
    this._physicalDisabilityOrReducedMobility =
      physicalDisabilityOrReducedMobility;
    this._physicalDisabilityOrReducedMobilityDescription =
      physicalDisabilityOrReducedMobilityDescription;
    this._memberShip = memberShip;
    this._personalCode = personalCode;
    this._isAwarePrivacyPolicy = isAwarePrivacyPolicy;
    this._grantConcentUseData = grantConcentUseData;
    this._dateOfConcentUseData = dateOfConcentUseData;
    this._moreThanSixMonthsWithMSF = moreThanSixMonthsWithMSF;
    this._moreThanTwelveMonthsInternOrVolunteer =
      moreThanTwelveMonthsInternOrVolunteer;
    this._reciveMessageApp = reciveMessageApp;
    this._reciveGeneralEmails = reciveGeneralEmails;
    this._events = events;
    this._initiatives = initiatives;
    this._committee = committee;
    this._board = board;
    this._fiscalCouncil = fiscalCouncil;
    this._otherInitiatives = otherInitiatives;
    this._lastAssociateUpdate = lastAssociateUpdate;
  }

  get fullName(): string {
    return this._fullName;
  }

  set fullName(value: string) {
    this._fullName = value;
  }

  get socialName(): string | null {
    return this._socialName;
  }

  set socialName(value: string) {
    this._socialName = value;
  }

  get cpf(): string {
    return this._cpf;
  }

  set cpf(value: string) {
    this._cpf = value;
  }

  get idPassport(): string | null {
    return this._idPassport;
  }

  set idPassport(value: string) {
    this._idPassport = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get emailSecondary(): string | null {
    return this._emailSecondary;
  }

  set emailSecondary(value: string) {
    this._emailSecondary = value;
  }

  get phone(): string {
    return this._phone;
  }

  set phone(value: string) {
    this._phone = value;
  }

  get contryOfResidence(): string {
    return this._contryOfResidence;
  }

  set contryOfResidence(value: string) {
    this._contryOfResidence = value;
  }

  get stateOfResidence(): string | null {
    return this._stateOfResidence;
  }

  set stateOfResidence(value: string) {
    this._stateOfResidence = value;
  }

  get cityOfResidence(): string | null {
    return this._cityOfResidence;
  }

  set cityOfResidence(value: string) {
    this._cityOfResidence = value;
  }

  get nationality(): string {
    return this._nationality;
  }

  set nationality(value: string) {
    this._nationality = value;
  }

  get stateOfBirth(): string | null {
    return this._stateOfBirth;
  }

  set stateOfBirth(value: string) {
    this._stateOfBirth = value;
  }

  get cityOfBirth(): string | null {
    return this._cityOfBirth;
  }

  set cityOfBirth(value: string) {
    this._cityOfBirth = value;
  }

  get profilePhoto(): string {
    return this._profilePhoto;
  }

  set profilePhoto(value: string) {
    this._profilePhoto = value;
  }

  get profession(): string {
    return this._profession;
  }

  set profession(value: string) {
    this._profession = value;
  }

  get dateOfAdmission(): Date {
    return this._dateOfAdmission;
  }

  set dateOfAdmission(value: Date) {
    this._dateOfAdmission = value;
  }

  get dateLastMSFJob(): Date {
    return this._dateLastMSFJob;
  }

  set dateLastMSFJob(value: Date) {
    this._dateLastMSFJob = value;
  }

  get employmentContractIsCurrentlyValid(): boolean {
    return this._employmentContractIsCurrentlyValid;
  }

  set employmentContractIsCurrentlyValid(value: boolean) {
    this._employmentContractIsCurrentlyValid = value;
  }

  get isHealthcareField(): boolean {
    return this._isHealthcareField;
  }

  set isHealthcareField(value: boolean) {
    this._isHealthcareField = value;
  }

  get hasMsfXpOutsideHomeContry(): boolean {
    return this._hasMsfXpOutsideHomeContry;
  }

  set hasMsfXpOutsideHomeContry(value: boolean) {
    this._hasMsfXpOutsideHomeContry = value;
  }

  get hasMsfXPinBrazilOrAmerica(): boolean {
    return this._hasMsfXPinBrazilOrAmerica;
  }

  set hasMsfXPinBrazilOrAmerica(value: boolean) {
    this._hasMsfXPinBrazilOrAmerica = value;
  }

  get lastPosition(): string {
    return this._lastPosition;
  }

  set lastPosition(value: string) {
    this._lastPosition = value;
  }

  get contractType(): Contract {
    return this._contractType;
  }

  set contractType(value: Contract) {
    this._contractType = value;
  }

  get personalHighlightOfXpWorkingWithMsf(): string {
    return this._personalHighlightOfXpWorkingWithMsf;
  }

  set personalHighlightOfXpWorkingWithMsf(value: string) {
    this._personalHighlightOfXpWorkingWithMsf = value;
  }

  get dateOfBirth(): Date {
    return this._dateOfBirth;
  }

  set dateOfBirth(value: Date) {
    this._dateOfBirth = value;
  }

  get languages(): Languages[] {
    return this._languages;
  }

  set languages(value: Languages[]) {
    this._languages = value;
  }

  get otherLanguages(): string | null {
    return this._otherLanguages;
  }

  set otherLanguages(value: string) {
    this._otherLanguages = value;
  }

  get gender(): Gender {
    return this._gender;
  }

  set gender(value: Gender) {
    this._gender = value;
  }

  get lgbtqiapnplusMember(): Choices {
    return this._lgbtqiapnplusMember;
  }

  set lgbtqiapnplusMember(value: Choices) {
    this._lgbtqiapnplusMember = value;
  }

  get race(): Race {
    return this._race;
  }

  set race(value: Race) {
    this._race = value;
  }

  get otherRace(): string | null {
    return this._otherRace;
  }

  set otherRace(value: string) {
    this._otherRace = value;
  }

  get ethnicity(): string | null {
    return this._ethnicity;
  }

  set ethnicity(value: string) {
    this._ethnicity = value;
  }

  get underrepresentedGroup(): string | null {
    return this._underrepresentedGroup;
  }

  set underrepresentedGroup(value: string) {
    this._underrepresentedGroup = value;
  }

  get communicationAccebilityResources(): AccessibilityResources[] {
    return this._communicationAccebilityResources;
  }

  set communicationAccebilityResources(value: AccessibilityResources[]) {
    this._communicationAccebilityResources = value;
  }

  get otherCommunicationAccebilityResources(): string | null {
    return this._otherCommunicationAccebilityResources;
  }

  set otherCommunicationAccebilityResources(value: string) {
    this._otherCommunicationAccebilityResources = value;
  }

  get physicalDisabilityOrReducedMobility(): Choices {
    return this._physicalDisabilityOrReducedMobility;
  }

  set physicalDisabilityOrReducedMobility(value: Choices) {
    this._physicalDisabilityOrReducedMobility = value;
  }

  get physicalDisabilityOrReducedMobilityDescription(): string | null {
    return this._physicalDisabilityOrReducedMobilityDescription;
  }

  set physicalDisabilityOrReducedMobilityDescription(value: string) {
    this._physicalDisabilityOrReducedMobilityDescription = value;
  }

  get memberShip(): MemberShip {
    return this._memberShip;
  }

  set memberShip(value: MemberShip) {
    this._memberShip = value;
  }

  get personalCode(): number {
    return this._personalCode;
  }

  set personalCode(value: number) {
    this._personalCode = value;
  }

  get isAwarePrivacyPolicy(): boolean {
    return this._isAwarePrivacyPolicy;
  }

  set isAwarePrivacyPolicy(value: boolean) {
    this._isAwarePrivacyPolicy = value;
  }

  get grantConcentUseData(): boolean {
    return this._grantConcentUseData;
  }

  set grantConcentUseData(value: boolean) {
    this._grantConcentUseData = value;
  }

  get dateOfConcentUseData(): Date {
    return this._dateOfConcentUseData;
  }

  set dateOfConcentUseData(value: Date) {
    this._dateOfConcentUseData = value;
  }

  get moreThanSixMonthsWithMSF(): boolean {
    return this._moreThanSixMonthsWithMSF;
  }

  set moreThanSixMonthsWithMSF(value: boolean) {
    this._moreThanSixMonthsWithMSF = value;
  }

  get moreThanTwelveMonthsInternOrVolunteer(): boolean {
    return this._moreThanTwelveMonthsInternOrVolunteer;
  }

  set moreThanTwelveMonthsInternOrVolunteer(value: boolean) {
    this._moreThanTwelveMonthsInternOrVolunteer = value;
  }

  get reciveMessageApp(): boolean {
    return this._reciveMessageApp;
  }

  set reciveMessageApp(value: boolean) {
    this._reciveMessageApp = value;
  }

  get reciveGeneralEmails(): boolean {
    return this._reciveGeneralEmails;
  }

  set reciveGeneralEmails(value: boolean) {
    this._reciveGeneralEmails = value;
  }

  get events(): string[] {
    return this._events;
  }

  set events(value: string[]) {
    this._events = value;
  }

  get initiatives(): Iniciatives[] {
    return this._initiatives;
  }

  set initiatives(value: Iniciatives[]) {
    this._initiatives = value;
  }

  get committee(): Committee[] {
    return this._committee;
  }

  set committee(value: Committee[]) {
    this._committee = value;
  }

  get board(): Board[] {
    return this._board;
  }

  set board(value: Board[]) {
    this._board = value;
  }

  get fiscalCouncil(): FiscalCouncil[] {
    return this._fiscalCouncil;
  }

  set fiscalCouncil(value: FiscalCouncil[]) {
    this._fiscalCouncil = value;
  }

  get otherInitiatives(): string {
    return this._otherInitiatives;
  }

  set otherInitiatives(value: string) {
    this._otherInitiatives = value;
  }

  get lastAssociateUpdate(): UpdateObject[] {
    return this._lastAssociateUpdate;
  }

  set lastAssociateUpdate(value: UpdateObject[]) {
    this._lastAssociateUpdate = value;
  }
}
