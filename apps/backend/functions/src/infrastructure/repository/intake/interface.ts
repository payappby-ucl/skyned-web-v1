import { Prisma } from "../prisma-client";

/** Represents Intakes repository */
export interface IIntakeRepository {
  /** create intake */
  create(
    options: Parameters<Prisma.IntakeDelegate["create"]>["0"],
  ): ReturnType<Prisma.IntakeDelegate["create"]>;

  /** create many intakes */
  createMany(
    options: Parameters<Prisma.IntakeDelegate["createMany"]>["0"],
  ): ReturnType<Prisma.IntakeDelegate["createMany"]>;

  /** update intake */
  update(
    options: Parameters<Prisma.IntakeDelegate["update"]>["0"],
  ): ReturnType<Prisma.IntakeDelegate["update"]>;

  /** find intake */
  findUnique(
    options: Parameters<Prisma.IntakeDelegate["findUnique"]>["0"],
  ): ReturnType<Prisma.IntakeDelegate["findUnique"]>;

  /** find many intake */
  findMany(
    options?: Parameters<Prisma.IntakeDelegate["findMany"]>["0"],
  ): ReturnType<Prisma.IntakeDelegate["findMany"]>;

  /** delete intake */
  delete(
    options: Parameters<Prisma.IntakeDelegate["delete"]>["0"],
  ): ReturnType<Prisma.IntakeDelegate["delete"]>;

  /** count intakes */
  count(
    options?: Parameters<Prisma.IntakeDelegate["count"]>["0"],
  ): ReturnType<Prisma.IntakeDelegate["count"]>;
}
