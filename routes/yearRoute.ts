import express, { Request, Response } from "express";
import { body, validationResult, param } from "express-validator";

import { database } from "../infraestructure/database/firebase";
import { EntriesType, YearType } from "../domain/types/YearType";
import { Year } from "../domain/models/Year";
import { YearDAO } from "../domain/daos/YearDAO";
import {
  FirebaseResponseType,
  ResponseType,
} from "../domain/types/ResponseType";
import { AssociateType, UpdateObject } from "../domain/types/AssociateType";
import { AssociateDAO } from "../domain/daos/AssociateDAO";
import { Associate } from "../domain/models/Associate";

const router = express.Router();

// Middleware of field validation
const fieldValidate = [
  body("year").isNumeric().notEmpty(),
  body("entries").isArray(),
];

const yearDao = new YearDAO(database);

const associateDao = new AssociateDAO(database);

router.post("/create", fieldValidate, async (req: Request, res: Response) => {
  // states if a error occours in validation
  const validateError = validationResult(req);
  if (!validateError.isEmpty()) {
    return res.status(400).json({ validateError: validateError.array() });
  }

  let yearEntriesToBeCreated: EntriesType[] = [];

  const yearParams: YearType = req.body;
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
  const yearToBeCreated = new Year(yearParams.year, yearEntriesToBeCreated);
  const result = await yearDao.create(yearToBeCreated);
  console.log(result);
  res.status(result.status).send(result.response);
});

router.put(
  "/update/:yearId/associate/:associateId",
  fieldValidate,
  async (req: Request, res: Response) => {
    const associateId: string = req.params.associateId;

    const associateToBeUpdatedInYear: ResponseType = await associateDao.read(
      associateId
    );

    const update: UpdateObject = {
      userId: req.body.update.userId,
      date: new Date(req.body.update.date),
    };

    let associateToBeUpdated: AssociateType = {
      ...associateToBeUpdatedInYear.response[0].data,
      lastAssociateUpdate: [
        update,
        ...associateToBeUpdatedInYear.response[0].data.lastAssociateUpdate,
      ],
    };

    let associateUpdated: Associate = new Associate(
      associateToBeUpdated.fullName,
      associateToBeUpdated.socialName,
      associateToBeUpdated.cpf,
      associateToBeUpdated.idPassport,
      associateToBeUpdated.email,
      associateToBeUpdated.emailSecondary,
      associateToBeUpdated.phone,
      associateToBeUpdated.contryOfResidence,
      associateToBeUpdated.stateOfResidence,
      associateToBeUpdated.cityOfResidence,
      associateToBeUpdated.nationality,
      associateToBeUpdated.stateOfBirth,
      associateToBeUpdated.cityOfBirth,
      associateToBeUpdated.profilePhoto,
      associateToBeUpdated.profession,
      associateToBeUpdated.dateOfAdmission,
      associateToBeUpdated.employmentContractIsCurrentlyValid,
      associateToBeUpdated.dateLastMSFJob,
      associateToBeUpdated.isHealthcareField,
      associateToBeUpdated.hasMsfXpOutsideHomeContry,
      associateToBeUpdated.hasMsfXPinBrazilOrAmerica,
      associateToBeUpdated.lastPosition,
      associateToBeUpdated.contractType,
      associateToBeUpdated.personalHighlightOfXpWorkingWithMsf,
      associateToBeUpdated.dateOfBirth,
      associateToBeUpdated.languages,
      associateToBeUpdated.otherLanguages,
      associateToBeUpdated.gender,
      associateToBeUpdated.lgbtqiapnplusMember,
      associateToBeUpdated.race,
      associateToBeUpdated.otherRace,
      associateToBeUpdated.ethnicity,
      associateToBeUpdated.underrepresentedGroup,
      associateToBeUpdated.communicationAccebilityResources,
      associateToBeUpdated.otherCommunicationAccebilityResources,
      associateToBeUpdated.physicalDisabilityOrReducedMobility,
      associateToBeUpdated.physicalDisabilityOrReducedMobilityDescription,
      associateToBeUpdated.memberShip,
      associateToBeUpdated.personalCode,
      associateToBeUpdated.isAwarePrivacyPolicy,
      associateToBeUpdated.grantConcentUseData,
      associateToBeUpdated.dateOfConcentUseData,
      associateToBeUpdated.moreThanSixMonthsWithMSF,
      associateToBeUpdated.moreThanTwelveMonthsInternOrVolunteer,
      associateToBeUpdated.reciveMessageApp,
      associateToBeUpdated.reciveGeneralEmails,
      associateToBeUpdated.events,
      associateToBeUpdated.initiatives,
      associateToBeUpdated.committee,
      associateToBeUpdated.board,
      associateToBeUpdated.fiscalCouncil,
      associateToBeUpdated.otherInitiatives,
      associateToBeUpdated.lastAssociateUpdate
    );
    const associateUpdateResult = await associateDao.update(
      associateToBeUpdatedInYear.response[0].id,
      associateUpdated
    );

    const yearId: string = req.params.yearId;
    // states if a error occours in validation
    const validateError = validationResult(req);
    if (!validateError.isEmpty()) {
      return res.status(400).json({ validateError: validateError.array() });
    }

    let yearEntriesToBeUpdated: EntriesType[] = [];

    const yearParams: YearType = req.body;
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
    const yearToBeUpdated = new Year(yearParams.year, yearEntriesToBeUpdated);
    const result = await yearDao.update(yearId, yearToBeUpdated);
    result.response.push(associateUpdateResult);

    res.status(result.status).send(result.response);
  }
);

