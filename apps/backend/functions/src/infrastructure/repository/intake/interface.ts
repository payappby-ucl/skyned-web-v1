import { Prisma } from "../prisma-client";

/** Represents Intakes repository */
export interface IIntakeRepository {
  /** create intake */
  create(
    options: Parameters<Prisma.IntakeDelegate["create"]>["0"],
  ): ReturnType<Prisma.IntakeDelegate["create"]>;

  /** update intake */
  update(
    options: Parameters<Prisma.IntakeDelegate["update"]>["0"],
  ): ReturnType<Prisma.IntakeDelegate["update"]>;

  /** find intake */
  findUnique(
    options: Parameters<Prisma.IntakeDelegate["findUnique"]>["0"],
  ): ReturnType<Prisma.IntakeDelegate["findUnique"]>;

  /** delete intake */
  delete(
    options: Parameters<Prisma.IntakeDelegate["delete"]>["0"],
  ): ReturnType<Prisma.IntakeDelegate["delete"]>;
}
