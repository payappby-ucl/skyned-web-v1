import { IAdmin } from "@workspace/shared";
import { IAdminRepository } from "../../infrastructure";
import { IQueryConstruct } from "../utils";

/** Represents AdminService */
export interface IAdminService {
  /** Get admin data using admin id */
  findAdminByAdminId: IAdminRepository["findAdminByAdminId"];
  /** creates and admin */
  createAdmin(
    data: Parameters<IAdminRepository["create"]>["0"]["data"],
    departments: number[],
  ): Promise<IAdmin>;

  /** Number of all admins in the database */
  count(initiator: IAdmin): Promise<number>;

  /** Count Admins for list */
  // ? This may include filters in the future
  countAdminsForList(initiator: IAdmin): Promise<number>;

  /** Find many admins */
  // ? This may include filters in the future
  listAdmins(
    initiator: IAdmin,
    query: Partial<IQueryConstruct<IAdmin>>,
  ): Promise<
    (IAdmin & {
      _count: {
        departments: number;
        teams: number;
      };
    })[]
  >;
}
