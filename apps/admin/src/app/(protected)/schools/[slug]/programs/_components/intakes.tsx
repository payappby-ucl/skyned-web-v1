"use client";

import { brandClientApi } from "@/src/lib/client";
import { useQueryClient } from "@tanstack/react-query";
import { IIntake, IProgram } from "@workspace/shared";
import { Button } from "@workspace/ui/components/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible";
import { Separator } from "@workspace/ui/components/separator";
import { ChevronsUpDown, Trash2 } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";
import AddIntakesForm from "./add-intakes-form";
import { connectIntake, disconnectIntake } from "../../../_actions";
import { IntakeStatus } from "@workspace/ui/components/intake-status";

interface Props {
  intakes: IIntake[];
  program: IProgram;
}

const Item: React.FC<{ intake: IIntake; program: IProgram }> = ({
  intake,
  program,
}) => {
  const [open, seOpen] = useState(false);

  return (
    <Collapsible
      open={open}
      onOpenChange={seOpen}
      className="w-full space-y-5 rounded-md border p-2"
    >
      <div className="flex items-center gap-2 text-sm">
        <IntakeStatus status={intake.status} />
        <p className="ml-auto font-semibold">{intake.intake}</p>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <ChevronsUpDown />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="text-md space-y-2 px-2">
        <div className="space-y-1">
          <p className="text-sm font-semibold">Open Date</p>
          <p className="text-sm">
            {intake.startDate
              ? brandClientApi.date.formatDate(intake.startDate, "DD/MM/YYYY")
              : "No Information"}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold">Deadline</p>
          <p className="text-sm">
            {intake.deadline
              ? brandClientApi.date.formatDate(intake.deadline, "DD/MM/YYYY")
              : "No Information"}
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

const ProgramIntakes: React.FC<Props> = ({ intakes, program }) => {
  const queryClient = useQueryClient();

  const updateIntake = useCallback(
    async (isSelected: boolean, intake: IIntake) => {
      let res;
      if (!isSelected) {
        const serverRes = await disconnectIntake(
          program.school?.slug!,
          program.slug,
          [intake.id],
        );
        res = brandClientApi.utils.handleServerActionResponse(serverRes);
      } else {
        const serverRes = await connectIntake(
          program.school!.slug,
          program.slug,
          [intake.id],
        );
        res = brandClientApi.utils.handleServerActionResponse(serverRes);
      }

      queryClient.invalidateQueries({
        queryKey: [`intakes-${program.school!.slug}`],
      });

      queryClient.invalidateQueries({
        queryKey: [`programs-${program.school!.slug}`],
      });

      return res;
    },
    [program, intakes],
  );

  return (
    <div className="space-y-2 rounded-md border p-4">
      <div className="flex items-center justify-between">
        <h3 className="!text-xl">Program Intakes</h3>
        <AddIntakesForm
          schoolSlug={program.school?.slug!}
          selectedIntakes={program.intakes}
          onChange={(isSelected, intake) => {
            brandClientApi.utils.toast.promise(
              async () => updateIntake(isSelected, intake),
              {
                loading: "Updating...",
                success: (data) => {
                  return data.message;
                },
                error(error: any) {
                  return brandClientApi.utils.handleError(error);
                },
              },
            );
          }}
        />
      </div>
      <Separator />
      <div className="space-y-3">
        {intakes.length ? (
          intakes.map((intake, index) => (
            <Item
              key={`${intake.intake} - ${index}`}
              intake={intake}
              program={program}
            />
          ))
        ) : (
          <p className="text-center text-sm">No Intakes</p>
        )}
      </div>
    </div>
  );
};
export default ProgramIntakes;
