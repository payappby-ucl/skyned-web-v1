"use client";
import { BrandClientApi } from "@workspace/api/client";
import { auth, env } from "../config";
import { toast } from "@workspace/ui/components/sonner";

export const brandClientApi = BrandClientApi.factory({
  auth,
  environment: env.appEnv,
  toast: toast,
});
