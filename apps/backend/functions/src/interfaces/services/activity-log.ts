import { IActivityLogRepository } from "../../infrastructure/repository";

export interface IActivityLogService {
  create: IActivityLogRepository["create"];
}
