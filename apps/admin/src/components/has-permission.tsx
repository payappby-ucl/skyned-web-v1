"use client";

import { accessControl, PermissionType, ResourceType } from "@workspace/shared";
import React, { useEffect, useMemo } from "react";
import { useAuthContext } from "./providers/auth-provider";
import { useRouter } from "next/navigation";

function HasPermission<
  Res extends ResourceType,
  Act extends PermissionType[Res]["action"],
>({
  resourceName,
  action,
  children,
  args,
  secondaryComponent,
  redirect,
}: {
  resourceName: Res;
  action: Act;
  children: React.ReactNode;
  args: Act extends "list"
    ? []
    : Act extends "update"
      ? [PermissionType[Res]["updateDataType"], PermissionType[Res]["dataType"]]
      : [
          data: Act extends "create"
            ? PermissionType[Res]["createDataType"]
            : PermissionType[Res]["dataType"],
        ];
  secondaryComponent?: React.ReactNode;
  redirect?: boolean;
}) {
  const {
    auth: { user },
  } = useAuthContext();
  const router = useRouter();

  const hasAccess = useMemo(() => {
    const resource = args?.[0] || null;
    const updateResource = args?.[1] || null;

    if (!user) return false;
    if (!["list"].includes(action) && !resource) return false;
    if (["update"].includes(action) && !updateResource) return false;

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

    if (action === "update") {
      return accessControl.attribute<typeof resourceName, any>(
        {
          claim: "admin",
          user,
        },
        resourceName,
        action,
        ...[
          resource as PermissionType[Res]["updateDataType"],
          updateResource as PermissionType[Res]["dataType"],
        ],
      );
    }

    return accessControl.attribute<typeof resourceName, any>(
      {
        claim: "admin",
        user,
      },
      resourceName,
      action,
      ...[
        resource as
          | PermissionType[Res]["createDataType"]
          | PermissionType[Res]["dataType"],
      ],
    );
  }, [resourceName, action, user]);

  useEffect(() => {
    if (!hasAccess && redirect) {
      router.replace("/");
    }
  }, [redirect, hasAccess]);

  if (!hasAccess) return secondaryComponent || null;
  return children;
}

export default HasPermission;
