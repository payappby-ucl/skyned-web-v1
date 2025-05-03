import { IObject, IPhoneNumber, ITimestamps } from "./utils";
import { IDepartment } from "./department";
import { ITeam } from "./team";
import { Gender } from "../types";

export interface IAdmin extends ITimestamps {
  id: number;
  adminId: string;
  email: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  gender: Gender;
  accountSuspended: boolean;
  nationality: string;
  countryOfResidence: string;
  about: string | null;
  jobTitle: string;
  primaryImage: IObject;
  secondaryImage: IObject | null;
  phoneNumber: IPhoneNumber | null;

  createdById: string | null;
  createdBy?: AdminProfile | null;

  created?: AdminProfile[];

  departments?: IDepartment[];
  departmentsLeading?: IDepartment[];

  teams?: ITeam[];
  teamsLeading?: ITeam[];
}

export type AdminProfile = Pick<
  IAdmin,
  | "adminId"
  | "firstName"
  | "lastName"
  | "email"
  | "jobTitle"
  | "primaryImage"
  | "phoneNumber"
  | "gender"
>;
