import express, { Request, Response } from "express";
import { body, validationResult, param } from "express-validator";
import multer from "multer";

import { AssociateDAO } from "../domain/daos/AssociateDAO";
import { AssociateType } from "../domain/types/AssociateType";
import { Associate } from "../domain/models/Associate";
import { database } from "../infraestructure/database/firebase";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Middleware of field validation
const fieldValidate = [
  body("fullName").isString().notEmpty(),
  body("socialName").isString(),
  body("cpf").isString().notEmpty(),
  body("idPassport").isString(),
  body("email").isString().notEmpty(),
  body("emailSecondary").isString(),
  body("phone").isString().notEmpty(),
  body("contryOfResidence").isString().notEmpty(),
  body("stateOfResidence").isString(),
  body("cityOfResidence").isString(),
  body("nationality").isString().notEmpty(),
  body("stateOfBirth").isString(),
  body("cityOfBirth").isString(),
  body("profilePhoto").isString().notEmpty(),
  body("profession").isString().notEmpty(),
  body("dateOfAdmission").isISO8601().toDate(),
  body("employmentContractIsCurrentlyValid").isBoolean().notEmpty(),
  body("personalCode").isNumeric().notEmpty(),
  body("isAwarePrivacyPolicy").isBoolean().notEmpty(),
  body("grantConcentUseData").isBoolean().notEmpty(),
  body("dateOfConcentUseData").isISO8601().toDate(),
  body("dateLastMSFJob").isISO8601().toDate(),
  body("isHealthcareField").isBoolean().notEmpty(),
  body("hasMsfXpOutsideHomeContry").isBoolean().notEmpty(),
  body("hasMsfXPinBrazilOrAmerica").isBoolean().notEmpty(),
  body("lastPosition").isString().notEmpty(),
  body("contractType").isString().notEmpty(),
  body("personalHighlightOfXpWorkingWithMsf").isString().notEmpty(),
  body("dateOfBirth").isISO8601().toDate(),
  body("languages").isArray(),
  body("otherLanguages").isString(),
  body("gender").isString().notEmpty(),
  body("lgbtqiapnplusMember").isString().notEmpty(),
  body("race").isString().notEmpty(),
  body("otherRace").isString(),
  body("ethnicity").isString(),
  body("underrepresentedGroup").isString(),
  body("communicationAccebilityResources").isArray(),
  body("otherCommunicationAccebilityResources").isString(),
  body("physicalDisabilityOrReducedMobility").isString(),
  body("physicalDisabilityOrReducedMobilityDescription").isString(),
  body("physicalDisabilityOrReducedMobilityDescription").isString(),
  body("memberShip.memberType").isString().notEmpty(),
  body("memberShip.infoDate").isISO8601().toDate(),
  body("memberShip.lastRegistrationUpdate").isISO8601().toDate(),
  body("memberShip.excludedInfo").isString(),
  body("moreThanSixMonthsWithMSF").isBoolean().notEmpty(),
  body("moreThanTwelveMonthsInternOrVolunteer").isBoolean().notEmpty(),
  body("reciveMessageApp").isBoolean().notEmpty(),
  body("reciveGeneralEmails").isBoolean().notEmpty(),
  body("events").isArray(),
  body("initiatives").isArray(),
  body("committee").isArray(),
  body("board").isArray(),
  body("fiscalCouncil").isArray(),
  body("otherInitiatives").isString(),
];

const associateDao = new AssociateDAO(database);

