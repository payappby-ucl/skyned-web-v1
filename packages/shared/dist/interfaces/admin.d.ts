import { Gender } from "enums/gender";
import { IObject, ITimestamps } from "./utils";
import { IDepartment } from "./department";
import { ITeam } from "./team";
export interface IAdmin extends ITimestamps {
    id: number;
    adminId: string;
    email: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    gender: Gender;
    accountSuspended: boolean;
    nationality: string;
    countryOfResidence: string;
    about?: string;
    jobTitle: string;
    primaryImage: IObject;
    secondaryImage?: IObject;
    createdById?: string;
    createdBy?: IAdmin;
    created?: IAdmin[];
    departments?: IDepartment[];
    departmentsLeading?: IDepartment[];
    teams?: ITeam[];
    teamsLeading?: ITeam[];
}
