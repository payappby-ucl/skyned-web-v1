/* eslint-disable max-len */
import { StatusCodes } from "http-status-codes";
import { EventsEnum, RegistryKeysEnum } from "../../../enum";
import {
  IContactController,
  IEvents,
  IInquiryService,
  IPhoneNumberService,
} from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { inquiryService, phoneNumberService } from "../../../services";
import { env } from "../../../config";
import { events } from "../../../infrastructure";
import { SkynedUtils } from "../../../utils";

/** Required dependencies to create ContactController instance */
export interface ContactControllerDependencies {
  phoneNumberService: IPhoneNumberService;
  inquiryService: IInquiryService;
  event: IEvents;
}

/**
 * Concrete implementation for Contact us controller
 *
 * @class
 */

export class ContactController implements IContactController {
  private static instance: IContactController | null = null;
  private constructor(
    private readonly event: IEvents,
    private readonly inquiryService: IInquiryService,
    private readonly phoneNumberService: IPhoneNumberService,
  ) {
    // * Private
  }

  /**
   * Creates the ContactController instance
   */

  static factory({
    event,
    inquiryService,
    phoneNumberService,
  }: ContactControllerDependencies) {
    if (!ContactController.instance) {
      ContactController.instance = new ContactController(
        event,
        inquiryService,
        phoneNumberService,
      );
    }

    return ContactController.instance;
  }

  createAndSendContactMessage: IContactController["createAndSendContactMessage"] =
    async (req, res, next) => {
      try {
        const { phoneNumber, ...rest } = req.body;

        const formattedPhoneNumber =
          this.phoneNumberService.formatPhoneNumber(phoneNumber);

        const data = await this.inquiryService.create({
          ...rest,
          phoneNumber: formattedPhoneNumber,
        });

        // * Emit Send mail
        this.event.emitEvent({
          type: EventsEnum.SEND_EMAIL_EVENT,
          data: {
            from: {
              email: env.emails.info,
            },
            to: [env.emails.info],
            subject: data.subject,
            template: {
              type: "contact-us",
              data: SkynedUtils.pick(data, [
                "email",
                "message",
                "name",
                "phoneNumber",
                "subject",
              ]),
            },
          },
        });

        res._success(StatusCodes.OK, {
          message:
            "Your message have been received, we'll respond to you soon.",
        });
      } catch (error) {
        next(error);
      }
    };
}

/** ContactController instance */
export const contactController = SkynedRegistry.getSingleton(
  RegistryKeysEnum.CONTACT_CONTROLLER,
  () =>
    ContactController.factory({
      event: events,
      inquiryService,
      phoneNumberService,
    }),
);
