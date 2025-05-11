import { IAdmin } from "@workspace/shared";
import { IAdminRepository } from "../../infrastructure";

/** Represents AdminService */
export interface IAdminService {
  /** Get admin data using admin id */
  findAdminByAdminId: IAdminRepository["findAdminByAdminId"];
  /** creates and admin */
  createAdmin(
    data: Parameters<IAdminRepository["create"]>["0"]["data"],
    departments: number[],
  ): Promise<IAdmin>;
}
