/* eslint-disable max-len */

import { RegistryKeysEnum } from "../enum";
import { IIntakeCronJobs, IIntakeService } from "../interfaces";
import SkynedRegistry from "../registry";
import { intakeService } from "../services";

/** Dependencies needed to instantiate class */
export interface IIntakeCronJobsDependencies {
  /** Intake service */
  intakeService: IIntakeService;
}

/**
 * Concrete representation for IIntakeCronJob
 * @class
 */
export class IntakeCronJobs implements IIntakeCronJobs {
  private static instance: IIntakeCronJobs | null = null;

  private constructor(private readonly intakeService: IIntakeService) {}

  static factory({ intakeService }: IIntakeCronJobsDependencies) {
    if (!IntakeCronJobs.instance) {
      IntakeCronJobs.instance = new IntakeCronJobs(intakeService);
    }
    return IntakeCronJobs.instance;
  }

  closeAllIntakesDueForClosure: IIntakeCronJobs["closeAllIntakesDueForClosure"] =
    async () => {
      const intakes = await this.intakeService.findAllIntakesDueForClosure();
      if (intakes.length) {
        await this.intakeService.closeIntakes(
          intakes.map((intake) => intake.id),
        );
      }
    };
}

/** concrete instance of {IntakeCronJobs} */
export const intakeCronJobs = SkynedRegistry.getSingleton(
  RegistryKeysEnum.INTAKE_CRON_JOB,
  () =>
    IntakeCronJobs.factory({
      intakeService,
    }),
);
