import { ContactUsSchema, IInquiry, IPhoneNumber } from "@workspace/shared";
import { Prisma } from "../prisma-client";

/** Represents all calls to the inquiries table in db */
export interface IInquiryRepository {
  /** creates an inquiry in the database */
  create(
    data: Omit<ContactUsSchema, "phoneNumber"> & {
      phoneNumber: IPhoneNumber;
    },
  ): Promise<IInquiry>;

  /** Gets inquiries */
  findMany(query?: Prisma.InquiryFindManyArgs): Promise<IInquiry[]>;

  /** Count */
  count(query?: Prisma.InquiryCountArgs): Promise<number>;
}
