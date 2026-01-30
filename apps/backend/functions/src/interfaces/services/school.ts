import {
  AuthClaim,
  CreateSchoolSchema,
  IAdmin,
  IObject,
  ISchool,
} from "@workspace/shared";
import { IQueryConstruct } from "..";
import { SchoolQuerySchema } from "../../zod-schemas";

/** Represents school service */
export interface ISchoolService {
  /** Finds a school by it's slug */
  findSchoolBySlug(slug: string, authUser?: AuthClaim): Promise<ISchool | null>;

  /** Finds a school by it's schoolId */
  findSchoolBySchoolId(
    schoolId: string,
    authUser?: AuthClaim,
  ): Promise<ISchool | null>;

  /** Creates a school */
  createSchool(
    initiator: IAdmin,
    data: Omit<CreateSchoolSchema, "logo" | "schoolImage"> & {
      logo: IObject;
      schoolImage: IObject;
      schoolId: string;
    },
  ): Promise<ISchool>;

  /** Counts a school */
  count(
    query: Partial<IQueryConstruct<SchoolQuerySchema>>,
    authUser?: AuthClaim,
  ): Promise<number>;

  /** Get schools */
  listSchools(
    query: Partial<IQueryConstruct<SchoolQuerySchema>>,
    authUser?: AuthClaim,
  ): Promise<ISchool[]>;

  /** Update a school */
  updateSchool(
    schoolId: string,
    data: Partial<
      Omit<CreateSchoolSchema, "logo" | "schoolImage"> & {
        logo: IObject;
        schoolImage: IObject;
        active: boolean;
      }
    >,
  ): Promise<ISchool>;
}
