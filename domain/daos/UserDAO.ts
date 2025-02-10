import { ResponseType } from "../types/ResponseType";

interface UserRepository {
  getAuth: (email: string, password: string) => Promise<ResponseType>;
  readWithQuery: (
    collectionInputed: string,
    parameterInputed: string,
    stringOperatorInputed: string,
    valueInputed: string
  ) => Promise<ResponseType>;
  readAll: (collection: string) => Promise<ResponseType>;
}

export class UserDAO {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  public async getAuth(email: string, password: string): Promise<ResponseType> {
    const getAuthResponse = this.repository.getAuth(email, password);
    return getAuthResponse;
  }

  public async getUserInfo(uid: string): Promise<ResponseType> {
    const getUserInfoReponse = this.repository.readWithQuery(
      "backofficeusers",
      "uid",
      "==",
      uid
    );
    return getUserInfoReponse;
  }

  public async getUserAll(): Promise<ResponseType> {
    const getUserInfoReponse = this.repository.readAll("backofficeusers");
    return getUserInfoReponse;
  }
}