router.post("/create", fieldValidate, async (req: Request, res: Response) => {
  // states if a error occours in validation
  const validateError = validationResult(req);
  if (!validateError.isEmpty()) {
    return res.status(400).json({ validateError: validateError.array() });
  }

  const associateParams: AssociateType = req.body;
  const associateToBeCreated = new Associate(
    associateParams.fullName,
    associateParams.socialName,
    associateParams.cpf,
    associateParams.idPassport,
    associateParams.email,
    associateParams.emailSecondary,
    associateParams.phone,
    associateParams.contryOfResidence,
    associateParams.stateOfResidence,
    associateParams.cityOfResidence,
    associateParams.nationality,
    associateParams.stateOfBirth,
    associateParams.cityOfBirth,
    associateParams.profilePhoto,
    associateParams.profession,
    new Date(associateParams.dateOfAdmission),
    associateParams.employmentContractIsCurrentlyValid,
    new Date(associateParams.dateLastMSFJob),
    associateParams.isHealthcareField,
    associateParams.hasMsfXpOutsideHomeContry,
    associateParams.hasMsfXPinBrazilOrAmerica,
    associateParams.lastPosition,
    associateParams.contractType,
    associateParams.personalHighlightOfXpWorkingWithMsf,
    new Date(associateParams.dateOfBirth),
    associateParams.languages,
    associateParams.otherLanguages,
    associateParams.gender,
    associateParams.lgbtqiapnplusMember,
    associateParams.race,
    associateParams.otherRace,
    associateParams.ethnicity,
    associateParams.underrepresentedGroup,
    associateParams.communicationAccebilityResources,
    associateParams.otherCommunicationAccebilityResources,
    associateParams.physicalDisabilityOrReducedMobility,
    associateParams.physicalDisabilityOrReducedMobilityDescription,
    {
      memberType: associateParams.memberShip.memberType,
      infoDate: new Date(associateParams.memberShip.infoDate),
      lastRegistrationUpdate: new Date(
        associateParams.memberShip.lastRegistrationUpdate
      ),
      excludedInfo: associateParams.memberShip.excludedInfo,
    },
    associateParams.personalCode,
    associateParams.isAwarePrivacyPolicy,
    associateParams.grantConcentUseData,
    associateParams.dateOfConcentUseData,
    associateParams.moreThanSixMonthsWithMSF,
    associateParams.moreThanTwelveMonthsInternOrVolunteer,
    associateParams.reciveMessageApp,
    associateParams.reciveGeneralEmails,
    associateParams.events,
    associateParams.initiatives.map((iniciative) => {
      let newEndDate = iniciative.endDate ? new Date(iniciative.endDate) : null;
      return {
        title: iniciative.title,
        otherDescription: iniciative.otherDescription,
        startDate: new Date(iniciative.startDate),
        endDate: newEndDate,
        isCurrentlyValid: iniciative.isCurrentlyValid,
      };
    }),
    associateParams.committee.map((committeeItem) => {
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
    }),
    associateParams.board.map((boardItem) => {
      let newEndDate = boardItem.endDate ? new Date(boardItem.endDate) : null;
      return {
        title: boardItem.title,
        startDate: new Date(boardItem.startDate),
        endDate: newEndDate,
        extraInfo: boardItem.extraInfo,
        isCurrentlyValid: boardItem.isCurrentlyValid,
      };
    }),
    associateParams.fiscalCouncil.map((fiscalCouncilItem) => {
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
    }),
    associateParams.otherInitiatives,
    associateParams.lastAssociateUpdate.map((associateUpdate) => {
      let newUpdateDate = new Date(associateUpdate.date);
      return {
        userId: associateUpdate.userId,
        date: newUpdateDate,
      };
    })
  );
  const result = await associateDao.create(associateToBeCreated);
  console.log(result);
  res.status(result.status).send(result.response);
});

