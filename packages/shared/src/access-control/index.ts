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
  private static instance: IAccessControl | null = null;
  private policies = policies;

  private constructor() {}

  static factory() {
    if (!AccessControl.instance) {
      AccessControl.instance = new AccessControl();
    }

    return AccessControl.instance;
  }

  role: IAccessControl["role"] = (claims, authClaim) => {
    return claims.includes(authClaim.claim);
  };

  attribute: IAccessControl["attribute"] = (
    auth,
    resourceName,
    action,
    ...args
  ) => {
    const data = args[0];
    if (
      !resourceName ||
      !action ||
      !auth ||
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
      )(auth, data as PermissionType[typeof resourceName]["createDataType"]);
    }

    if (action === "list") {
      return (actionPolicy as Extract<PermissionCheckListResource, Function>)(
        auth,
      );
    }

    return (
      actionPolicy as Extract<
        PermissionCheckSingleResource<typeof resourceName>,
        Function
      >
    )(auth, data as PermissionType[typeof resourceName]["dataType"]);
  };
}

export const accessControl = AccessControl.factory();
