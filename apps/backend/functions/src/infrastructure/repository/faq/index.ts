import { IRepository, IValidationUtility } from "../../../interfaces";
import { DBUtils } from "../utils";
import { IFaqRepository } from "./interface";
import { CreateDbFaqSchema } from "./schema";

export * from "./interface";
export * from "./schema";

/**
 * Concrete implementation of {IFaqRepository}
 * @@class
 */

export class FaqRepository extends DBUtils implements IFaqRepository {
  constructor(
    private readonly db: IRepository["db"],
    private readonly validationUtility: IValidationUtility,
  ) {
    super();
  }

  /** Creates an FAQ in the database */

  create: IFaqRepository["create"] = async (data) => {
    data = this.validationUtility.validateInput({
      schema: CreateDbFaqSchema,
      inputData: data,
    });

    const faq = await this.db.faq.create({
      data,
    });

    return faq;
  };
}
