import { IAdmin, IDepartment } from "interfaces";
import { IAccessControl } from "./interfaces";
import { policies } from "./policies";
import {
  PermissionCheckCreateResource,
  PermissionCheckListResource,
  PermissionCheckSingleResource,
  PermissionType,
} from "./types";

export * from "./interfaces";
export * from "./types";
export * from "./policies";

class AccessControl implements IAccessControl {
  private policies = policies;

  role: IAccessControl["role"] = (claims, authClaim) => {
    return claims.includes(authClaim.claim);
  };

  attribute: IAccessControl["attribute"] = (
    claim,
    resourceName,
    action,
    data,
  ) => {
    if (
      !resourceName ||
      !action ||
      !claim ||
      (!["list"].includes(action) && !data)
    ) {
      return false;
    }

    const actionPolicy = this.policies?.[resourceName]?.[action];

    if (!actionPolicy) return false;
    if (typeof actionPolicy === "boolean") return actionPolicy;

    if (action === "create") {
      return (
        actionPolicy as Extract<
          PermissionCheckCreateResource<typeof resourceName>,
          Function
        >
      )(claim, data as PermissionType[typeof resourceName]["createDataType"]);
    }

    if (action === "list") {
      return (actionPolicy as Extract<PermissionCheckListResource, Function>)(
        claim,
      );
    }

    return (
      actionPolicy as Extract<
        PermissionCheckSingleResource<typeof resourceName>,
        Function
      >
    )(claim, data as PermissionType[typeof resourceName]["dataType"]);
  };
}

const accessControl = new AccessControl();
console.log(
  accessControl.attribute(
    { claim: "student", user: {} as any },
    "departments",
    "list",
    undefined,
  ),
);
