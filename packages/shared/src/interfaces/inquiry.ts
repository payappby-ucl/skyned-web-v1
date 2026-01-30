import { IPhoneNumber, ITimestamps } from "./utils";

export interface IInquiry extends ITimestamps {
  id: number;
  name: string;
  email: string;
  message: string;
  subject: string;
  phoneNumber: IPhoneNumber;
}
