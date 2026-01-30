"use client";

import { brandClientApi } from "@/src/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IAdmin } from "@workspace/shared";
import { takeActionOnAdmin } from "../_actions";
import { IMessageResponse } from "@workspace/shared";

export const useAdmin = () => {
  const queryClient = useQueryClient();

  const actionOnAdminMutation = useMutation({
    mutationFn: async (admin: IAdmin) => {
      try {
        brandClientApi.utils.toast.promise(
          async () => {
            const res = await takeActionOnAdmin(
              admin.adminId,
              admin.accountSuspended ? "activate" : "deactivate",
            );

            const resData =
              brandClientApi.utils.handleServerActionResponse(res);
            return resData;
          },
          {
            loading: `Please wait...`,
            success(data) {
              queryClient.invalidateQueries({
                queryKey: ["admins"],
              });

              queryClient.invalidateQueries({
                queryKey: [`admins-${admin.adminId}`],
              });

              return data.message;
            },
            error(error) {
              return brandClientApi.utils.handleError(error);
            },
          },
        );
      } catch (error) {
        brandClientApi.utils.alertError(error);
      }
    },
  });

  return {
    actionOnAdminMutation,
  };
};
