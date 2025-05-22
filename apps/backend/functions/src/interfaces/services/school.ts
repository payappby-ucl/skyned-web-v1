import {
  AuthClaim,
  CreateSchoolSchema,
  IAdmin,
  IObject,
  ISchool,
} from "@workspace/shared";
import { IQueryConstruct } from "..";

export interface ISchoolService {
  findSchoolBySlug(slug: string, authUser?: AuthClaim): Promise<ISchool | null>;
  findSchoolBySchoolId(
    schoolId: string,
    authUser?: AuthClaim,
  ): Promise<ISchool | null>;
  createSchool(
    initiator: IAdmin,
    data: Omit<CreateSchoolSchema, "logo" | "schoolImage"> & {
      logo: IObject;
      schoolImage: IObject;
      schoolId: string;
    },
  ): Promise<ISchool>;

  count(): Promise<number>;

  listSchools(
    query: Partial<IQueryConstruct<IAdmin>>,
    authUser?: AuthClaim,
  ): Promise<ISchool[]>;

  updateSchool(
    schoolId: string,
    data: Partial<
      Omit<CreateSchoolSchema, "logo" | "schoolImage"> & {
        logo: IObject;
        schoolImage: IObject;
      }
    >,
  ): Promise<ISchool>;
}
