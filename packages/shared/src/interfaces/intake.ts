import { AdminProfile } from "./admin";
import { ISchool } from "./school";
import { ITimestamps } from "./utils";
import { intakeStatus } from "../utils";

export interface IIntake extends ITimestamps {
  id: number;
  intake: string;
  startDate?: Date | null;
  deadline?: Date | null;
  status: (typeof intakeStatus)[number];
  schoolId: string;
  school?: ISchool;
  createdById: string;
  createdBy?: AdminProfile;
  _count?: {
    programs: number;
  };
}
