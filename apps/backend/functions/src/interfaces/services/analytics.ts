import { AuthClaim, IKPI, ITrends } from "@workspace/shared";

/** Represents Analytics Service */
export interface IAnalyticsService {
  /** Runs KPI Computation */
  computeKpis(dateToComputeFor?: Date): Promise<void>;

  /** Get KPIs for admin */
  getAdminKPIs(
    authUser: AuthClaim,
  ): Promise<(Partial<Omit<IKPI, "id" | "date">> & { date: Date }) | null>;

  /** Get Trends */
  getAdminTrends(
    type: "days" | "months" | "years",
    from: Date,
    to: Date,
    authUser: AuthClaim,
  ): Promise<ITrends[]>;
}
