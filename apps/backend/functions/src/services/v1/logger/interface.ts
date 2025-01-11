import { Exception } from "../../../lib";

export interface ILoggerService {
  log(data: Exception | string[]): void;
  error(error: Exception): void;
  info(data: Exception | string[]): void;
  warn(data: Exception | string[]): void;
}
