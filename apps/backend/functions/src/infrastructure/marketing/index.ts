import axios from "axios";
import { RegistryKeysEnum } from "../../enum";
import { IMarketing, IValidationUtility } from "../../interfaces";
import SkynedRegistry from "../../registry";
import { env } from "../../config";
import { AddContactToAudienceInputSchema } from "./schema";
import { validationUtility } from "../../utils";

interface MarketingDependencies {
  validationUtility: IValidationUtility;
}

/**
 * Concrete implementation for {@link IMarketing} using System io (https://systeme.io/home)
 *
 * @class
 */
export class Marketing implements IMarketing {
  private static instance: IMarketing | null = null;
  private client = axios.create({
    baseURL: "https://api.systeme.io/api",
    headers: {
      "X-API-Key": env.marketing.systemIo.apiKey,
    },
  });
  private constructor(private readonly validationUtility: IValidationUtility) {
    // * Private
  }

  static factory({ validationUtility }: MarketingDependencies) {
    if (!Marketing.instance) {
      Marketing.instance = new Marketing(validationUtility);
    }

    return Marketing.instance;
  }

  /** Creates a contact on the system io dashboard for marketing/campaigns */
  createContact: IMarketing["createContact"] = async () => {};

  /** Adds a contact to a specific audience for marketing */

  addContactToAudience: IMarketing["addContactToAudience"] = async (data) => {
    const inputData = this.validationUtility.validateInput({
      schema: AddContactToAudienceInputSchema,
      inputData: data,
      errorType: "server",
      message: "Invalid input data for add contact to audience",
    });

    if (typeof inputData.audienceId === "string") {
      inputData.audienceId = parseInt(inputData.audienceId);
    }

    await this.client.post(`/contacts/${inputData.contactId}/tags`, {
      tagId: inputData.audienceId,
    });
  };
}

/** Instance of concrete Marketing implementation */
export const marketing = SkynedRegistry.getSingleton(
  RegistryKeysEnum.MARKETING,
  () =>
    Marketing.factory({
      validationUtility,
    }),
);
