import { Exception } from "../../lib";

export interface ILogger {
  log(data: Exception | string[]): void;
  error(error: Exception): void;
  info(data: Exception | string[]): void;
  warn(data: Exception | string[]): void;
}
