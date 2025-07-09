import { ScheduledEvent } from "firebase-functions/v2/scheduler";

export * from "./blog-post";
export * from "./intake";

export interface ISkynedCronJobs {
  midNightCronJobs(event: ScheduledEvent): void | Promise<void>;
}
