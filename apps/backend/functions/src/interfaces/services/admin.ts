import { IAdminRepository } from "../../infrastructure";

/** Represents AdminService */
export interface IAdminService {
  /** Get admin data using admin id */
  findAdminByAdminId: IAdminRepository["findAdminByAdminId"];
}
