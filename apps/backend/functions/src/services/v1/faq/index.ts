import { RegistryKeysEnum } from "../../../enum";
import { CreateDbFaqSchema, repository } from "../../../infrastructure";
import {
  IFaqService,
  IRepository,
  IValidationUtility,
} from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { validationUtility } from "../../../utils";

/** Represents dependencies needed to instantiate {FaqService} */
export interface IFaqServiceDependencies {
  /** Database */
  repository: IRepository;
  /** Schema validation utils */
  validationUtility: IValidationUtility;
}

/**
 * Concrete implementation of {IFaqService}
 * @class
 */

export class FaqService implements IFaqService {
  private static instance: IFaqService | null = null;

  private constructor(
    private readonly repository: IRepository,
    private readonly validationUtility: IValidationUtility,
  ) {}

  static factory({ repository, validationUtility }: IFaqServiceDependencies) {
    if (!FaqService.instance) {
      FaqService.instance = new FaqService(repository, validationUtility);
    }

    return FaqService.instance;
  }

  create: IFaqService["create"] = async (data) => {
    data = this.validationUtility.validateInput({
      schema: CreateDbFaqSchema,
      inputData: data,
    });

    const faq = await this.repository.faq.create(data);
    return faq;
  };
}

/** Instance of {FaqService} */
export const faqService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.FAQ_SERVICE,
  () =>
    FaqService.factory({
      repository,
      validationUtility,
    }),
);
