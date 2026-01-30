import { CloudEvent } from "firebase-functions";
import { MessagePublishedData } from "firebase-functions/v2/pubsub";
import { EventTypes } from "../interfaces";
import { EventsEnum } from "../enum";

export interface ISubscriber {
  sendMail(
    event: CloudEvent<
      MessagePublishedData<
        Extract<EventTypes, { type: EventsEnum.SEND_EMAIL_EVENT }>["data"]
      >
    >,
  ): Promise<void>;
  createContactForMarketing(
    event: CloudEvent<
      MessagePublishedData<
        Extract<
          EventTypes,
          { type: EventsEnum.CREATE_MARKETING_CONTACT_EVENT }
        >["data"]
      >
    >,
  ): Promise<void>;
  createActivityLog(
    event: CloudEvent<
      MessagePublishedData<
        Extract<EventTypes, { type: EventsEnum.CREATE_ACTIVITY_LOG }>["data"]
      >
    >,
  ): Promise<void>;
}
