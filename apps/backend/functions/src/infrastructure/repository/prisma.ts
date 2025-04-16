import { PrismaClient } from "./prisma-client";

/**
 * Represents prisma ORM client
 */
export abstract class Client {
  /** The ORM connected to DB */
  db = new PrismaClient();
}
