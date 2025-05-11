import { ITimestamps } from "./utils";
import { AdminProfile } from "./admin";
import { ITeam } from "./team";
import { Department } from "../types";
export interface IDepartment extends ITimestamps {
    id: number;
    name: Department;
    leadId: string | null;
    lead?: AdminProfile;
    members?: AdminProfile[];
    teams?: ITeam[];
}
