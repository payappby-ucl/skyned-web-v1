import { Prisma } from "../prisma-client";

export interface ISchoolRepository {
  create(
    options: Parameters<Prisma.SchoolDelegate["create"]>["0"],
  ): ReturnType<Prisma.SchoolDelegate["create"]>;

  findUnique(
    options: Parameters<Prisma.SchoolDelegate["findUnique"]>["0"],
  ): ReturnType<Prisma.SchoolDelegate["findUnique"]>;
}
