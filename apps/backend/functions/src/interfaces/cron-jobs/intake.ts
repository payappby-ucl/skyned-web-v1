/** Represents Intake Cron Job */
export interface IIntakeCronJobs {
  closeAllIntakesDueForClosure(): Promise<void>;
}
