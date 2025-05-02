/* eslint-disable brace-style */
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
import { ControllerUtils } from "../utils";

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

export class ContactController
  extends ControllerUtils
  implements IContactController
{
  private static instance: IContactController | null = null;
  private constructor(
    private readonly event: IEvents,
    private readonly inquiryService: IInquiryService,
    private readonly phoneNumberService: IPhoneNumberService,
  ) {
    super();
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

  getContactUsMessages: IContactController["getContactUsMessages"] = async (
    req,
    res,
    next,
  ) => {
    try {
      const authUser = this._validateAdmin(req);

      this._attributeBasedAccessControl(authUser, "inquiries", "list");

      const { limit, page, from, to } = req.query;

      const construct = this._constructPaginationData({
        limit,
        page,
      });

      const total = await this.inquiryService.count({
        from,
        to,
      });

      const inquiries = await this.inquiryService.findMany({
        ...SkynedUtils.pick(construct, ["skip", "take"]),
        from,
        to,
      });

      res._success(StatusCodes.OK, {
        ...SkynedUtils.exclude(construct, ["skip", "take"]),
        data: inquiries,
        total,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteContactUsMessage: IContactController["deleteContactUsMessage"] = async (
    req,
    res,
    next,
  ) => {
    try {
      const authUser = this._validateAdmin(req);

      const { id } = req.params;
      const inquiry = await this.inquiryService.findById(id);

      if (!inquiry) {
        throw SkynedUtils.createException(
          StatusCodes.NOT_FOUND,
          "The resource you're trying to delete does not exist.",
        );
      }

      this._attributeBasedAccessControl(
        authUser,
        "inquiries",
        "delete",
        inquiry,
      );

      await this.inquiryService.delete(inquiry.id);

      this.event.emitEvent({
        type: EventsEnum.CREATE_ACTIVITY_LOG,
        data: {
          resource: "inquiries",
          resourceId: inquiry.id,
          action: "delete",
          previousState: inquiry,
          adminId: authUser.user.id,
        },
      });

      res._success(StatusCodes.OK, {
        message: "Resource Deleted",
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
