"use client";

import { brandClientApi } from "@/src/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { takeActionOnProgram } from "../_actions";
import { IProgram } from "@workspace/shared";
import { IMessageResponse } from "@workspace/shared";

export const useProgram = () => {
  const queryClient = useQueryClient();

  const actionOnProgramMutation = useMutation({
    mutationFn: async (program: IProgram) => {
      try {
        brandClientApi.utils.toast.promise(
          async () => {
            const res = await takeActionOnProgram(
              program.school?.slug || "",
              program.slug,
              program.active ? "deactivate" : "activate",
            );

            const resData =
              brandClientApi.utils.handleServerActionResponse(res);
            return resData;
          },
          {
            loading: `Please wait...`,
            success(data) {
              queryClient.invalidateQueries({
                queryKey: [`programs-${program.school?.slug}`],
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
    actionOnProgramMutation,
  };
};
