import { IRepository } from "../../../interfaces";
import { IIntakeRepository } from "./interface";

export * from "./interface";

/** Concrete implementation of {IIntakeRepository} */

export class IntakeRepository implements IIntakeRepository {
  constructor(private readonly db: IRepository["db"]) {}

  create: IIntakeRepository["create"] = (options) =>
    this.db.intake.create(options);

  createMany: IIntakeRepository["createMany"] = (options) =>
    this.db.intake.createMany(options);

  findUnique: IIntakeRepository["findUnique"] = (options) =>
    this.db.intake.findUnique(options);

  findMany: IIntakeRepository["findMany"] = (options) =>
    this.db.intake.findMany(options);

  update: IIntakeRepository["update"] = (options) =>
    this.db.intake.update(options);

  delete: IIntakeRepository["delete"] = (options) =>
    this.db.intake.delete(options);

  count: IIntakeRepository["count"] = (options) =>
    this.db.intake.count(options);
}
