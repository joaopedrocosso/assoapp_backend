import express, { Request, Response } from "express";
import { body, validationResult, param } from "express-validator";

import { database } from "../infraestructure/database/firebase";
import { EventType } from "../domain/types/EventType";
import { Event } from "../domain/models/Event";
import { EventDAO } from "../domain/daos/EventDAO";
import { AssociateDAO } from "../domain/daos/AssociateDAO";
import { AssociateType, UpdateObject } from "../domain/types/AssociateType";
import { ResponseType } from "../domain/types/ResponseType";
import { Associate } from "../domain/models/Associate";

const router = express.Router();

// Middleware of field validation
const fieldValidate = [
  body("title").isString().notEmpty(),
  body("titleDescription").isString(),
  body("date").isISO8601().toDate(),
];

const eventDao = new EventDAO(database);
const associateDao = new AssociateDAO(database);

router.post("/create", fieldValidate, async (req: Request, res: Response) => {
  // states if a error occours in validation
  const validateError = validationResult(req);
  if (!validateError.isEmpty()) {
    return res.status(400).json({ validateError: validateError.array() });
  }

  const eventParams: EventType = req.body;
  const eventToBeCreated = new Event(
    eventParams.title,
    eventParams.titleDescription,
    eventParams.date
  );
  const result = await eventDao.create(eventToBeCreated);
  console.log(result);
  res.status(result.status).send(result.response);
});

router.put(
  "/update/:eventId",
  fieldValidate,
  async (req: Request, res: Response) => {
    const eventId: string = req.params.eventId;
    // states if a error occours in validation
    const validateError = validationResult(req);
    if (!validateError.isEmpty()) {
      return res.status(400).json({ validateError: validateError.array() });
    }

    const eventParams: EventType = req.body;

    const eventToBeUpdated = new Event(
      eventParams.title,
      eventParams.titleDescription,
      new Date(eventParams.date)
    );
    const result = await eventDao.update(eventId, eventToBeUpdated);
    console.log(result);
    res.status(result.status).send(result.response);
  }
);

