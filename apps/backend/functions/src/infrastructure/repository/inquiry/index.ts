import { IRepository, IValidationUtility } from "../../../interfaces";
import { IInquiryRepository } from "./interface";
import { DBUtils } from "../utils";
import { CreateContactUsSchema } from "./schema";
import { JsonObject } from "../prisma-client/runtime/library";
import { IdSchema } from "../../../zod-schemas";

export * from "./interface";
export * from "./schema";

/**
 * Concrete implementation of {IInquiryRepository}
 *
 * @class
 */

export class InquiryRepository extends DBUtils implements IInquiryRepository {
  constructor(
    private readonly db: IRepository["db"],
    private readonly validationUtility: IValidationUtility,
  ) {
    super();
  }

  /**
   * Creates an inquiry
   */

  create: IInquiryRepository["create"] = async (data) => {
    this.validationUtility.validateInput({
      schema: CreateContactUsSchema,
      inputData: data,
    });

    const inquiry = await this.db.inquiry.create({
      data: {
        ...data,
        phoneNumber: data.phoneNumber as unknown as JsonObject,
      },
    });

    return this.deserialize(inquiry);
  };

  /**
   * Counts document
   */

  count: IInquiryRepository["count"] = async (query) => {
    const count = await this.db.inquiry.count(query);
    return count;
  };

  /** List Inquiries */

  findMany: IInquiryRepository["findMany"] = async (query) => {
    const inquiries = await this.db.inquiry.findMany(query);
    return inquiries.map((inquiry) => this.deserialize(inquiry));
  };

  /** Deletes inquiry */

  delete: IInquiryRepository["delete"] = async (id) => {
    this.validationUtility.validateInput({
      schema: IdSchema,
      inputData: {
        id,
      },
    });

    const deletedInquiry = await this.db.inquiry.delete({
      where: {
        id,
      },
    });

    return this.deserialize(deletedInquiry);
  };

  /** Find inquiry by id */

  findById: IInquiryRepository["findById"] = async (id) => {
    this.validationUtility.validateInput({
      schema: IdSchema,
      inputData: {
        id,
      },
    });

    const inquiry = await this.db.inquiry.findUnique({
      where: {
        id,
      },
    });

    if (!inquiry) return null;

    return this.deserialize(inquiry);
  };
}
