import { AssociateType } from "./AssociateType";
import { YearType } from "./YearType";

export interface ResponseType {
  status: number;
  response: any[];
}

export interface FirebaseResponseType {
  id: string;
  data: YearType;
}
