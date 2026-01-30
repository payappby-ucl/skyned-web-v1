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
  totalInquiries: {
    label: "Total Inquiries",
    color: "var(--chart-2)",
  },
  newInquiries: {
    label: "New Inquiries",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const InquiriesTrends: React.FC<{
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
          <linearGradient id="fillTotalInquiries" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-totalInquiries)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-totalInquiries)"
              stopOpacity={0.1}
            />
          </linearGradient>

          <linearGradient id="fillNewInquiries" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-newInquiries)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-newInquiries)"
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
          dataKey="totalInquiries"
          type="natural"
          fill="url(#fillTotalInquiries)"
          stroke="var(--color-totalInquiries)"
          stackId="c"
        />
        <Area
          dataKey="newInquiries"
          type="natural"
          fill="url(#fillNewInquiries)"
          stroke="var(--color-newInquiries)"
          stackId="a"
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
};

export default InquiriesTrends;