router.put(
  "/update/:yearId",
  fieldValidate,
  async (req: Request, res: Response) => {
    const yearId: string = req.params.yearId;
    // states if a error occours in validation
    const validateError = validationResult(req);
    if (!validateError.isEmpty()) {
      return res.status(400).json({ validateError: validateError.array() });
    }

    let yearEntriesToBeUpdated: EntriesType[] = [];

    const yearParams: YearType = req.body;
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
    const yearToBeUpdated = new Year(yearParams.year, yearEntriesToBeUpdated);
    const result = await yearDao.update(yearId, yearToBeUpdated);
    console.log(result);
    res.status(result.status).send(result.response);
  }
);

router.delete(
  "/delete/:yearId",
  [param("yearId").exists()],
  async (req: Request, res: Response) => {
    const yearId: string = req.params.yearId;
    const result = await yearDao.delete(yearId);
    console.log(result);
    res.status(result.status).send(result.response);
  }
);

router.get("/read/:yearId", async (req: Request, res: Response) => {
  const yearId: string = req.params.yearId;
  const result = await yearDao.read(yearId);
  console.log(result);
  res.status(result.status).send(result.response);
});

router.get("/readall", async (req: Request, res: Response) => {
  const result = await yearDao.readAll();
  console.log(result);
  res.status(result.status).send(result.response);
});

router.get("/readUser/:userId", async (req: Request, res: Response) => {
  const userId: string = req.params.userId;
  let resultResponse: any = [];

  let isUserFound: boolean = false;
  const resultUserInYears = await yearDao.readUserInYears(userId);

  const resultUserInYearsValues = Object.values(resultUserInYears.response);
  resultUserInYearsValues.map((yearResponse: FirebaseResponseType) => {
    const year = yearResponse.data.year;
    yearResponse.data.entries.map((entrie: EntriesType) => {
      if (userId == entrie.id) {
        resultResponse.push({ year: year, entries: entrie });
        isUserFound = true;
      }
    });
  });

  let resultStatus: number = 500;

  isUserFound ? (resultStatus = 200) : (resultStatus = 404);

  const result: ResponseType = {
    status: resultStatus,
    response: resultResponse,
  };

  res.status(result.status).send(result.response);
});

router.all("*", (req, res, next) => {
  res.status(500).send("Something gone wrong...");
});

export default router;
