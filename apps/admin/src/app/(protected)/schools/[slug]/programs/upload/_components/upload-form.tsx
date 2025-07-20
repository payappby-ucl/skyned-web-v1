"use client";

import { brandClientApi } from "@/src/lib/client";
import { CreateProgramSchema, ISchool } from "@workspace/shared";
import { FileInput } from "@workspace/ui/components/file-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@workspace/ui/components/form";
import { useFieldArray, useForm, zodResolver } from "@workspace/ui/lib/utils";
import React, { useCallback } from "react";
import UploadGuideline from "./program-template";
import { useMutation } from "@tanstack/react-query";
import { FormButton } from "@workspace/ui/components/form-button";
import { Download } from "lucide-react";
import { getActiveIntakes } from "../_actions/server";
import { generateProgramUploadTemplate } from "../_actions/client";
import { useAuthContext } from "@/src/components/providers/auth-provider";

interface Props {
  school: ISchool;
}
const UploadForm: React.FC<Props> = ({ school }) => {
  const { auth } = useAuthContext();
  const form = useForm<CreateProgramSchema>({
    resolver: zodResolver(CreateProgramSchema),
    defaultValues: {
      type: "bulk",
      data: [],
    },
  });

  const onSubmit = useCallback(async (data: CreateProgramSchema) => {
    try {
    } catch (error) {
      brandClientApi.utils.alertError(error);
    }
  }, []);

  // const formData = form.watch("data");
  const { fields, remove } = useFieldArray({
    control: form.control,
    name: "data",
  });

  // * Template Operations
  const downloadTemplateMutation = useMutation({
    mutationFn: async () => {
      try {
        const serverRes = await getActiveIntakes(school.slug);
        const res = brandClientApi.utils.handleServerActionResponse(serverRes);

        const intakes = res.data;

        if (!intakes.length) {
          throw new Error(
            "No active (open, likely open) intakes found. Please add intakes",
          );
        }

        await generateProgramUploadTemplate({
          school,
          intakes,
          creator: `${auth.user?.firstName} ${auth.user?.lastName}`,
        });
      } catch (error) {
        console.log(error);
        brandClientApi.utils.alertError(error);
      }
    },
  });

  return (
    <section className="h-full !p-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="data"
            render={({ field, fieldState }) => (
              <FormItem>
                {Array.isArray(field.value) && field.value.length ? (
                  field.value.map((v, idx) => (
                    <FormField
                      key={`program_item_${idx}`}
                      control={form.control}
                      name={`data.${idx}`}
                      render={({ field }) => (
                        <FormItem>
                          <h2>Hello</h2>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))
                ) : (
                  <div className="grid grid-cols-1 gap-2">
                    <UploadGuideline>
                      <FormButton
                        type="button"
                        role="button"
                        variant="outline"
                        className="text-sm"
                        isLoading={downloadTemplateMutation.isPending}
                        onClick={() => downloadTemplateMutation.mutate()}
                      >
                        <Download /> Download Template
                      </FormButton>
                    </UploadGuideline>
                    <FormControl>
                      <FileInput
                        isInvalid={fieldState.invalid}
                        accept={{
                          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                            [".xlsx"],
                          "application/vnd.ms-excel": [".xls"],
                        }}
                        extensions={[".xlsx", ".xls"]}
                        maxSize={10}
                        setError={(message) =>
                          form.setError("data", {
                            message,
                          })
                        }
                        clearError={() => {
                          form.clearErrors();
                        }}
                        handleFile={async (file) => {
                          if (file) {
                            // const dataUri =
                            //   await brandClientApi.file.getDataUriFromFile(file);

                            // field.onChange(dataUri);

                            console.log(file);
                          }
                        }}
                      />
                    </FormControl>
                  </div>
                )}

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </section>
  );
};
export default UploadForm;
