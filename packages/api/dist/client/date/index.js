"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateService = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const duration_1 = __importDefault(require("dayjs/plugin/duration"));
const relativeTime_1 = __importDefault(require("dayjs/plugin/relativeTime"));
dayjs_1.default.extend(duration_1.default);
dayjs_1.default.extend(relativeTime_1.default);
const lib_1 = require("../../lib");
__exportStar(require("./interface"), exports);
class DateService {
    formatDate = (date, format = lib_1.dateFormats.dateAndTime) => {
        return (0, dayjs_1.default)(date).format(format);
    };
    difference = ({ date, prevDate, unit }) => {
        return (0, dayjs_1.default)(date || undefined).diff(prevDate || unit, unit || "days");
    };
    startOfDay = (date) => (0, dayjs_1.default)(date).startOf("D").toDate();
    endOfDay = (date) => (0, dayjs_1.default)(date).endOf("D").toDate();
    createDuration = (...props) => dayjs_1.default.duration(...props);
    humanizeDuration = (d) => {
        const totalMonths = Math.floor(d.asMonths());
        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;
        const parts = [];
        if (years > 0)
            parts.push(`${years} year${years > 1 ? "s" : ""}`);
        if (months > 0)
            parts.push(`${months} month${months > 1 ? "s" : ""}`);
        return parts.length > 0 ? parts.join(" and ") : "0 months";
    };
    isAfter = (first, second) => (0, dayjs_1.default)(first).isAfter(second);
    isBefore = (first, second) => (0, dayjs_1.default)(first).isBefore(second);
    isEqual = (first, second) => (0, dayjs_1.default)(first).isSame(second);
}
exports.DateService = DateService;
