import { RegistryKeysEnum } from "../../enum";
import { IRepository, IValidationUtility } from "../../interfaces";
import SkynedRegistry from "../../registry";
import { validationUtility } from "../../utils";
import { AdminRepository } from "./admin";
import { InquiryRepository } from "./inquiry";
import { Client } from "./prisma";
import { TokenRepository } from "./token";

export * from "./token";
export * from "./admin";
export * from "./inquiry";

export interface RepositoryDependencies {
  validationUtility: IValidationUtility;
}

/**
 * Concrete implementation of IRepository using Prisma ORM and Postgres DB
 *
 * @class
 */
export class Repository extends Client implements IRepository {
  private static instance: IRepository | null = null;
  private constructor(private readonly validationUtility: IValidationUtility) {
    super();
  }

  /** Creates an instance of Repository */

  static factory({ validationUtility }: RepositoryDependencies) {
    if (!Repository.instance) {
      Repository.instance = new Repository(validationUtility);
    }

    return Repository.instance;
  }

  /** TokenRepository instance */
  token = new TokenRepository(this.db, this.validationUtility);
  admin = new AdminRepository(this.db, this.validationUtility);
  inquiry = new InquiryRepository(this.db, this.validationUtility);
}

export const repository = SkynedRegistry.getSingleton(
  RegistryKeysEnum.REPOSITORY,
  () =>
    Repository.factory({
      validationUtility,
    }),
);
