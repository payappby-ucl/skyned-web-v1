/* eslint-disable operator-linebreak */
import { RegistryKeysEnum } from "../../../enum";
import { CreateDbFaqSchema, UpdateDbFaqSchema } from "../../../infrastructure";
import { IFaqService } from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { adminProfileKeys, SkynedUtils } from "../../../utils";
import { IdSchema } from "../../../zod-schemas";
import { ServiceUtils } from "../utils";

/**
 * Concrete implementation of {IFaqService}
 * @class
 */

export class FaqService extends ServiceUtils implements IFaqService {
  private static instance: IFaqService | null = null;

  private constructor() {
    super();
  }

  static factory() {
    if (!FaqService.instance) {
      FaqService.instance = new FaqService();
    }

    return FaqService.instance;
  }

  private _constructQuery(query: Parameters<IFaqService["findMany"]>["0"]) {
    let queryArgs: Parameters<typeof this.repository.faq.findMany>["0"] = {};

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

  create: IFaqService["create"] = async (data) => {
    data = this.validationUtility.validateInput({
      schema: CreateDbFaqSchema,
      inputData: data,
    });

    const faq = await this.repository.faq.create(data);
    return faq;
  };

  findMany: IFaqService["findMany"] = async (query) => {
    const queryArgs = this._constructQuery(query);

    const faqs = await this.repository.faq.findMany({
      ...queryArgs,
      include: {
        createdBy: {
          select: SkynedUtils.select(adminProfileKeys),
        },
      },
    });
    return faqs;
  };

  count: IFaqService["count"] = async (query) => {
    const queryArgs = this._constructQuery(query);
    const total = await this.repository.faq.count(
      queryArgs?.where
        ? {
            where: queryArgs.where,
          }
        : undefined,
    );

    return total;
  };

  findById: IFaqService["findById"] = async (id) => {
    this.validationUtility.validateInput({
      schema: IdSchema,
      inputData: { id },
    });

    const faq = await this.repository.faq.findById(id);
    return faq;
  };

  delete: IFaqService["delete"] = async (id) => {
    this.validationUtility.validateInput({
      schema: IdSchema,
      inputData: { id },
    });

    const faq = await this.repository.faq.delete(id);
    return faq;
  };

  update: IFaqService["update"] = async (id, data) => {
    const validInput = this.validationUtility.validateInput({
      schema: UpdateDbFaqSchema,
      inputData: {
        ...data,
        id,
      },
    });

    const faq = await this.repository.faq.update(
      validInput.id,
      SkynedUtils.exclude(validInput, ["id"]),
    );

    return faq;
  };
}

/** Instance of {FaqService} */
export const faqService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.FAQ_SERVICE,
  () => FaqService.factory(),
);
