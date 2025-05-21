import { Prisma } from "../prisma-client";

export interface ISchoolRepository {
  create(
    options: Parameters<Prisma.SchoolDelegate["create"]>["0"],
  ): ReturnType<Prisma.SchoolDelegate["create"]>;

  findUnique(
    options: Parameters<Prisma.SchoolDelegate["findUnique"]>["0"],
  ): ReturnType<Prisma.SchoolDelegate["findUnique"]>;

  findMany(
    options?: Parameters<Prisma.SchoolDelegate["findMany"]>["0"],
  ): ReturnType<Prisma.SchoolDelegate["findMany"]>;

  count(
    options?: Parameters<Prisma.SchoolDelegate["count"]>["0"],
  ): ReturnType<Prisma.SchoolDelegate["count"]>;
}
