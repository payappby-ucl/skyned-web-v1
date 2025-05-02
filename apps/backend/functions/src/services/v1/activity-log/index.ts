/* eslint-disable max-len */
import { RegistryKeysEnum } from "../../../enum";
import { repository } from "../../../infrastructure";
import { IActivityLogService, IRepository } from "../../../interfaces";
import SkynedRegistry from "../../../registry";

/** Abstract representation of dependencies needed to instantiate {ActivityLogService} */
export interface ActivityLogServiceDependencies {
  /** Database object */
  repository: IRepository;
}
export class ActivityLogService implements IActivityLogService {
  private static instance: IActivityLogService | null = null;

  private constructor(private repository: IRepository) {}
  static factory({ repository }: ActivityLogServiceDependencies) {
    if (!ActivityLogService.instance) {
      ActivityLogService.instance = new ActivityLogService(repository);
    }

    return ActivityLogService.instance;
  }

  create: IActivityLogService["create"] = async (data) =>
    await this.repository.activityLog.create(data);
}

/** Concrete instance */
export const activityLogService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.ACTIVITY_LOG_SERVICE,
  () =>
    ActivityLogService.factory({
      repository,
    }),
);
