import { CurrencyType, InstitutionType, OwnershipType } from "../types";
import { AdminProfile } from "./admin";
import { IObject, ITimestamps } from "./utils";

export interface ISchool extends ITimestamps {
  id: number;
  schoolId: string;

  logo: IObject;
  schoolImage: IObject;
  name: string;
  slug: string;
  country: string;
  state: string;
  city: string;
  address: string;
  link: string;
  overview: string;
  institutionType: InstitutionType;
  ownershipType: OwnershipType;
  currency: CurrencyType;

  createdById: string;
  createdBy?: AdminProfile;
}
