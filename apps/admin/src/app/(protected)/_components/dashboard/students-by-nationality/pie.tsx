"use client";

import { brandClientApi } from "@/src/lib/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@workspace/ui/components/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/components/chart";
import React, { useMemo } from "react";
import { Pie, Label, PieChart } from "recharts";

const StudentNationalityPieChart: React.FC<{
  data: {
    nationality: string;
    count: number;
    percentage: number;
  }[];
}> = ({ data }) => {
  const chartConfig = useMemo(() => {
    const config: any = {
      total: {
        label: "Total",
      },
    } satisfies ChartConfig;

    data.forEach((nationality, index) => {
      const country = brandClientApi.location.getCountryByISOCode(
        nationality.nationality,
      );
      config[nationality.nationality] = {
        label: `${country?.name} ${country?.flag}`,
        color: `var(--chart-${index + 1})`,
      };
    });

    return config;
  }, [data]);

  const chartData = useMemo(
    () =>
      data.map((nationality) => {
        const country = brandClientApi.location.getCountryByISOCode(
          nationality.nationality,
        );

        return {
          title: `${country?.name} ${country?.flag}`,
          value: nationality.count,
          fill: `var(--color-${nationality.nationality})`,
        };
      }),
    [data],
  );

  const total = useMemo(
    () => data.reduce((cum, cur) => cum + cur.count, 0),
    [data],
  );

  return (
    <Card className="shadow-none">
      <CardHeader>
        <div>
          <CardTitle>Students</CardTitle>
          <CardDescription>
            Students representation by nationality
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="title"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Students
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default StudentNationalityPieChart;
