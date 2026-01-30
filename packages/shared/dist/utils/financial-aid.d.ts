import { FinancialAidSchema } from "../schemas";
import { IProgram } from "../interfaces";
export declare const computeFinancialAidEligibility: (program: IProgram, data: FinancialAidSchema) => {
    isEligible: boolean;
    message: string;
} | {
    isEligible: boolean;
    partners: ("mpower" | "passage")[];
    recommendation: "passage" | null;
};
