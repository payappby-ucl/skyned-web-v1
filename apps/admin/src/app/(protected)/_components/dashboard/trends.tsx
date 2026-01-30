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
import useGet from "@/src/hooks/use-get";
import { ITrends } from "@workspace/shared";
import Loading from "@/src/components/loading";
import { Button } from "@workspace/ui/components/button";
import { Layers, LayoutGrid } from "lucide-react";
import PostTrends from "./trends/post";
import InquiriesTrends from "./trends/inquiry";
import FaqsTrends from "./trends/faq";
import StaffTrends from "./trends/staffs";

const Trends: React.FC = () => {
  const [selected, setSelected] = useState<
    | {
        from: Date | undefined;
        to?: Date;
      }
    | undefined
  >({
    from: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });

  const [display, setDisplay] = useState<"grid" | "list">("list");

  const { data, isPending } = useGet<ITrends[]>({
    queryKey: [`${+(selected?.from || 0)}`, `${+(selected?.to || 0)}`],
    url: `/dashboard/trends?from=${+(selected?.from || Date.now())}&to=${+(selected?.to || Date.now())}`,
    enabled: selected?.from && selected.to ? true : false,
  });

  if (data && data.length) {
    if (data.length && data[0]?.type === "months") {
      const trendInIndexZero = data[0];
      let monthToAddToTrends = new Date(trendInIndexZero.period).getMonth() - 1;
      const january = 0;

      while (monthToAddToTrends >= january) {
        const newTrendData = {
          ...trendInIndexZero,
        };

        const formattedData = Object.fromEntries(
          Object.entries(newTrendData).map(([key]) => [key, 0]),
        );

        data.unshift({
          ...(formattedData as unknown as typeof trendInIndexZero),
          type: "months",
          period: new Date(
            new Date().getFullYear(),
            monthToAddToTrends,
          ).toDateString(),
        });

        monthToAddToTrends -= 1;
      }
    }
  }

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

          <div className="flex items-center gap-4">
            <DatePicker
              usePortal
              selected={selected}
              mode="range"
              onSelect={(data) => setSelected(data)}
              captionLayout="buttons"
              numberOfMonths={2}
              fromYear={new Date().getFullYear() - 20}
              toYear={new Date().getFullYear()}
              toDate={new Date()}
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

            <div className="hidden divide-x rounded-md border lg:flex lg:items-center">
              <Button
                type="button"
                role="button"
                variant="ghost"
                size="sm"
                className={`rounded-none ${display === "grid" ? "bg-accent" : ""}`}
                onClick={() => setDisplay("grid")}
              >
                <LayoutGrid />
              </Button>

              <Button
                type="button"
                role="button"
                variant="ghost"
                size="sm"
                className={`rounded-none ${display === "list" ? "bg-accent" : ""}`}
                onClick={() => setDisplay("list")}
              >
                <Layers />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent
        className={`grid gap-4 ${display === "grid" ? "lg:grid-cols-2" : ""}`}
      >
        {data ? (
          <>
            <SchoolTrends trends={data} />
            <ProgramTrends trends={data} />
            <InquiriesTrends trends={data} />
            <StaffTrends trends={data} />
            <PostTrends trends={data} />
            <FaqsTrends trends={data} />
          </>
        ) : null}

        {isPending ? <Loading /> : null}
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
