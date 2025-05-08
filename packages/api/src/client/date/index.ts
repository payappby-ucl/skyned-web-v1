import dayjs from "dayjs";
import { dateFormats } from "../../lib";
import { IDateService } from "./interface";

export * from "./interface";
export class DateService implements IDateService {
  formatDate: IDateService["formatDate"] = (
    date,
    format = dateFormats.dateAndTime,
  ) => {
    return dayjs(date).format(format);
  };

  difference: IDateService["difference"] = ({ date, prevDate, unit }) => {
    return dayjs(date || undefined).diff(prevDate || unit, unit || "days");
  };
}
