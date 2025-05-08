import { IDateService } from "./interface";
export * from "./interface";
export declare class DateService implements IDateService {
    formatDate: IDateService["formatDate"];
    difference: IDateService["difference"];
}
