import { DepartmentName } from "enums";
import { ITimestamps } from "./utils";
import { IAdmin } from "./admin";
import { ITeam } from "./team";
export interface IDepartment extends ITimestamps {
    id: number;
    name: DepartmentName;
    leadId?: string;
    lead?: IAdmin;
    members?: IAdmin[];
    teams?: ITeam[];
}
