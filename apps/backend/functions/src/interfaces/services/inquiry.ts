import { IAdmin, IInquiry } from "@workspace/shared";
import { IInquiryRepository } from "../../infrastructure";
import { IQueryConstruct } from "../utils";

/** Represents services of contact-us */
export interface IInquiryService {
  /** creates and inquiry in the database */
  create: IInquiryRepository["create"];

  /** count */
  count(query?: Partial<IQueryConstruct<IInquiry>>): Promise<number>;

  /** Find many */
  findMany(
    initiator: IAdmin,
    query?: Partial<IQueryConstruct<IInquiry>>,
  ): Promise<IInquiry[]>;
}
