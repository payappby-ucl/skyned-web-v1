/* eslint-disable max-len */
import { StatusCodes } from "http-status-codes";
import { env } from "../../../config";
import { RegistryKeysEnum } from "../../../enum";
import { marketing } from "../../../infrastructure";
import { IMarketing, INewsletterController } from "../../../interfaces";
import SkynedRegistry from "../../../registry";

/** Represents dependencies needed to instantiate {NewsletterController} */
export interface INewsletterControllerDependencies {
  marketing: IMarketing;
}

/**
 * Concrete implementation of {INewsletterController}
 * @class
 */

export class NewsletterController implements INewsletterController {
  private static instance: INewsletterController | null = null;

  private constructor(private readonly marketing: IMarketing) {}

  /** Creates concrete instance of {NewsletterController} */

  static factory({ marketing }: INewsletterControllerDependencies) {
    if (!NewsletterController.instance) {
      NewsletterController.instance = new NewsletterController(marketing);
    }
    return NewsletterController.instance;
  }

  subscribeToNewsletter: INewsletterController["subscribeToNewsletter"] =
    async (req, res, next) => {
      try {
        const { email } = req.body;
        const contact = await this.marketing.createContact({ email });
        await this.marketing.addContactToAudience({
          contactId: contact.contactId,
          audienceId: env.marketing.systemIo.subscriptionTagId,
        });

        res._success(StatusCodes.OK, {
          message: `${email} has been successfully subscribed to our newsletter.`,
        });
      } catch (error) {
        next(error);
      }
    };
}

/** Instance of {NewsletterController} */
export const newsletterController = SkynedRegistry.getSingleton(
  RegistryKeysEnum.NEWSLETTER_CONTROLLER,
  () =>
    NewsletterController.factory({
      marketing,
    }),
);
