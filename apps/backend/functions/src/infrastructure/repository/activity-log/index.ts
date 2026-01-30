/* eslint-disable operator-linebreak */
/* eslint-disable brace-style */

import { IRepository } from "../../../interfaces";
import { SkynedUtils } from "../../../utils";
import { JsonObject } from "../prisma-client/runtime/library";
import { DBUtils } from "../utils";
import { IActivityLogRepository } from "./interface";

export * from "./interface";

/**
 * Concrete implementetation of {IActivityLogRepository}
 *
 * @class
 */

export class ActivityLogRepository
  extends DBUtils
  implements IActivityLogRepository
{
  constructor(private readonly db: IRepository["db"]) {
    super();
  }

  /** Creates a log */

  create: IActivityLogRepository["create"] = async (data) => {
    const log = await this.db.activityLog.create({
      data: {
        ...SkynedUtils.exclude(data, ["currentState", "previousState"]),

        currentState: data.currentState
          ? (data.currentState as unknown as JsonObject)
          : undefined,

        previousState: data.previousState
          ? (data.previousState as unknown as JsonObject)
          : undefined,
      },
    });

    return this.deserialize(log);
  };
}
