import { IRepository } from "../../../interfaces";
import { IAccommodationRepository } from "./interface";

export * from "./interface";

/** Concrete implementation of {IAccommodationRepository} */

export class AccommodationRepository implements IAccommodationRepository {
  constructor(private readonly db: IRepository["db"]) {}

  upsert: IAccommodationRepository["upsert"] = (options) =>
    this.db.accommodation.upsert(options);

  findUnique: IAccommodationRepository["findUnique"] = (options) =>
    this.db.accommodation.findUnique(options);

  findMany: IAccommodationRepository["findMany"] = (options) =>
    this.db.accommodation.findMany(options);

  count: IAccommodationRepository["count"] = (options) =>
    this.db.accommodation.count(options);

  delete: IAccommodationRepository["delete"] = (options) =>
    this.db.accommodation.delete(options);
}
