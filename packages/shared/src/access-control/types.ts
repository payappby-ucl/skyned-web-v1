import {
  BlogPostSchema,
  ContactUsSchema,
  CreateAccommodationSchema,
  CreateAdminSchema,
  CreateFaqSchema,
  CreateIntakeSchema,
  CreateProgramSchema,
  CreateSchoolSchema,
  ProgramSchema,
  UpdateAdminSchema,
  UpdateBlogPostSchema,
  UpdateBulkProgramSchema,
  UpdateSchoolSchema,
} from "../schemas";
import {
  IAccommodation,
  IAdmin,
  IBlogPost,
  IDepartment,
  IFaq,
  IInquiry,
  IIntake,
  IProgram,
  ISchool,
  ITeam,
} from "../interfaces";
import { AdminClaim, StudentClaim } from "./interfaces";

export type AuthClaim = AdminClaim | StudentClaim;

export type ResourceType =
  | "departments"
  | "teams"
  | "admins"
  | "faqs"
  | "inquiries"
  | "schools"
  | "accommodations"
  | "intakes"
  | "programs"
  | "blogs";

export type PermissionType = {
  admins: {
    dataType: IAdmin;
    createDataType: CreateAdminSchema;
    updateDataType: UpdateAdminSchema;
    action: "list" | "create" | "read" | "update" | "delete";
  };

  departments: {
    dataType: IDepartment;
    createDataType: "";
    updateDataType: "";
    action: "list" | "read" | "create" | "delete" | "update";
  };

  teams: {
    dataType: ITeam;
    createDataType: "";
    updateDataType: "";
    action: "create" | "read" | "update" | "delete";
  };

  faqs: {
    dataType: IFaq;
    createDataType: CreateFaqSchema;
    updateDataType: CreateFaqSchema;
    action: "list" | "create" | "read" | "update" | "delete";
  };

  inquiries: {
    dataType: IInquiry;
    createDataType: ContactUsSchema;
    updateDataType: "";
    action: "list" | "create" | "read" | "update" | "delete";
  };

  schools: {
    dataType: ISchool;
    createDataType: CreateSchoolSchema;
    updateDataType: UpdateSchoolSchema;
    action: "list" | "create" | "read" | "update" | "delete";
  };

  accommodations: {
    dataType: IAccommodation;
    createDataType: CreateAccommodationSchema;
    updateDataType: CreateAccommodationSchema;
    action: "list" | "create" | "read" | "update" | "delete";
  };

  intakes: {
    dataType: IIntake;
    createDataType: CreateIntakeSchema;
    updateDataType: CreateIntakeSchema;
    action: "list" | "create" | "read" | "update" | "delete";
  };

  programs: {
    dataType: IProgram;
    createDataType: CreateProgramSchema["data"];
    updateDataType: Partial<ProgramSchema> | UpdateBulkProgramSchema;
    action:
      | "list"
      | "create"
      | "read"
      | "update"
      | "delete"
      | "activate"
      | "deactivate";
  };

  blogs: {
    dataType: IBlogPost;
    createDataType: BlogPostSchema;
    updateDataType: UpdateBlogPostSchema;
    action: "list" | "create" | "read" | "update" | "delete";
  };
};

export type PermissionCheckSingleResource<Key extends keyof PermissionType> =
  | boolean
  | ((authClaim: AuthClaim, data: PermissionType[Key]["dataType"]) => boolean);

export type PermissionCheckListResource =
  | boolean
  | ((authClaim: AuthClaim) => boolean);

export type PermissionCheckCreateResource<Key extends keyof PermissionType> =
  | boolean
  | ((
      authClaim: AuthClaim,
      data: PermissionType[Key]["createDataType"],
    ) => boolean);

export type PermissionCheckUpdateResource<Key extends keyof PermissionType> =
  | boolean
  | ((
      authClaim: AuthClaim,
      data: PermissionType[Key]["updateDataType"],
      resource: PermissionType[Key]["dataType"],
    ) => boolean);

export type AccessControlType = Partial<{
  [Res in ResourceType]: {
    [Act in PermissionType[Res]["action"]]: Act extends "list"
      ? PermissionCheckListResource
      : Act extends "create"
        ? PermissionCheckCreateResource<Res>
        : Act extends "update"
          ? PermissionCheckUpdateResource<Res>
          : PermissionCheckSingleResource<Res>;
  };
}>;
