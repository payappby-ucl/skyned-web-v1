import {
  AuthClaim,
  CreateSchoolSchema,
  IAdmin,
  IObject,
  ISchool,
} from "@workspace/shared";
import { IQueryConstruct } from "..";

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
  count(): Promise<number>;

  /** Get schools */ listSchools(
    query: Partial<IQueryConstruct<IAdmin>>,
    authUser?: AuthClaim,
  ): Promise<ISchool[]>;

  /** Update a school */ updateSchool(
    schoolId: string,
    data: Partial<
      Omit<CreateSchoolSchema, "logo" | "schoolImage"> & {
        logo: IObject;
        schoolImage: IObject;
      }
    >,
  ): Promise<ISchool>;
}
