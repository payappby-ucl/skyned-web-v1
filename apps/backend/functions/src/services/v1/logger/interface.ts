import { Exception } from "../../../lib";

export interface ILoggerService {
  log(data: Exception): void;
  error(error: Exception): void;
  info(data: Exception): void;
  warn(data: Exception): void;
}
