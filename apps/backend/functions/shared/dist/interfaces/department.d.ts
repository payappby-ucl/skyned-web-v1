import { ITimestamps } from "./utils";
import { IAdmin } from "./admin";
import { ITeam } from "./team";
import { Department } from "../types";
export interface IDepartment extends ITimestamps {
    id: number;
    name: Department;
    leadId?: string;
    lead?: IAdmin;
    members?: IAdmin[];
    teams?: ITeam[];
}
