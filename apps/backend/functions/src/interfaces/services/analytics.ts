/** Represents Analytics Service */
export interface IAnalyticsService {
  /** Runs KPI Computation */
  computeKpis(dateToComputeFor?: Date): Promise<void>;
}
