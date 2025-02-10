import { YearType } from "../types/YearType";
import { ResponseType } from "../types/ResponseType";
import { Year } from "../models/Year";

interface YearRepository {
  create: (collection: string, year: YearType) => Promise<ResponseType>;
  update: (
    collection: string,
    yearId: string,
    year: YearType
  ) => Promise<ResponseType>;
  delete: (collection: string, yearId: string) => Promise<ResponseType>;
  read: (collection: string, year: string) => Promise<ResponseType>;
  readAll: (collection: string) => Promise<ResponseType>;
}

export class YearDAO {
  private repository: YearRepository;

  constructor(repository: YearRepository) {
    this.repository = repository;
  }

  public async create(yearToBeCreated: Year): Promise<ResponseType> {
    const createResult = this.repository.create("years", {
      year: yearToBeCreated.year,
      entries: yearToBeCreated.entries,
    });
    return createResult;
  }

  public async update(
    yearIdToBeUpdated: string,
    yearToBeUpdated: Year
  ): Promise<ResponseType> {
    const updateResult = this.repository.update("years", yearIdToBeUpdated, {
      year: yearToBeUpdated.year,
      entries: yearToBeUpdated.entries,
    });
    return updateResult;
  }

  public async delete(yearIdToBeUpdated: string): Promise<ResponseType> {
    const deleteResult = this.repository.delete("years", yearIdToBeUpdated);
    return deleteResult;
  }

  public async read(yearsIdToBeRead: string): Promise<ResponseType> {
    const readResult = this.repository.read("years", yearsIdToBeRead);
    return readResult;
  }

  public async readAll(): Promise<ResponseType> {
    const readAllResult = this.repository.readAll("years");
    return readAllResult;
  }

  public async readUserInYears(userIdToBeRead: string): Promise<ResponseType> {
    const readAllResult = this.repository.readAll("years");
    console.log(readAllResult);
    return readAllResult;
  }
}
