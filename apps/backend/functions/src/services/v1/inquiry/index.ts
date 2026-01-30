/* eslint-disable operator-linebreak */
/* eslint-disable max-len */

import { RegistryKeysEnum } from "../../../enum";
import { CreateContactUsSchema } from "../../../infrastructure";
import { IInquiryService } from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { SkynedUtils } from "../../../utils";
import { IdSchema } from "../../../zod-schemas";
import { ServiceUtils } from "../utils";

/** Concrete implementation of IInquiryService */

export class InquiryService extends ServiceUtils implements IInquiryService {
  private static instance: IInquiryService | null = null;

  private constructor() {
    super();
  }

  /** Creates a instance of IInquiryService */

  static factory() {
    if (!InquiryService.instance) {
      InquiryService.instance = new InquiryService();
    }

    return InquiryService.instance;
  }

  private _constructQuery(query: Parameters<IInquiryService["findMany"]>["0"]) {
    let queryArgs: Parameters<typeof this.repository.inquiry.findMany>["0"] =
      {};

    if (query) {
      if (query.where) {
        queryArgs.where = {
          ...(queryArgs.where || {}),
          ...query.where,
        };
      }

      if (query.from) {
        queryArgs.where = {
          ...(queryArgs.where || {}),
          createdAt: {
            gte: query.from,
          },
        };
      }

      if (query.to) {
        queryArgs.where = {
          ...(queryArgs.where || {}),
          createdAt: {
            lte: query.to,
          },
        };
      }

      queryArgs.orderBy = {
        ...(queryArgs.orderBy || {}),
        [`${query?.order?.orderBy || "createdAt"}`]:
          query?.order?.order || "desc",
      };

      queryArgs = {
        ...queryArgs,
        ...SkynedUtils.pick(query, ["skip", "take"]),
      };
    }

    return Object.keys(queryArgs).length ? queryArgs : undefined;
  }

  create: IInquiryService["create"] = async (data) => {
    this.validationUtility.validateInput({
      schema: CreateContactUsSchema,
      inputData: data,
    });

    const res = await this.repository.inquiry.create(data);
    return res;
  };

  findMany: IInquiryService["findMany"] = async (query) => {
    const queryArgs = this._constructQuery(query);

    const inquiries = await this.repository.inquiry.findMany(queryArgs);
    return inquiries;
  };

  count: IInquiryService["count"] = async (query) => {
    const queryArgs = this._constructQuery(query);
    const total = await this.repository.inquiry.count(
      queryArgs?.where
        ? {
            where: queryArgs.where,
          }
        : undefined,
    );

    return total;
  };

  findById: IInquiryService["findById"] = async (id) => {
    this.validationUtility.validateInput({
      schema: IdSchema,
      inputData: { id },
    });

    const inquiry = await this.repository.inquiry.findById(id);
    return inquiry;
  };

  delete: IInquiryService["delete"] = async (id) => {
    this.validationUtility.validateInput({
      schema: IdSchema,
      inputData: { id },
    });

    const inquiry = await this.repository.inquiry.delete(id);
    return inquiry;
  };
}

/** instance of InquiryService */
export const inquiryService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.INQUIRY_SERVICE,
  () => InquiryService.factory(),
);
