import { AdminProfile } from "./admin";
import { ITimestamps } from "./utils";

export interface IFaq extends ITimestamps {
  id: number;
  question: string;
  answer: string;
  createdById: string;
  createdBy?: AdminProfile;
}
