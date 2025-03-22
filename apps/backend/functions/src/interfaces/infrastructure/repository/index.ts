/* eslint-disable max-len */
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { ITokenRepository } from "../../../infrastructure";

/** Database interface representation */
export interface IRepository {
  /** DB - This is in a case i need to use transactions - Tightly coupled to prisma and postgres DB */
  db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  token: ITokenRepository;
}
