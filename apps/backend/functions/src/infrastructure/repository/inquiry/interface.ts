import { ContactUsSchema, IInquiry, IPhoneNumber } from "@workspace/shared";

/** Represents all calls to the inquiries table in db */
export interface IInquiryRepository {
  /** creates an inquiry in the database */
  create(
    data: Omit<ContactUsSchema, "phoneNumber"> & {
      phoneNumber: IPhoneNumber;
    },
  ): Promise<IInquiry>;
}
