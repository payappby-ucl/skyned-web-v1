import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(duration);
dayjs.extend(relativeTime);
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

  startOfDay: IDateService["startOfDay"] = (date) =>
    dayjs(date).startOf("D").toDate();

  endOfDay: IDateService["endOfDay"] = (date) =>
    dayjs(date).endOf("D").toDate();

  createDuration: IDateService["createDuration"] = (...props) =>
    dayjs.duration(...props);

  humanizeDuration: IDateService["humanizeDuration"] = (d) => {
    const totalMonths = Math.floor(d.asMonths());
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    const parts: string[] = [];
    if (years > 0) parts.push(`${years} year${years > 1 ? "s" : ""}`);
    if (months > 0) parts.push(`${months} month${months > 1 ? "s" : ""}`);

    return parts.length > 0 ? parts.join(" and ") : "0 months";
  };
}