router.put(
  "/update/:associateId",
  fieldValidate,
  async (req: Request, res: Response) => {
    const associateId: string = req.params.associateId;
    // states if a error occours in validation
    const validateError = validationResult(req);
    if (!validateError.isEmpty()) {
      return res.status(400).json({ validateError: validateError.array() });
    }

    const associateParams: AssociateType = req.body;

    associateParams.lastAssociateUpdate[0] = {
      userId: associateParams.lastAssociateUpdate[0].userId,
      date: new Date(associateParams.lastAssociateUpdate[0].date),
    };

    const associateToBeUpdated = new Associate(
      associateParams.fullName,
      associateParams.socialName,
      associateParams.cpf,
      associateParams.idPassport,
      associateParams.email,
      associateParams.emailSecondary,
      associateParams.phone,
      associateParams.contryOfResidence,
      associateParams.stateOfResidence,
      associateParams.cityOfResidence,
      associateParams.nationality,
      associateParams.stateOfBirth,
      associateParams.cityOfBirth,
      associateParams.profilePhoto,
      associateParams.profession,
      new Date(associateParams.dateOfAdmission),
      associateParams.employmentContractIsCurrentlyValid,
      new Date(associateParams.dateLastMSFJob),
      associateParams.isHealthcareField,
      associateParams.hasMsfXpOutsideHomeContry,
      associateParams.hasMsfXPinBrazilOrAmerica,
      associateParams.lastPosition,
      associateParams.contractType,
      associateParams.personalHighlightOfXpWorkingWithMsf,
      new Date(associateParams.dateOfBirth),
      associateParams.languages,
      associateParams.otherLanguages,
      associateParams.gender,
      associateParams.lgbtqiapnplusMember,
      associateParams.race,
      associateParams.otherRace,
      associateParams.ethnicity,
      associateParams.underrepresentedGroup,
      associateParams.communicationAccebilityResources,
      associateParams.otherCommunicationAccebilityResources,
      associateParams.physicalDisabilityOrReducedMobility,
      associateParams.physicalDisabilityOrReducedMobilityDescription,
      {
        memberType: associateParams.memberShip.memberType,
        infoDate: new Date(associateParams.memberShip.infoDate),
        lastRegistrationUpdate: new Date(
          associateParams.memberShip.lastRegistrationUpdate
        ),
        excludedInfo: associateParams.memberShip.excludedInfo,
      },
      associateParams.personalCode,
      associateParams.isAwarePrivacyPolicy,
      associateParams.grantConcentUseData,
      associateParams.dateOfConcentUseData,
      associateParams.moreThanSixMonthsWithMSF,
      associateParams.moreThanTwelveMonthsInternOrVolunteer,
      associateParams.reciveMessageApp,
      associateParams.reciveGeneralEmails,
      associateParams.events,
      associateParams.initiatives.map((iniciative) => {
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
      }),
      associateParams.committee.map((committeeItem) => {
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
      }),
      associateParams.board.map((boardItem) => {
        let newEndDate = boardItem.endDate ? new Date(boardItem.endDate) : null;
        return {
          title: boardItem.title,
          startDate: new Date(boardItem.startDate),
          endDate: newEndDate,
          extraInfo: boardItem.extraInfo,
          isCurrentlyValid: boardItem.isCurrentlyValid,
        };
      }),
      associateParams.fiscalCouncil.map((fiscalCouncilItem) => {
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
      }),
      associateParams.otherInitiatives,
      associateParams.lastAssociateUpdate
    );
    const result = await associateDao.update(associateId, associateToBeUpdated);
    console.log(result);
    res.status(result.status).send(result.response);
  }
);

router.delete(
  "/delete/:associateId",
  [param("associateId").exists()],
  async (req: Request, res: Response) => {
    const associateId: string = req.params.associateId;
    const result = await associateDao.delete(associateId);
    console.log(result);
    res.status(result.status).send(result.response);
  }
);

router.get("/read/:associateId", async (req: Request, res: Response) => {
  const associateId: string = req.params.associateId;
  const result = await associateDao.read(associateId);
  console.log(result);
  res.status(result.status).send(result.response);
});

router.get(
  "/readWithQuery/:parameterInputed/:stringOperatorInputed/:valueInputed",
  async (req: Request, res: Response) => {
    const associateParameterInputed: string = req.params.parameterInputed;
    const associateStringOperatorInputed: string =
      req.params.stringOperatorInputed;
    const associateValueInputed: string = req.params.valueInputed;
    const result = await associateDao.readWithQuery(
      associateParameterInputed,
      associateStringOperatorInputed,
      associateValueInputed
    );
    console.log(result);
    res.status(result.status).send(result.response);
  }
);

router.get("/readall", async (req: Request, res: Response) => {
  const result = await associateDao.readAll();
  console.log(result);
  res.status(result.status).send(result.response);
});

router.post("/profilepic/upload", async (req: Request, res: Response) => {
  console.log("file:\n", req.file);
  if (req.file) {
    let profilePic = req.file;
    const result = await associateDao.updateProfilePhoto("teste", profilePic);
    res.status(result.status).send(result.response);
  } else {
    res.status(500).send("Something gone wrong... Is there a file?");
  }
});

router.all("*", (req, res, next) => {
  res.status(500).send("Something gone wrong...");
});

export default router;
