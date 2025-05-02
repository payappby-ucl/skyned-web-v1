import { IFaqRepository } from "../../infrastructure";

/** Represents FAQ Service */
export interface IFaqService {
  create: IFaqRepository["create"];
}
