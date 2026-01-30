import { IFaq } from "@workspace/shared";
import { IFaqRepository } from "../../infrastructure";
import { IQueryConstruct } from "../utils";

/** Represents FAQ Service */
export interface IFaqService {
  create: IFaqRepository["create"];

  /** count */
  count(query?: Partial<IQueryConstruct<IFaq>>): Promise<number>;

  /** Find many */
  findMany(query?: Partial<IQueryConstruct<IFaq>>): Promise<IFaq[]>;

  /** findByID */
  findById: IFaqRepository["findById"];

  /** Delete */
  delete: IFaqRepository["delete"];

  /** Update */
  update: IFaqRepository["update"];
}
