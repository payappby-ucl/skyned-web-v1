import { EventTypes } from "../interfaces";

/** Represent Publisher */
export interface IPublisher {
  /** Publishes an event */
  publish(event: EventTypes): Promise<void>;
}
