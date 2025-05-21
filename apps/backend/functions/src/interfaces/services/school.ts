import {
  CreateSchoolSchema,
  IAdmin,
  IObject,
  ISchool,
} from "@workspace/shared";

export interface ISchoolService {
  findSchoolBySlug(slug: string): Promise<ISchool | null>;
  createSchool(
    initiator: IAdmin,
    data: Omit<CreateSchoolSchema, "logo" | "schoolImage"> & {
      logo: IObject;
      schoolImage: IObject;
    },
  ): Promise<ISchool>;
}
