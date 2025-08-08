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
  totalSchools: {
    label: "Total Schools",
    color: "var(--chart-3)",
  },
  activeSchools: {
    label: "Active Schools",
    color: "var(--chart-1)",
  },
  newSchools: {
    label: "New Schools",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const SchoolTrends: React.FC<{
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
          <linearGradient id="fillTotalSchools" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-totalSchools)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-totalSchools)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillActiveSchools" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-activeSchools)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-activeSchools)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillNewSchools" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-newSchools)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-newSchools)"
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
          dataKey="totalSchools"
          type="natural"
          fill="url(#fillTotalSchools)"
          stroke="var(--color-totalSchools)"
          stackId="c"
        />
        <Area
          dataKey="activeSchools"
          type="natural"
          fill="url(#fillActiveSchools)"
          stroke="var(--color-activeSchools)"
          stackId="b"
        />
        <Area
          dataKey="newSchools"
          type="natural"
          fill="url(#fillNewSchools)"
          stroke="var(--color-newSchools)"
          stackId="a"
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
};

export default SchoolTrends;
