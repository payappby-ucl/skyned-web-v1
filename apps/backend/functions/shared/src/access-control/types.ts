import { ContactUsSchema, CreateFaqSchema } from "../schemas";
import { IAdmin, IDepartment, IFaq, IInquiry, ITeam } from "../interfaces";
import { AdminClaim, StudentClaim } from "./interfaces";

export type AuthClaim = AdminClaim | StudentClaim;

export type ResourceType =
  | "departments"
  | "teams"
  | "admins"
  | "faqs"
  | "inquiries";

export type PermissionType = {
  admins: {
    dataType: IAdmin;
    createDataType: "";
    action: "list" | "create" | "read" | "update" | "delete";
  };

  departments: {
    dataType: IDepartment;
    createDataType: "";
    action: "list" | "read" | "create";
  };

  teams: {
    dataType: ITeam;
    createDataType: "";
    action: "create" | "read" | "update" | "delete";
  };

  faqs: {
    dataType: IFaq;
    createDataType: CreateFaqSchema;
    action: "list" | "create" | "read" | "update" | "delete";
  };

  inquiries: {
    dataType: IInquiry;
    createDataType: ContactUsSchema;
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

export type AccessControlType = Partial<{
  [Res in ResourceType]: {
    [Act in PermissionType[Res]["action"]]: Act extends "list"
      ? PermissionCheckListResource
      : Act extends "create"
        ? PermissionCheckCreateResource<Res>
        : PermissionCheckSingleResource<Res>;
  };
}>;
