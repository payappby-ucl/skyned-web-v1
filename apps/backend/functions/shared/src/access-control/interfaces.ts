import { IAdmin } from "../interfaces";
import { AuthClaim, PermissionType, ResourceType } from "./types";

export interface StudentClaim {
  claim: "student";
  user: "";
}

export interface AdminClaim {
  claim: "admin";
  user: IAdmin;
}

export interface IAccessControl {
  role(claims: AuthClaim["claim"][], authClaim: AuthClaim): boolean;

  attribute<
    Res extends ResourceType,
    Act extends PermissionType[Res]["action"],
  >(
    auth: AuthClaim,
    resourceName: Res,
    action: Act,
    ...args: Act extends "list"
      ? []
      : [
          data: Act extends "create"
            ? PermissionType[Res]["createDataType"]
            : PermissionType[Res]["dataType"],
        ]
  ): boolean;
}
