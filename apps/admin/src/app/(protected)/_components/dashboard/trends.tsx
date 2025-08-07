"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import SchoolTrends from "./trends/school";
import ProgramTrends from "./trends/program";
import { DatePicker } from "@workspace/ui/components/date-picker";
import { brandClientApi } from "@/src/lib/client";

const data = [
  {
    date: "2024-04-01",
    schools: 222,
    programs: 150,
    faqs: 23,
    inquires: 20,
    admins: 30,
  },
];

const Trends: React.FC = () => {
  const [selected, setSelected] = useState<
    | {
        from: Date | undefined;
        to?: Date;
      }
    | undefined
  >();

  return (
    <Card className="gap-2 shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle>Trends</CardTitle>
            <CardDescription>
              Trends of various indicators over a period
            </CardDescription>
          </div>

          <DatePicker
            usePortal
            selected={selected}
            mode="range"
            onSelect={(data) => setSelected(data)}
            captionLayout="buttons"
            numberOfMonths={2}
            display={
              selected?.from && selected.to
                ? brandClientApi.date.formatDate(
                    new Date(selected?.from),
                    "MMM DD YYYY",
                  ) +
                  " - " +
                  brandClientApi.date.formatDate(
                    new Date(selected?.to),
                    "MMM DD YYYY",
                  )
                : ""
            }
          />
        </div>
      </CardHeader>
      <CardContent className="grid gap-x-2 gap-y-10">
        <SchoolTrends />
        <ProgramTrends />
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground text-sm">
          Metrics may be delayed up to 24 hours
        </p>
      </CardFooter>
    </Card>
  );
};

export default Trends;
