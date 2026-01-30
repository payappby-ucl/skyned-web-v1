import { Prisma } from "../prisma-client";

/** Represents accommodation repository */
export interface IAccommodationRepository {
  /** Creates or update accommodation */
  upsert(
    options: Parameters<Prisma.AccommodationDelegate["upsert"]>["0"],
  ): ReturnType<Prisma.AccommodationDelegate["upsert"]>;

  /** Finds an accommodation */
  findUnique(
    options: Parameters<Prisma.AccommodationDelegate["findUnique"]>["0"],
  ): ReturnType<Prisma.AccommodationDelegate["findUnique"]>;

  /** Finds many accommodation */
  findMany(
    options: Parameters<Prisma.AccommodationDelegate["findMany"]>["0"],
  ): ReturnType<Prisma.AccommodationDelegate["findMany"]>;

  /** Count */
  count(
    options?: Parameters<Prisma.AccommodationDelegate["count"]>["0"],
  ): ReturnType<Prisma.AccommodationDelegate["count"]>;

  /** Delete */
  delete(
    options: Parameters<Prisma.AccommodationDelegate["delete"]>["0"],
  ): ReturnType<Prisma.AccommodationDelegate["delete"]>;
}
