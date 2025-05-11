import { Prisma } from "../prisma-client";

/** Represents all calls to departments table on the database */
export interface IDepartmentRepository {
  /** Gets list of departments */
  getDepartments(
    args?: Parameters<Prisma.DepartmentDelegate["findMany"]>["0"],
  ): ReturnType<Prisma.DepartmentDelegate["findMany"]>;
}