router.put(
  "/update/participants/:eventId/add/:associateId",
  fieldValidate,
  async (req: Request, res: Response) => {
    const eventId: string = req.params.eventId;
    const associateId: string = req.params.associateId;

    const update: UpdateObject = req.body;

    const associateToBeUpdated: ResponseType = await associateDao.read(
      associateId
    );
    let newAssociateToBeUpdated: AssociateType = {
      ...associateToBeUpdated.response[0].data,
      events: [...associateToBeUpdated.response[0].data.events, eventId],
      lastAssociateUpdate: [
        update,
        ...associateToBeUpdated.response[0].data.lastAssociateUpdate,
      ],
    };

    let associateUpdated: Associate = new Associate(
      newAssociateToBeUpdated.fullName,
      newAssociateToBeUpdated.socialName,
      newAssociateToBeUpdated.cpf,
      newAssociateToBeUpdated.idPassport,
      newAssociateToBeUpdated.email,
      newAssociateToBeUpdated.emailSecondary,
      newAssociateToBeUpdated.phone,
      newAssociateToBeUpdated.contryOfResidence,
      newAssociateToBeUpdated.stateOfResidence,
      newAssociateToBeUpdated.cityOfResidence,
      newAssociateToBeUpdated.nationality,
      newAssociateToBeUpdated.stateOfBirth,
      newAssociateToBeUpdated.cityOfBirth,
      newAssociateToBeUpdated.profilePhoto,
      newAssociateToBeUpdated.profession,
      newAssociateToBeUpdated.dateOfAdmission,
      newAssociateToBeUpdated.employmentContractIsCurrentlyValid,
      newAssociateToBeUpdated.dateLastMSFJob,
      newAssociateToBeUpdated.isHealthcareField,
      newAssociateToBeUpdated.hasMsfXpOutsideHomeContry,
      newAssociateToBeUpdated.hasMsfXPinBrazilOrAmerica,
      newAssociateToBeUpdated.lastPosition,
      newAssociateToBeUpdated.contractType,
      newAssociateToBeUpdated.personalHighlightOfXpWorkingWithMsf,
      newAssociateToBeUpdated.dateOfBirth,
      newAssociateToBeUpdated.languages,
      newAssociateToBeUpdated.otherLanguages,
      newAssociateToBeUpdated.gender,
      newAssociateToBeUpdated.lgbtqiapnplusMember,
      newAssociateToBeUpdated.race,
      newAssociateToBeUpdated.otherRace,
      newAssociateToBeUpdated.ethnicity,
      newAssociateToBeUpdated.underrepresentedGroup,
      newAssociateToBeUpdated.communicationAccebilityResources,
      newAssociateToBeUpdated.otherCommunicationAccebilityResources,
      newAssociateToBeUpdated.physicalDisabilityOrReducedMobility,
      newAssociateToBeUpdated.physicalDisabilityOrReducedMobilityDescription,
      newAssociateToBeUpdated.memberShip,
      newAssociateToBeUpdated.personalCode,
      newAssociateToBeUpdated.isAwarePrivacyPolicy,
      newAssociateToBeUpdated.grantConcentUseData,
      newAssociateToBeUpdated.dateOfConcentUseData,
      newAssociateToBeUpdated.moreThanSixMonthsWithMSF,
      newAssociateToBeUpdated.moreThanTwelveMonthsInternOrVolunteer,
      newAssociateToBeUpdated.reciveMessageApp,
      newAssociateToBeUpdated.reciveGeneralEmails,
      newAssociateToBeUpdated.events,
      newAssociateToBeUpdated.initiatives,
      newAssociateToBeUpdated.committee,
      newAssociateToBeUpdated.board,
      newAssociateToBeUpdated.fiscalCouncil,
      newAssociateToBeUpdated.otherInitiatives,
      newAssociateToBeUpdated.lastAssociateUpdate
    );
    await associateDao.update(
      associateToBeUpdated.response[0].id,
      associateUpdated
    );
    let result = await associateDao.readWithQuery(
      "events",
      "array-contains",
      eventId
    );
    console.log(result);
    res.status(result.status).send(result.response);
  }
);

