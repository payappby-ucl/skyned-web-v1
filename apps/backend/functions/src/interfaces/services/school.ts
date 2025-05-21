import {
  CreateSchoolSchema,
  IAdmin,
  IObject,
  ISchool,
} from "@workspace/shared";
import { IQueryConstruct } from "..";

export interface ISchoolService {
  findSchoolBySlug(slug: string): Promise<ISchool | null>;
  createSchool(
    initiator: IAdmin,
    data: Omit<CreateSchoolSchema, "logo" | "schoolImage"> & {
      logo: IObject;
      schoolImage: IObject;
    },
  ): Promise<ISchool>;

  count(): Promise<number>;

  listSchools(query: Partial<IQueryConstruct<IAdmin>>): Promise<ISchool[]>;
}
