import { IDateService } from "./interface";
export * from "./interface";
export declare class DateService implements IDateService {
    formatDate: IDateService["formatDate"];
    difference: IDateService["difference"];
    startOfDay: IDateService["startOfDay"];
    endOfDay: IDateService["endOfDay"];
    createDuration: IDateService["createDuration"];
    humanizeDuration: IDateService["humanizeDuration"];
    isAfter: IDateService["isAfter"];
    isBefore: IDateService["isBefore"];
    isEqual: IDateService["isEqual"];
}
