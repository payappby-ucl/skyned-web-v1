import { AdminProfile } from "./admin";
import { ISchool } from "./school";
import { ITimestamps } from "./utils";
export interface IIntake extends ITimestamps {
    id: number;
    intake: Date;
    startDate: Date;
    deadline: Date;
    schoolId: string;
    school?: ISchool;
    createdById: string;
    createdBy?: AdminProfile;
}
