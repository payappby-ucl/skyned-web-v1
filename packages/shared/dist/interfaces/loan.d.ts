import { ITimestamps } from "./utils";
export interface ILoan extends ITimestamps {
    id: number;
    loanId: string;
    email: string;
    firstName: string;
    lastName: string;
}
