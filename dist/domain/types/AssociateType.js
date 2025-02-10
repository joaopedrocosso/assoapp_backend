"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiscalCouncilENUM = exports.BoardENUM = exports.CommitteeENUM = exports.IniciativesENUM = exports.MemberType = exports.Gender = exports.Languages = exports.Race = exports.Choices = exports.AccessibilityResources = exports.Contract = void 0;
var Contract;
(function (Contract) {
    Contract["NoContract"] = "Sem contrato";
    Contract["BrazilOffice"] = "Escrit\u00F3rio Brasil";
    Contract["BrazilProject"] = "Projeto Brasil";
    Contract["OutsideProject"] = "Projeto fora do Brasil, em atua\u00E7\u00E3o ou aguardando pr\u00F3xima sa\u00EDda";
    Contract["OutsideOffice"] = "Escrit\u00F3rio fora do Brasil";
})(Contract || (exports.Contract = Contract = {}));
var AccessibilityResources;
(function (AccessibilityResources) {
    AccessibilityResources["AudioDescription"] = "Audiodescri\u00E7\u00E3o";
    AccessibilityResources["LibrasInterpretation"] = "Interpreta\u00E7\u00E3o em Libras";
    AccessibilityResources["WrittenDescriptionOfImages"] = "Descri\u00E7\u00E3o escrita de imagens";
    AccessibilityResources["LipReading"] = "Leitura labial";
    AccessibilityResources["Captioning"] = "Legeneda";
    AccessibilityResources["NotApplicable"] = "N\u00E3o necessito";
    AccessibilityResources["Other"] = "Outra";
})(AccessibilityResources || (exports.AccessibilityResources = AccessibilityResources = {}));
var Choices;
(function (Choices) {
    Choices["Yes"] = "Sim";
    Choices["No"] = "N\u00E3o";
    Choices["PreferNotAnswer"] = "Prefiro n\u00E3o responder";
})(Choices || (exports.Choices = Choices = {}));
var Race;
(function (Race) {
    Race["White"] = "Branca";
    Race["Black"] = "Preta";
    Race["BrownMixed"] = "Parda";
    Race["Yellow"] = "Amarela";
    Race["Indigenous"] = "Ind\u00EDgena";
    Race["PreferNotAnswer"] = "Prefiro n\u00E3o responder";
    Race["Other"] = "Outra";
})(Race || (exports.Race = Race = {}));
var Languages;
(function (Languages) {
    Languages["Portuguese"] = "Portugu\u00EAs";
    Languages["English"] = "Ingl\u00EAs";
    Languages["Spanish"] = "Espanhol";
    Languages["French"] = "Franc\u00EAs";
    Languages["Arabic"] = "\u00C1rabe";
    Languages["Libras"] = "Libras";
    Languages["Other"] = "Outra";
})(Languages || (exports.Languages = Languages = {}));
var Gender;
(function (Gender) {
    Gender["CisWoman"] = "Mulher cisg\u00EAnero (se identifica com o g\u00EAnero que lhe foi atribu\u00EDdo ao nascer)";
    Gender["TransWoman"] = "Mulher transg\u00EAnero (n\u00E3o se identifica com o g\u00EAnero que lhe foi atribu\u00EDdo ao nascer)";
    Gender["CisMan"] = "Homem cisg\u00EAnero (se identifica com o g\u00EAnero que lhe foi atribu\u00EDdo ao nascer)";
    Gender["TransMan"] = "Homem transg\u00EAnero (n\u00E3o se identifica com o g\u00EAnero que lhe foi atribu\u00EDdo ao nascer)";
    Gender["NonBinary"] = "N\u00E3o bin\u00E1ria";
    Gender["Travesti"] = "Travesti";
})(Gender || (exports.Gender = Gender = {}));
var MemberType;
(function (MemberType) {
    MemberType["member"] = "Membro";
    MemberType["potentialMember"] = "Membro em potencial";
    MemberType["excluded"] = "Exclu\u00EDdo";
})(MemberType || (exports.MemberType = MemberType = {}));
var IniciativesENUM;
(function (IniciativesENUM) {
    IniciativesENUM["gtGovernanca"] = "GT Governan\u00E7a";
    IniciativesENUM["gtSMAsso"] = "GT SM Asso";
    IniciativesENUM["gtEquidade"] = "GT Equidade";
    IniciativesENUM["facilitadores"] = "Facilitadores";
    IniciativesENUM["outros"] = "Outros";
})(IniciativesENUM || (exports.IniciativesENUM = IniciativesENUM = {}));
var CommitteeENUM;
(function (CommitteeENUM) {
    CommitteeENUM["candidaturas"] = "Candidaturas";
    CommitteeENUM["mocoes"] = "Mo\u00E7\u00F5es";
    CommitteeENUM["outros"] = "Outros";
})(CommitteeENUM || (exports.CommitteeENUM = CommitteeENUM = {}));
var BoardENUM;
(function (BoardENUM) {
    BoardENUM["interested"] = "Interessado";
    BoardENUM["notInterested"] = "N\u00E3o interessado";
    BoardENUM["candidate"] = "Candidato";
})(BoardENUM || (exports.BoardENUM = BoardENUM = {}));
var FiscalCouncilENUM;
(function (FiscalCouncilENUM) {
    FiscalCouncilENUM["interested"] = "Interessado";
    FiscalCouncilENUM["notInterested"] = "N\u00E3o interessado";
    FiscalCouncilENUM["candidate"] = "Candidato";
})(FiscalCouncilENUM || (exports.FiscalCouncilENUM = FiscalCouncilENUM = {}));
