import { IObject, IPhoneNumber, ITimestamps } from "./utils";

export interface IFinancialAid extends ITimestamps {
  id: number;
  financialAidId: string;

  citizenship: string;
  canadianResident: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: IPhoneNumber;
  schoolSlug: string;
  programSlug: string;
  studyLevel: string;
  pgwp: string;
  hasOfferLetter: string;
  loanType: string;
  livingExpensesCoverage?: string;
  programStarted: string;
  gpa: number;
  nextSchoolTerm: Date;
  partner: string;
  proofOfAddress: IObject;
  identification: IObject;
  resume: IObject;
  transcript: IObject;
  bankStatement?: IObject;
  immigrationDocument: IObject;
}
