import { IRepository } from "../../../interfaces";
import { DBUtils } from "../utils";
import { ISchoolRepository } from "./interface";

export * from "./interface";
export class SchoolRepository extends DBUtils implements ISchoolRepository {
  constructor(private readonly db: IRepository["db"]) {
    super();
  }

  create: ISchoolRepository["create"] = (options) =>
    this.db.school.create(options);

  findUnique: ISchoolRepository["findUnique"] = (options) =>
    this.db.school.findUnique(options);

  findMany: ISchoolRepository["findMany"] = (options) =>
    this.db.school.findMany(options);

  count: ISchoolRepository["count"] = (options) =>
    this.db.school.count(options);

  update: ISchoolRepository["update"] = (options) =>
    this.db.school.update(options);
}
