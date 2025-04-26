/* eslint-disable operator-linebreak */
/* eslint-disable max-len */

import { accessControl } from "@workspace/shared";
import { RegistryKeysEnum } from "../../../enum";
import { CreateContactUsSchema, repository } from "../../../infrastructure";
import {
  IInquiryService,
  IRepository,
  IValidationUtility,
} from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { SkynedUtils, validationUtility } from "../../../utils";
import { StatusCodes } from "http-status-codes";

/** Represents dependencies needed to instantiate IInquiryService concrete class */
export interface InquiryServiceDependencies {
  /** Database object */
  repository: IRepository;
  /** Validation object */
  validationUtility: IValidationUtility;
}

/** Concrete implementation of IInquiryService */

export class InquiryService implements IInquiryService {
  private static instance: IInquiryService | null = null;

  private constructor(
    private readonly repository: IRepository,
    private readonly validationUtility: IValidationUtility,
  ) {
    // * Private
  }

  /** Creates a instance of IInquiryService */

  static factory({
    repository,
    validationUtility,
  }: InquiryServiceDependencies) {
    if (!InquiryService.instance) {
      InquiryService.instance = new InquiryService(
        repository,
        validationUtility,
      );
    }

    return InquiryService.instance;
  }

  private _constructQuery(query: Parameters<IInquiryService["findMany"]>["1"]) {
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

  findMany: IInquiryService["findMany"] = async (initiator, query) => {
    const hasAccess = accessControl.attribute(
      {
        user: initiator,
        claim: "admin",
      },
      "inquiries",
      "list",
    );

    if (!hasAccess) {
      throw SkynedUtils.createException(StatusCodes.FORBIDDEN, "Unauthorized");
    }

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
}

/** instance of InquiryService */
export const inquiryService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.INQUIRY_SERVICE,
  () =>
    InquiryService.factory({
      repository,
      validationUtility,
    }),
);
