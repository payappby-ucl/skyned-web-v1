import { IAdmin, IDepartment } from "@workspace/shared";
import { IAdminRepository } from "../../infrastructure";
import { IQueryConstruct } from "../utils";

/** Represents AdminService */
export interface IAdminService {
  /** Get admin data using admin id */
  findAdminByAdminId: IAdminRepository["findAdminByAdminId"];

  /** creates an admin */
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
      departments: Pick<IDepartment, "name" | "leadId">[];
      _count: {
        departments: number;
        teams: number;
      };
    })[]
  >;

  /** Get Admin profile */
  getAdminProfile(initiator: IAdmin, adminId: string): Promise<IAdmin | null>;

  /** update and admin */
  updateAdmin(
    adminId: string,
    data: Parameters<IAdminRepository["update"]>["0"]["data"],
  ): Promise<IAdmin>;
}
