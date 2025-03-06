import { IEmail } from "../../../infrastructure";

// * Templates
interface IVerifyEmail {
  type: "verify";
  data: {
    tokenId: string;
  };
}

type TemplateDataType = IVerifyEmail;
// * Service
export interface IEmailService {
  send(
    data: Omit<Parameters<IEmail["send"]>["0"], "html"> & {
      template: TemplateDataType;
    },
  ): Promise<void>;
}
