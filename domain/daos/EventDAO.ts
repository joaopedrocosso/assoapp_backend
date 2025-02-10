import { EventType } from "../types/EventType";
import { ResponseType } from "../types/ResponseType";
import { Event } from "../models/Event";

interface EventRepository {
  create: (collection: string, event: EventType) => Promise<ResponseType>;
  update: (
    collection: string,
    eventId: string,
    event: EventType
  ) => Promise<ResponseType>;
  delete: (collection: string, eventId: string) => Promise<ResponseType>;
  read: (collection: string, event: string) => Promise<ResponseType>;
  readAll: (collection: string) => Promise<ResponseType>;
}

export class EventDAO {
  private repository: EventRepository;

  constructor(repository: EventRepository) {
    this.repository = repository;
  }

  public async create(eventToBeCreated: Event): Promise<ResponseType> {
    const createResult = this.repository.create("events", {
      title: eventToBeCreated.title,
      titleDescription: eventToBeCreated.titleDescription,
      date: eventToBeCreated.date,
    });
    return createResult;
  }

  public async update(
    eventIdToBeUpdated: string,
    eventToBeUpdated: Event
  ): Promise<ResponseType> {
    const updateResult = this.repository.update("events", eventIdToBeUpdated, {
      title: eventToBeUpdated.title,
      titleDescription: eventToBeUpdated.titleDescription,
      date: eventToBeUpdated.date,
    });
    return updateResult;
  }

  public async delete(eventIdToBeUpdated: string): Promise<ResponseType> {
    const deleteResult = this.repository.delete("events", eventIdToBeUpdated);
    return deleteResult;
  }

  public async read(eventsIdToBeRead: string): Promise<ResponseType> {
    const readResult = this.repository.read("events", eventsIdToBeRead);
    return readResult;
  }

  public async readAll(): Promise<ResponseType> {
    const readAllResult = this.repository.readAll("events");
    return readAllResult;
  }
}
