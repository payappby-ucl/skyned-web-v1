import dayjs from "dayjs";

export interface IDateService {
  formatDate(date: Date, format?: string): string;
  difference(input: {
    date?: dayjs.ConfigType;
    prevDate?: dayjs.ConfigType;
    unit?: dayjs.QUnitType | dayjs.OpUnitType;
  }): number;

  startOfDay(date: Date): Date;
  endOfDay(date: Date): Date;
}
