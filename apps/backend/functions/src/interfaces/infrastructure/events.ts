import { EventsEnum } from "../../enum";
import { Exception } from "../../lib";
import { IActivityLogService, IEmailService } from "../services";
import { IMarketing } from "./marketing";

/** Represents input needed to create marketing contact for events */
export interface ICreateMarketingContactEvent {
  type: EventsEnum.CREATE_MARKETING_CONTACT_EVENT;
  data: Parameters<IMarketing["createContact"]>["0"];
}

/** Represents input needed to send email */
export interface ISendEmailEvent {
  type: EventsEnum.SEND_EMAIL_EVENT;
  data: Parameters<IEmailService["send"]>["0"];
}

/** Represents input needed to create activity log */
export interface ICreateActivityLog {
  type: EventsEnum.CREATE_ACTIVITY_LOG;
  data: Parameters<IActivityLogService["create"]>[0];
}

/** Represents general input type for events */
export type EventTypes =
  | ICreateMarketingContactEvent
  | ISendEmailEvent
  | ICreateActivityLog;

/** Represents Events */
export interface IEvents {
  emitEvent(data: EventTypes): void;
  createContactForMarketing(
    data: ICreateMarketingContactEvent["data"],
  ): Promise<{ contactId: number } | Exception>;

  sendMail(data: ISendEmailEvent["data"]): Promise<void>;

  createActivityLog(data: ICreateActivityLog["data"]): Promise<void>;
}
