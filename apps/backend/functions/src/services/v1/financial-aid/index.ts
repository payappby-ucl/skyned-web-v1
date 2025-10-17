/* eslint-disable operator-linebreak */
/* eslint-disable brace-style */
import { RegistryKeysEnum } from "../../../enum";
import { IFinancialAidService } from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { SkynedUtils } from "../../../utils";
import { ServiceUtils } from "../utils";

/** Concrete implementation of IFinancialAidService */

export class FinancialAidService
  extends ServiceUtils
  implements IFinancialAidService
{
  private static instance: IFinancialAidService | null = null;
  private constructor() {
    super();
  }

  static factory() {
    if (!FinancialAidService.instance) {
      FinancialAidService.instance = new FinancialAidService();
    }

    return FinancialAidService.instance;
  }

  private _constructQuery(
    query: Parameters<IFinancialAidService["findMany"]>["0"],
  ) {
    let queryArgs: Parameters<
      typeof this.repository.db.financialAid.findMany
    >["0"] = {};

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

  create: IFinancialAidService["create"] = async (data) => {
    const financialAid = await this.repository.db.financialAid.create({
      data: {
        ...data,
        phoneNumber: {
          ...data.phoneNumber,
        },
        transcript: {
          ...data.transcript,
        },
        resume: {
          ...data.resume,
        },
        proofOfAddress: {
          ...data.proofOfAddress,
        },
        identification: {
          ...data.identification,
        },
        immigrationDocument: {
          ...data.immigrationDocument,
        },
        bankStatement: data.bankStatement
          ? {
              ...data.bankStatement,
            }
          : undefined,
      },
    });

    return this.deserialize(financialAid);
  };

  count: IFinancialAidService["count"] = async (query) => {
    const queryArgs = this._constructQuery(query);
    const count = await this.repository.db.financialAid.count(
      queryArgs?.where
        ? {
            where: queryArgs.where,
          }
        : undefined,
    );

    return count;
  };

  findMany: IFinancialAidService["findMany"] = async (query) => {
    const queryArgs = this._constructQuery(query);

    const financialAids =
      await this.repository.db.financialAid.findMany(queryArgs);

    return financialAids.map((financialAid) => this.deserialize(financialAid));
  };
}

/** Concrete instance of FinancialAidService */
export const financialAidService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.FINANCIAL_AID_SERVICE,
  () => FinancialAidService.factory(),
);
