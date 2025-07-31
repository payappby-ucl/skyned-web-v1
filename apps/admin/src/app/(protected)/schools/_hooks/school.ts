"use client";

import { brandClientApi } from "@/src/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { takeActionOnSchool } from "../_actions";
import { ISchool } from "@workspace/shared";

export const useSchool = () => {
  const queryClient = useQueryClient();

  const actionOnSchoolMutation = useMutation({
    mutationFn: async (school: ISchool) => {
      try {
        brandClientApi.utils.toast.promise(
          async () => {
            const res = await takeActionOnSchool(
              school.slug,
              school.active ? "deactivate" : "activate",
            );

            const resData =
              brandClientApi.utils.handleServerActionResponse(res);
            return resData;
          },
          {
            loading: `Please wait...`,
            success(data) {
              queryClient.invalidateQueries({
                queryKey: ["schools"],
              });
              return data.message;
            },
            error(error) {
              brandClientApi.utils.alertError(error);
              return error;
            },
          },
        );
      } catch (error) {
        brandClientApi.utils.alertError(error);
      }
    },
  });

  return {
    actionOnSchoolMutation,
  };
};
