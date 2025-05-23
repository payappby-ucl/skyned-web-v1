import {
  CreateAccommodationSchema,
  IAccommodation,
  ISchool,
} from "@workspace/shared";
import { IQueryConstruct } from "..";

/** Represents Accommodation Service */
export interface IAccommodationService {
  /** Counts Accommodation */
  count(): Promise<number>;

  /** Gets list of accommodations */
  getAccommodations(query?: Partial<IQueryConstruct<IAccommodation>>): Promise<
    (Pick<IAccommodation, "description"> & {
      school: Pick<
        ISchool,
        "name" | "country" | "state" | "slug" | "logo" | "schoolImage"
      >;
    })[]
  >;

  /** Creates an accommodation */
  createAccommodation(
    adminId: string,
    schoolId: string,
    data: CreateAccommodationSchema,
  ): Promise<IAccommodation>;

  /** Delete accommodation */
  deleteAccommodation(accommodationId: number): Promise<IAccommodation>;

  /** Find by id */
  findAccommodationById(id: number): Promise<IAccommodation | null>;
}
