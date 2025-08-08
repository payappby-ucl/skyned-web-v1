"use client";

import { IDepartment } from "@workspace/shared";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/components/chart";
import React, { useMemo } from "react";
import { Pie, Label, PieChart } from "recharts";

const StaffPieChart: React.FC<{ departments: IDepartment[] }> = ({
  departments,
}) => {
  const chartConfig = useMemo(() => {
    const config: any = {
      total: {
        label: "Total",
      },
    } satisfies ChartConfig;

    departments.forEach((department, index) => {
      config[department.name.toLowerCase()] = {
        label: department.name.replaceAll("_", " "),
        color: `var(--chart-${index + 1})`,
      };
    });

    return config;
  }, [departments]);

  const chartData = useMemo(
    () =>
      departments.map((department) => ({
        title: department.name.replaceAll("_", " "),
        value: department._count?.members || 0,
        fill: `var(--color-${department.name.toLowerCase()})`,
      })),
    [departments],
  );

  const totalDepartments = useMemo(() => departments.length, []);

  return (
    <Card className="shadow-none">
      <CardHeader>
        <div>
          <CardTitle>Department</CardTitle>
          <CardDescription>Departments distribution by members</CardDescription>
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
                          {totalDepartments.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Departments
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

export default StaffPieChart;
