"use client";

import {
  accessControl,
  IAccessControl,
  PermissionType,
  ResourceType,
} from "@workspace/shared";
import React, { PropsWithChildren, useMemo } from "react";
import { useAuthContext } from "./providers/auth-provider";

interface Props {
  resource: Parameters<IAccessControl["attribute"]>["1"];
  actionType: Parameters<IAccessControl["attribute"]>["2"];
}

function HasPermission<
  Res extends ResourceType,
  Act extends PermissionType[Res]["action"],
>({
  resourceName,
  action,
  children,
  args,
}: {
  resourceName: Res;
  action: Act;
  children: React.ReactNode;
  args: Act extends "list"
    ? []
    : [
        data: Act extends "create"
          ? PermissionType[Res]["createDataType"]
          : PermissionType[Res]["dataType"],
      ];
}) {
  const {
    auth: { user },
  } = useAuthContext();

  const hasAccess = useMemo(() => {
    const resource = args?.[0] || null;
    if (!user) return false;
    if (!["list"].includes(action) && !resource) return false;

    // if (action === "create" && resource) {
    //   resource
    //   return accessControl.attribute<typeof resourceName, "create">(
    //     {
    //       claim: "admin",
    //       user,
    //     },
    //     resourceName,
    //     action,
    //     resource,
    //   );
    // }

    if (action === "list") {
      return accessControl.attribute<typeof resourceName, "list">(
        {
          claim: "admin",
          user,
        },
        resourceName,
        action,
      );
    }

    return accessControl.attribute<typeof resourceName, any>(
      {
        claim: "admin",
        user,
      },
      resourceName,
      action,
      resource as
        | PermissionType[Res]["createDataType"]
        | PermissionType[Res]["dataType"],
    );
  }, [resourceName, action, user]);

  if (!hasAccess) return null;
  return children;
}

export default HasPermission;
