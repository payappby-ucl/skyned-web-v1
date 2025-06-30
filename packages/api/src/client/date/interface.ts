import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

export interface IDateService {
  formatDate(date: Date, format?: string): string;
  difference(input: {
    date?: dayjs.ConfigType;
    prevDate?: dayjs.ConfigType;
    unit?: dayjs.QUnitType | dayjs.OpUnitType;
  }): number;

  startOfDay(date: Date): Date;
  endOfDay(date: Date): Date;

  createDuration(
    time: number,
    unit?: duration.DurationUnitType,
  ): duration.Duration;

  humanizeDuration(duration: duration.Duration): string;
  isAfter(first: Date, second: Date): boolean;
  isBefore(first: Date, second: Date): boolean;
  isEqual(first: Date, second: Date): boolean;
}
