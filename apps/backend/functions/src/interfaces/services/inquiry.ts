import { IInquiryRepository } from "../../infrastructure";

/** Represents services of contact-us */
export interface IInquiryService {
  /** creates and inquiry in the database */
  create: IInquiryRepository["create"];
}
