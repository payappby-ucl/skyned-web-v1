import { CurrencyType, InstitutionType, OwnershipType } from "../types";
import { IAccommodation } from "./accommodation";
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
    active: boolean;
    accommodation?: IAccommodation;
    createdById: string;
    createdBy?: AdminProfile;
}
