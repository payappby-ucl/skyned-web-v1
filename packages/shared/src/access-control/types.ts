import {
  ContactUsSchema,
  CreateAdminSchema,
  CreateFaqSchema,
  UpdateAdminSchema,
} from "../schemas";
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
