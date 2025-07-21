/** Represents analytics cronjobs */
export interface IAnalyticsCronJobs {
  computeKPIs(): Promise<void>;
}
