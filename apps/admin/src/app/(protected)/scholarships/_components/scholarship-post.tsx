"use client";

import HasPermission from "@/src/components/has-permission";
import Profile from "@/src/components/profile";
import { brandClientApi } from "@/src/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IAdmin, IScholarship } from "@workspace/shared";
import { ActionAlert } from "@workspace/ui/components/action-alert";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Eye, EyeClosedIcon, EyeOff, SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { deleteScholarship, scholarshipAction } from "../_actions";

interface Props {
  scholarship: IScholarship;
}
const ScholarshipPost: React.FC<Props> = ({ scholarship }) => {
  const queryClient = useQueryClient();
  const deleteScholarshipMutation = useMutation({
    mutationFn: async () => {
      try {
        brandClientApi.utils.toast.promise(
          async () => {
            const res = await deleteScholarship(scholarship.slug);
            const resData =
              brandClientApi.utils.handleServerActionResponse(res);
            return resData;
          },
          {
            loading: "Deleting...",
            success(data) {
              queryClient.invalidateQueries({
                queryKey: ["scholarships"],
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

  const scholarshipActionMutation = useMutation({
    mutationFn: async (action: "activate" | "deactivate") => {
      try {
        brandClientApi.utils.toast.promise(
          async () => {
            const res = await scholarshipAction(scholarship.slug, action);
            const resData =
              brandClientApi.utils.handleServerActionResponse(res);
            return resData;
          },
          {
            loading: `${action}ing scholarship...`,
            success(data) {
              queryClient.invalidateQueries({
                queryKey: ["scholarships"],
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

  return (
    <article className="space-y-2 overflow-hidden rounded-lg border p-4">
      <Image
        src={scholarship.banner.url}
        width={200}
        height={200}
        alt={scholarship.title}
        className="w-full rounded-2xl"
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {!scholarship.active ? (
            <Badge variant="destructive" className="font-semibold uppercase">
              Inactive
            </Badge>
          ) : null}

          {scholarship.featured ? (
            <Badge variant="secondary" className="font-bold uppercase">
              Featured
            </Badge>
          ) : null}
        </div>

        <p className="font-regular text-xs">
          {brandClientApi.date.formatDate(
            scholarship.createdAt,
            "DD MMMM YYYY",
          )}
        </p>
      </div>
      <div>
        <h2 className="!text-xl">{scholarship.title}</h2>
        <p className="text-muted-foreground line-clamp-1 text-xs">
          {scholarship.subtitle}
        </p>
        <Badge variant="outline" className="font-semibold capitalize">
          {scholarship.category}
        </Badge>
      </div>

      <p className="line-clamp-4 text-sm">{scholarship.overview}</p>
      <div className="flex items-center justify-between">
        <HasPermission
          resourceName="admins"
          action="read"
          args={[scholarship.createdBy as IAdmin]}
          secondaryComponent={<Profile {...scholarship.createdBy!} disabled />}
        >
          <Profile {...scholarship.createdBy!} />
        </HasPermission>

        <div className="flex items-center gap-1">
          <HasPermission
            resourceName="scholarships"
            action="update"
            args={[{} as any, scholarship]}
          >
            <Button asChild size="icon" variant="ghost">
              <Link
                href={`/scholarships/${scholarship.slug}`}
                aria-label="Link to edit post"
              >
                <SquarePen />
              </Link>
            </Button>
          </HasPermission>

          <HasPermission
            resourceName="scholarships"
            action="delete"
            args={[scholarship]}
          >
            <ActionAlert
              title="Delete Scholarship"
              description="This action cannot be reversed"
              action={deleteScholarshipMutation.mutate}
              actionText="Delete"
              Icon={<Trash2 className="text-destructive" />}
            />
          </HasPermission>

          <HasPermission
            resourceName="scholarships"
            action={scholarship.active ? "deactivate" : "activate"}
            args={[scholarship]}
          >
            <ActionAlert
              title={`${scholarship.active ? "Deactivate" : "Activate"} Scholarship`}
              description="Hide/Show scholarship to the public"
              action={() =>
                scholarshipActionMutation.mutate(
                  scholarship.active ? "deactivate" : "activate",
                )
              }
              actionButtonClassName={`${scholarship.active ? "" : "!bg-green-600"}`}
              actionText={`${scholarship.active ? "Deactivate" : "Activate"}`}
              Icon={
                scholarship.active ? (
                  <EyeOff className="text-destructive" />
                ) : (
                  <Eye className="text-green-600" />
                )
              }
            />
          </HasPermission>
        </div>
      </div>
    </article>
  );
};

export default ScholarshipPost;
