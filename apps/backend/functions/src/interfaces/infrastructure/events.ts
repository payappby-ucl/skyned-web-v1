import { EventsEnum } from "../../enum";
import { Exception } from "../../lib";
import { IMarketing } from "./marketing";

/** Represents input needed to create marketing contact for events */
export interface ICreateMarketingContactEvent {
  type: EventsEnum.CREATE_MARKETING_CONTACT_EVENT;
  data: Parameters<IMarketing["createContact"]>["0"];
}

/** Represents general input type for events */
export type EventTypes = ICreateMarketingContactEvent;

/** Represents Events */
export interface IEvents {
  emitEvent(data: EventTypes): void;
  createContactForMarketing(
    data: ICreateMarketingContactEvent["data"],
  ): Promise<{ contactId: number } | Exception>;
}
