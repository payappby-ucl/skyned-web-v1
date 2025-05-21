import { RegistryKeysEnum } from "../../enum";
import { IRepository, IValidationUtility } from "../../interfaces";
import SkynedRegistry from "../../registry";
import { validationUtility } from "../../utils";
import { ActivityLogRepository } from "./activity-log";
import { AdminRepository } from "./admin";
import { DepartmentRepository } from "./department";
import { FaqRepository } from "./faq";
import { InquiryRepository } from "./inquiry";
import { Client } from "./prisma";
import { SchoolRepository } from "./school";
import { TokenRepository } from "./token";

export * from "./token";
export * from "./admin";
export * from "./inquiry";
export * from "./activity-log";
export * from "./faq";
export * from "./department";
export * from "./school";

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
  activityLog = new ActivityLogRepository(this.db);
  faq = new FaqRepository(this.db, this.validationUtility);
  department = new DepartmentRepository(this.db);
  school = new SchoolRepository(this.db);
}

export const repository = SkynedRegistry.getSingleton(
  RegistryKeysEnum.REPOSITORY,
  () =>
    Repository.factory({
      validationUtility,
    }),
);
