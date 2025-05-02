import { IInquiry } from "@workspace/shared";
import { IInquiryRepository } from "../../infrastructure";
import { IQueryConstruct } from "../utils";

/** Represents services of contact-us */
export interface IInquiryService {
  /** creates and inquiry in the database */
  create: IInquiryRepository["create"];

  /** count */
  count(query?: Partial<IQueryConstruct<IInquiry>>): Promise<number>;

  /** Find many */
  findMany(query?: Partial<IQueryConstruct<IInquiry>>): Promise<IInquiry[]>;

  /** findByID */
  findById: IInquiryRepository["findById"];

  /** Delete */
  delete: IInquiryRepository["delete"];
}
