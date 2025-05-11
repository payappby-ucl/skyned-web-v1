"use client";

import {
  accessControl,
  IAccessControl,
  PermissionType,
  ResourceType,
} from "@workspace/shared";
import React, { useMemo } from "react";
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
  alert,
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
  alert?: React.ReactNode;
}) {
  const {
    auth: { user },
  } = useAuthContext();

  const hasAccess = useMemo(() => {
    const resource = args?.[0] || null;
    if (!user) return false;
    if (!["list"].includes(action) && !resource) return false;

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

  if (!hasAccess) return alert || null;
  return children;
}

export default HasPermission;
