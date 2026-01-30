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
  totalPosts: {
    label: "Total Posts",
    color: "var(--chart-1)",
  },
  publishedPosts: {
    label: "Published",
    color: "var(--chart-2)",
  },
  draftPosts: {
    label: "Draft",
    color: "var(--chart-3)",
  },
  scheduledPosts: {
    label: "Scheduled",
    color: "var(--chart-4)",
  },
  unpublishedPosts: {
    label: "Unpublished",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

const PostTrends: React.FC<{
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
          <linearGradient id="fillTotalPosts" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-totalPosts)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-totalPosts)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillPublishedPosts" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-publishedPosts)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-publishedPosts)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillDraftPosts" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-draftPosts)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-draftPosts)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillScheduledPosts" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-scheduledPosts)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-scheduledPosts)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillUnpublishedPosts" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-unpublishedPosts)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-unpublishedPosts)"
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
          dataKey="totalPosts"
          type="natural"
          fill="url(#fillTotalPosts)"
          stroke="var(--color-totalPosts)"
          stackId="e"
        />
        <Area
          dataKey="unpublishedPosts"
          type="natural"
          fill="url(#fillUnpublishedPosts)"
          stroke="var(--color-unpublishedPosts)"
          stackId="d"
        />
        <Area
          dataKey="publishedPosts"
          type="natural"
          fill="url(#fillPublishedPosts)"
          stroke="var(--color-publishedPosts)"
          stackId="c"
        />
        <Area
          dataKey="scheduledPosts"
          type="natural"
          fill="url(#fillScheduledPosts)"
          stroke="var(--color-scheduledPosts)"
          stackId="b"
        />
        <Area
          dataKey="draftPosts"
          type="natural"
          fill="url(#fillDraftPosts)"
          stroke="var(--color-draftPosts)"
          stackId="a"
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
};

export default PostTrends;
