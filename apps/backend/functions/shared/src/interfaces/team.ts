import { IAdmin } from "./admin";
import { IDepartment } from "./department";
import { ITimestamps } from "./utils";

export interface ITeam extends ITimestamps {
  id: number;
  name: string;
  departmentId: number;
  department?: IDepartment;

  leadId?: string;
  lead?: IAdmin;

  members?: IAdmin[];
}
