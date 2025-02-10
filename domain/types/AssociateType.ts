export enum Contract {
  NoContract = "Sem contrato",
  BrazilOffice = "Escritório Brasil",
  BrazilProject = "Projeto Brasil",
  OutsideProject = "Projeto fora do Brasil, em atuação ou aguardando próxima saída",
  OutsideOffice = "Escritório fora do Brasil",
}

export enum AccessibilityResources {
  AudioDescription = "Audiodescrição",
  LibrasInterpretation = "Interpretação em Libras",
  WrittenDescriptionOfImages = "Descrição escrita de imagens",
  LipReading = "Leitura labial",
  Captioning = "Legeneda",
  NotApplicable = "Não necessito",
  Other = "Outra",
}

export enum Choices {
  Yes = "Sim",
  No = "Não",
  PreferNotAnswer = "Prefiro não responder",
}

export enum Race {
  White = "Branca",
  Black = "Preta",
  BrownMixed = "Parda",
  Yellow = "Amarela",
  Indigenous = "Indígena",
  PreferNotAnswer = "Prefiro não responder",
  Other = "Outra",
}

export enum Languages {
  Portuguese = "Português",
  English = "Inglês",
  Spanish = "Espanhol",
  French = "Francês",
  Arabic = "Árabe",
  Libras = "Libras",
  Other = "Outra",
}

export enum Gender {
  CisWoman = "Mulher cisgênero (se identifica com o gênero que lhe foi atribuído ao nascer)",
  TransWoman = "Mulher transgênero (não se identifica com o gênero que lhe foi atribuído ao nascer)",
  CisMan = "Homem cisgênero (se identifica com o gênero que lhe foi atribuído ao nascer)",
  TransMan = "Homem transgênero (não se identifica com o gênero que lhe foi atribuído ao nascer)",
  NonBinary = "Não binária",
  Travesti = "Travesti",
}

export enum MemberType {
  member = "Membro",
  potentialMember = "Membro em potencial",
  excluded = "Excluído",
}

export type MemberShip = {
  memberType: MemberType;
  infoDate: Date;
  lastRegistrationUpdate: Date;
  excludedInfo: string | null;
};

export enum IniciativesENUM {
  gtGovernanca = "GT Governança",
  gtSMAsso = "GT SM Asso",
  gtEquidade = "GT Equidade",
  facilitadores = "Facilitadores",
  outros = "Outros",
}

export type Iniciatives = {
  title: IniciativesENUM;
  otherDescription: string;
  startDate: Date;
  endDate: Date | null;
  isCurrentlyValid: boolean;
};

export enum CommitteeENUM {
  candidaturas = "Candidaturas",
  mocoes = "Moções",
  outros = "Outros",
}

export type Committee = {
  title: CommitteeENUM;
  otherDescription: string;
  startDate: Date;
  endDate: Date | null;
  isCurrentlyValid: boolean;
};

export enum BoardENUM {
  interested = "Interessado",
  notInterested = "Não interessado",
  candidate = "Candidato",
}

export type Board = {
  title: BoardENUM;
  startDate: Date;
  endDate: Date | null;
  isCurrentlyValid: boolean;
  extraInfo: string | null;
};

export enum FiscalCouncilENUM {
  interested = "Interessado",
  notInterested = "Não interessado",
  candidate = "Candidato",
}

export type FiscalCouncil = {
  title: FiscalCouncilENUM;
  startDate: Date;
  endDate: Date | null;
  isCurrentlyValid: boolean;
  extraInfo: string | null;
};

export type UpdateObject = {
  userId: string;
  date: Date;
};

export interface AssociateType {
  fullName: string;
  socialName: string | null;
  cpf: string;
  idPassport: string | null;
  email: string;
  emailSecondary: string | null;
  phone: string;
  contryOfResidence: string;
  stateOfResidence: string | null;
  cityOfResidence: string | null;
  nationality: string;
  stateOfBirth: string | null;
  cityOfBirth: string | null;
  profilePhoto: string;
  profession: string;
  dateOfAdmission: Date;
  employmentContractIsCurrentlyValid: boolean;
  dateLastMSFJob: Date;
  isHealthcareField: boolean;
  hasMsfXpOutsideHomeContry: boolean;
  hasMsfXPinBrazilOrAmerica: boolean;
  lastPosition: string;
  contractType: Contract;
  personalHighlightOfXpWorkingWithMsf: string;
  dateOfBirth: Date;
  languages: Languages[];
  otherLanguages: string | null;
  gender: Gender;
  lgbtqiapnplusMember: Choices;
  race: Race;
  otherRace: string | null;
  ethnicity: string | null;
  underrepresentedGroup: string | null;
  communicationAccebilityResources: AccessibilityResources[];
  otherCommunicationAccebilityResources: string | null;
  physicalDisabilityOrReducedMobility: Choices;
  physicalDisabilityOrReducedMobilityDescription: string | null;
  memberShip: MemberShip;
  personalCode: number;
  isAwarePrivacyPolicy: boolean;
  grantConcentUseData: boolean;
  dateOfConcentUseData: Date;
  moreThanSixMonthsWithMSF: boolean;
  moreThanTwelveMonthsInternOrVolunteer: boolean;
  reciveMessageApp: boolean;
  reciveGeneralEmails: boolean;
  events: string[];
  initiatives: Iniciatives[];
  committee: Committee[];
  board: Board[];
  fiscalCouncil: FiscalCouncil[];
  otherInitiatives: string;
  lastAssociateUpdate: UpdateObject[];
}
