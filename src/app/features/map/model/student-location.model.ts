import { LocationModel } from "./location.model";

export interface StudentLocationModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  liveLocation: LocationModel;
}
