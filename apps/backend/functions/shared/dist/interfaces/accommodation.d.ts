import { IAdmin } from "./admin";
import { ISchool } from "./school";
import { ITimestamps } from "./utils";
export interface IAccommodation extends ITimestamps {
    id: number;
    description: string;
    createdById: string;
    createdBy?: IAdmin;
    schoolId: string;
    school?: ISchool;
}
