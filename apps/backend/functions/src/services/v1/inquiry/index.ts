/* eslint-disable max-len */

import { RegistryKeysEnum } from "../../../enum";
import { CreateContactUsSchema, repository } from "../../../infrastructure";
import {
  IInquiryService,
  IRepository,
  IValidationUtility,
} from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { validationUtility } from "../../../utils";

/** Represents dependencies needed to instantiate IInquiryService concrete class */
export interface InquiryServiceDependencies {
  /** Database object */
  repository: IRepository;
  /** Validation object */
  validationUtility: IValidationUtility;
}

/** Concrete implementation of IInquiryService */

export class InquiryService implements IInquiryService {
  private static instance: IInquiryService | null = null;

  private constructor(
    private readonly repository: IRepository,
    private readonly validationUtility: IValidationUtility,
  ) {
    // * Private
  }

  /** Creates a instance of IInquiryService */

  static factory({
    repository,
    validationUtility,
  }: InquiryServiceDependencies) {
    if (!InquiryService.instance) {
      InquiryService.instance = new InquiryService(
        repository,
        validationUtility,
      );
    }

    return InquiryService.instance;
  }

  create: IInquiryService["create"] = async (data) => {
    this.validationUtility.validateInput({
      schema: CreateContactUsSchema,
      inputData: data,
    });

    const res = await this.repository.inquiry.create(data);
    return res;
  };
}

/** instance of InquiryService */
export const inquiryService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.INQUIRY_SERVICE,
  () =>
    InquiryService.factory({
      repository,
      validationUtility,
    }),
);