router.put(
  "/update/participants/:eventId/remove/:associateId",
  fieldValidate,
  async (req: Request, res: Response) => {
    const eventId: string = req.params.eventId;
    const associateId: string = req.params.associateId;

    const associateToBeUpdated: ResponseType = await associateDao.read(
      associateId
    );

    const update: UpdateObject = req.body;

    let newAssociateToBeUpdated: AssociateType = {
      ...associateToBeUpdated.response[0].data,
      events: associateToBeUpdated.response[0].data.events.filter(
        (event: string) => event !== eventId
      ),
      lastAssociateUpdate: [
        update,
        ...associateToBeUpdated.response[0].data.lastAssociateUpdate,
      ],
    };

    let associateUpdated: Associate = new Associate(
      newAssociateToBeUpdated.fullName,
      newAssociateToBeUpdated.socialName,
      newAssociateToBeUpdated.cpf,
      newAssociateToBeUpdated.idPassport,
      newAssociateToBeUpdated.email,
      newAssociateToBeUpdated.emailSecondary,
      newAssociateToBeUpdated.phone,
      newAssociateToBeUpdated.contryOfResidence,
      newAssociateToBeUpdated.stateOfResidence,
      newAssociateToBeUpdated.cityOfResidence,
      newAssociateToBeUpdated.nationality,
      newAssociateToBeUpdated.stateOfBirth,
      newAssociateToBeUpdated.cityOfBirth,
      newAssociateToBeUpdated.profilePhoto,
      newAssociateToBeUpdated.profession,
      newAssociateToBeUpdated.dateOfAdmission,
      newAssociateToBeUpdated.employmentContractIsCurrentlyValid,
      newAssociateToBeUpdated.dateLastMSFJob,
      newAssociateToBeUpdated.isHealthcareField,
      newAssociateToBeUpdated.hasMsfXpOutsideHomeContry,
      newAssociateToBeUpdated.hasMsfXPinBrazilOrAmerica,
      newAssociateToBeUpdated.lastPosition,
      newAssociateToBeUpdated.contractType,
      newAssociateToBeUpdated.personalHighlightOfXpWorkingWithMsf,
      newAssociateToBeUpdated.dateOfBirth,
      newAssociateToBeUpdated.languages,
      newAssociateToBeUpdated.otherLanguages,
      newAssociateToBeUpdated.gender,
      newAssociateToBeUpdated.lgbtqiapnplusMember,
      newAssociateToBeUpdated.race,
      newAssociateToBeUpdated.otherRace,
      newAssociateToBeUpdated.ethnicity,
      newAssociateToBeUpdated.underrepresentedGroup,
      newAssociateToBeUpdated.communicationAccebilityResources,
      newAssociateToBeUpdated.otherCommunicationAccebilityResources,
      newAssociateToBeUpdated.physicalDisabilityOrReducedMobility,
      newAssociateToBeUpdated.physicalDisabilityOrReducedMobilityDescription,
      newAssociateToBeUpdated.memberShip,
      newAssociateToBeUpdated.personalCode,
      newAssociateToBeUpdated.isAwarePrivacyPolicy,
      newAssociateToBeUpdated.grantConcentUseData,
      newAssociateToBeUpdated.dateOfConcentUseData,
      newAssociateToBeUpdated.moreThanSixMonthsWithMSF,
      newAssociateToBeUpdated.moreThanTwelveMonthsInternOrVolunteer,
      newAssociateToBeUpdated.reciveMessageApp,
      newAssociateToBeUpdated.reciveGeneralEmails,
      newAssociateToBeUpdated.events,
      newAssociateToBeUpdated.initiatives,
      newAssociateToBeUpdated.committee,
      newAssociateToBeUpdated.board,
      newAssociateToBeUpdated.fiscalCouncil,
      newAssociateToBeUpdated.otherInitiatives,
      newAssociateToBeUpdated.lastAssociateUpdate
    );
    await associateDao.update(
      associateToBeUpdated.response[0].id,
      associateUpdated
    );
    let result = await associateDao.readWithQuery(
      "events",
      "array-contains",
      eventId
    );
    console.log(result);
    res.status(result.status).send(result.response);
  }
);

