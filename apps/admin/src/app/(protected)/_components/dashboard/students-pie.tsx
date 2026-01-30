"use client";

import Alert from "@/src/components/alert";
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/components/chart";

import { Pie, Label, PieChart } from "recharts";

const chartData = [
  { title: "paid", value: 275, fill: "var(--color-paid)" },
  { title: "unpaid", value: 200, fill: "var(--color-unpaid)" },
];
const chartConfig = {
  total: {
    label: "Total",
  },
  paid: {
    label: "Paid",
    color: "var(--chart-1)",
  },
  unpaid: {
    label: "Unpaid",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const totalStudents = chartData.reduce((acc, curr) => acc + curr.value, 0);

export default function StudentPie() {
  try {
    return (
      <Card className="shadow-none">
        <CardHeader>
          <div>
            <CardTitle>Students</CardTitle>
            <CardDescription>
              Students distribution based on paid and unpaid
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
              <ChartLegend content={<ChartLegendContent />} />
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
                            {totalStudents.toLocaleString()}
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
  } catch (error) {
    return <Alert />;
  }
}
