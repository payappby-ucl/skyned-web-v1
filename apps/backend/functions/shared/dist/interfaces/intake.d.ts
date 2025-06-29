import { AdminProfile } from "./admin";
import { ISchool } from "./school";
import { ITimestamps } from "./utils";
export interface IIntake extends ITimestamps {
    id: number;
    intake: string;
    startDate: Date;
    deadline: Date;
    schoolId: string;
    school?: ISchool;
    createdById: string;
    createdBy?: AdminProfile;
    _count?: {
        programs: number;
    };
}
