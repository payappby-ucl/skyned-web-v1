/* eslint-disable max-len */

import dayjs from "dayjs";
import { RegistryKeysEnum } from "../enum";
import { IAnalyticsCronJobs, IAnalyticsService } from "../interfaces";
import SkynedRegistry from "../registry";
import { analyticsService } from "../services";

/** Dependencies needed to instantiate class */
export interface IAnalyticsCronJobsDependencies {
  /** Analytics service */
  analyticsService: IAnalyticsService;
}

/**
 * Concrete representation for IAnalyticsCronJob
 * @class
 */
export class AnalyticsCronJobs implements IAnalyticsCronJobs {
  private static instance: IAnalyticsCronJobs | null = null;

  private constructor(private readonly analyticsService: IAnalyticsService) {}

  static factory({ analyticsService }: IAnalyticsCronJobsDependencies) {
    if (!AnalyticsCronJobs.instance) {
      AnalyticsCronJobs.instance = new AnalyticsCronJobs(analyticsService);
    }
    return AnalyticsCronJobs.instance;
  }

  computeKPIs: IAnalyticsCronJobs["computeKPIs"] = async () => {
    const date = dayjs().subtract(1, "d").toDate();
    await this.analyticsService.computeKpis(date);
  };
}

/** concrete instance of {AnalyticsCronJobs} */
export const analyticsCronJobs = SkynedRegistry.getSingleton(
  RegistryKeysEnum.BLOG_POST_CRON_JOB,
  () =>
    AnalyticsCronJobs.factory({
      analyticsService,
    }),
);