router.delete(
  "/delete/:eventId",
  [param("eventId").exists()],
  async (req: Request, res: Response) => {
    const eventId: string = req.params.eventId;
    const associatesWithEventToBeUpdated: ResponseType =
      await associateDao.readWithQuery("events", "array-contains", eventId);
    associatesWithEventToBeUpdated.response.map(
      async (associateToBeUpdated: { id: string; data: AssociateType }) => {
        let associateToBeUpdatedWithoutEventId: AssociateType = {
          ...associateToBeUpdated.data,
          events: associateToBeUpdated.data.events.filter(
            (event: string) => event !== eventId
          ),
        };
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log(associateToBeUpdatedWithoutEventId);
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

        let associateUpdated: Associate = new Associate(
          associateToBeUpdatedWithoutEventId.fullName,
          associateToBeUpdatedWithoutEventId.socialName,
          associateToBeUpdatedWithoutEventId.cpf,
          associateToBeUpdatedWithoutEventId.idPassport,
          associateToBeUpdatedWithoutEventId.email,
          associateToBeUpdatedWithoutEventId.emailSecondary,
          associateToBeUpdatedWithoutEventId.phone,
          associateToBeUpdatedWithoutEventId.contryOfResidence,
          associateToBeUpdatedWithoutEventId.stateOfResidence,
          associateToBeUpdatedWithoutEventId.cityOfResidence,
          associateToBeUpdatedWithoutEventId.nationality,
          associateToBeUpdatedWithoutEventId.stateOfBirth,
          associateToBeUpdatedWithoutEventId.cityOfBirth,
          associateToBeUpdatedWithoutEventId.profilePhoto,
          associateToBeUpdatedWithoutEventId.profession,
          associateToBeUpdatedWithoutEventId.dateOfAdmission,
          associateToBeUpdatedWithoutEventId.employmentContractIsCurrentlyValid,
          associateToBeUpdatedWithoutEventId.dateLastMSFJob,
          associateToBeUpdatedWithoutEventId.isHealthcareField,
          associateToBeUpdatedWithoutEventId.hasMsfXpOutsideHomeContry,
          associateToBeUpdatedWithoutEventId.hasMsfXPinBrazilOrAmerica,
          associateToBeUpdatedWithoutEventId.lastPosition,
          associateToBeUpdatedWithoutEventId.contractType,
          associateToBeUpdatedWithoutEventId.personalHighlightOfXpWorkingWithMsf,
          associateToBeUpdatedWithoutEventId.dateOfBirth,
          associateToBeUpdatedWithoutEventId.languages,
          associateToBeUpdatedWithoutEventId.otherLanguages,
          associateToBeUpdatedWithoutEventId.gender,
          associateToBeUpdatedWithoutEventId.lgbtqiapnplusMember,
          associateToBeUpdatedWithoutEventId.race,
          associateToBeUpdatedWithoutEventId.otherRace,
          associateToBeUpdatedWithoutEventId.ethnicity,
          associateToBeUpdatedWithoutEventId.underrepresentedGroup,
          associateToBeUpdatedWithoutEventId.communicationAccebilityResources,
          associateToBeUpdatedWithoutEventId.otherCommunicationAccebilityResources,
          associateToBeUpdatedWithoutEventId.physicalDisabilityOrReducedMobility,
          associateToBeUpdatedWithoutEventId.physicalDisabilityOrReducedMobilityDescription,
          associateToBeUpdatedWithoutEventId.memberShip,
          associateToBeUpdatedWithoutEventId.personalCode,
          associateToBeUpdatedWithoutEventId.isAwarePrivacyPolicy,
          associateToBeUpdatedWithoutEventId.grantConcentUseData,
          associateToBeUpdatedWithoutEventId.dateOfConcentUseData,
          associateToBeUpdatedWithoutEventId.moreThanSixMonthsWithMSF,
          associateToBeUpdatedWithoutEventId.moreThanTwelveMonthsInternOrVolunteer,
          associateToBeUpdatedWithoutEventId.reciveMessageApp,
          associateToBeUpdatedWithoutEventId.reciveGeneralEmails,
          associateToBeUpdatedWithoutEventId.events,
          associateToBeUpdatedWithoutEventId.initiatives,
          associateToBeUpdatedWithoutEventId.committee,
          associateToBeUpdatedWithoutEventId.board,
          associateToBeUpdatedWithoutEventId.fiscalCouncil,
          associateToBeUpdatedWithoutEventId.otherInitiatives,
          associateToBeUpdatedWithoutEventId.lastAssociateUpdate
        );
        await associateDao.update(associateToBeUpdated.id, associateUpdated);
      }
    );
    const deleteResult = await eventDao.delete(eventId);
    console.log(associatesWithEventToBeUpdated);
    res
      .status(deleteResult.status)
      .send(associatesWithEventToBeUpdated.response);
  }
);

router.get("/read/:eventId", async (req: Request, res: Response) => {
  const eventId: string = req.params.eventId;
  const result = await eventDao.read(eventId);
  console.log(result);
  res.status(result.status).send(result.response);
});

router.get("/participantsof/:eventId", async (req: Request, res: Response) => {
  const eventId: string = req.params.eventId;
  const result = await associateDao.readWithQuery(
    "events",
    "array-contains",
    eventId
  );
  console.log(result);
  res.status(result.status).send(result.response);
});

router.get("/readall", async (req: Request, res: Response) => {
  const result = await eventDao.readAll();
  console.log(result);
  res.status(result.status).send(result.response);
});

router.all("*", (req, res, next) => {
  res.status(500).send("Something gone wrong...");
});

export default router;
