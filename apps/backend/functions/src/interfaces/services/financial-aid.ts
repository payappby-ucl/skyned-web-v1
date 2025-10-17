import {
  FinancialAidSchema,
  IFinancialAid,
  IObject,
  IPhoneNumber,
} from "@workspace/shared";
import { IQueryConstruct } from "../utils";

/** Represents FinancialAid Service */
export interface IFinancialAidService {
  create(
    data: Omit<
      FinancialAidSchema,
      | "bankStatement"
      | "transcript"
      | "proofOfAddress"
      | "identification"
      | "immigrationDocument"
      | "resume"
      | "nextSchoolTerm"
      | "phoneNumber"
    > & {
      bankStatement?: IObject;
      transcript: IObject;
      proofOfAddress: IObject;
      identification: IObject;
      immigrationDocument: IObject;
      resume: IObject;
      nextSchoolTerm: Date;
      financialAidId: string;
      phoneNumber: IPhoneNumber;
      programId: string;
    },
  ): Promise<IFinancialAid>;

  /** count */
  count(query?: Partial<IQueryConstruct<IFinancialAid>>): Promise<number>;

  /** Find many */
  findMany(
    query?: Partial<IQueryConstruct<IFinancialAid>>,
  ): Promise<IFinancialAid[]>;

  //   /** findByID */
  //   findById: IFaqRepository["findById"];
}
