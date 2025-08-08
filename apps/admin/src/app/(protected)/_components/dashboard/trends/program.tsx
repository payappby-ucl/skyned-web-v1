"use client";

import React, { useCallback } from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/components/chart";
import { CartesianGrid, XAxis, Area, AreaChart } from "recharts";
import { ITrends } from "@workspace/shared";

const chartConfig = {
  totalPrograms: {
    label: "Total Programs",
    color: "var(--chart-3)",
  },
  activePrograms: {
    label: "Active Programs",
    color: "var(--chart-1)",
  },
  newPrograms: {
    label: "New Programs",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const ProgramTrends: React.FC<{
  trends: ITrends[];
}> = ({ trends }) => {
  const getDateTimeFormatOptions = useCallback(() => {
    const type = trends[0]?.type || "days";
    const options: Intl.DateTimeFormatOptions =
      type === "days"
        ? {
            month: "short",
            day: "numeric",
          }
        : type === "months"
          ? {
              month: "long",
            }
          : {
              year: "numeric",
            };

    return options;
  }, [trends]);

  return (
    <ChartContainer
      config={chartConfig}
      className={"aspect-auto h-[250px] w-full rounded-lg border p-2"}
    >
      <AreaChart data={trends}>
        <defs>
          <linearGradient id="fillTotalPrograms" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-totalPrograms)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-totalPrograms)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillActivePrograms" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-activePrograms)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-activePrograms)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillNewPrograms" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-newPrograms)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-newPrograms)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="period"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value, index) => {
            const date = new Date(value);
            const options = getDateTimeFormatOptions();

            return date.toLocaleDateString("en-US", options);
          }}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelFormatter={(value) => {
                const options = getDateTimeFormatOptions();

                return new Date(value).toLocaleDateString("en-US", options);
              }}
              indicator="dot"
            />
          }
        />
        <Area
          dataKey="totalPrograms"
          type="natural"
          fill="url(#fillTotalPrograms)"
          stroke="var(--color-totalPrograms)"
          stackId="c"
        />
        <Area
          dataKey="activePrograms"
          type="natural"
          fill="url(#fillActivePrograms)"
          stroke="var(--color-activePrograms)"
          stackId="b"
        />
        <Area
          dataKey="newPrograms"
          type="natural"
          fill="url(#fillNewPrograms)"
          stroke="var(--color-newPrograms)"
          stackId="a"
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
};

export default ProgramTrends;
