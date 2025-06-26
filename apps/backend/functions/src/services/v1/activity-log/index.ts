/* eslint-disable brace-style */
/* eslint-disable max-len */
import { ServiceUtils } from "../utils";
import { RegistryKeysEnum } from "../../../enum";
import { IActivityLogService } from "../../../interfaces";
import SkynedRegistry from "../../../registry";

export class ActivityLogService
  extends ServiceUtils
  implements IActivityLogService
{
  private static instance: IActivityLogService | null = null;

  private constructor() {
    super();
  }

  static factory() {
    if (!ActivityLogService.instance) {
      ActivityLogService.instance = new ActivityLogService();
    }

    return ActivityLogService.instance;
  }

  create: IActivityLogService["create"] = async (data) =>
    await this.repository.activityLog.create(data);
}

/** Concrete instance */
export const activityLogService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.ACTIVITY_LOG_SERVICE,
  () => ActivityLogService.factory(),
);
