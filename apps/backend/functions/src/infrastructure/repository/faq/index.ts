import { IRepository, IValidationUtility } from "../../../interfaces";
import { adminProfileKeys, SkynedUtils } from "../../../utils";
import { IdSchema } from "../../../zod-schemas";
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
      include: {
        createdBy: {
          select: {
            ...SkynedUtils.select(adminProfileKeys),
          },
        },
      },
    });

    return this.deserialize(faq);
  };

  /**
   * Counts document
   */

  count: IFaqRepository["count"] = async (query) => {
    const count = await this.db.faq.count(query);
    return count;
  };

  /** List faqs */

  findMany: IFaqRepository["findMany"] = async (query) => {
    const faqs = await this.db.faq.findMany({
      ...query,
      include: {
        createdBy: {
          select: {
            ...SkynedUtils.select(adminProfileKeys),
          },
        },
      },
    });
    return faqs.map((faq) => this.deserialize(faq));
  };

  /** Deletes faqs */

  delete: IFaqRepository["delete"] = async (id) => {
    this.validationUtility.validateInput({
      schema: IdSchema,
      inputData: {
        id,
      },
    });

    const deletedFaq = await this.db.faq.delete({
      where: {
        id,
      },
    });

    return deletedFaq;
  };

  /** Find faq by id */

  findById: IFaqRepository["findById"] = async (id) => {
    this.validationUtility.validateInput({
      schema: IdSchema,
      inputData: {
        id,
      },
    });

    const faq = await this.db.faq.findUnique({
      where: {
        id,
      },
      include: {
        createdBy: {
          select: {
            ...SkynedUtils.select(adminProfileKeys),
          },
        },
      },
    });

    if (!faq) return null;

    return this.deserialize(faq);
  };
}
