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
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/components/chart";

import { Pie, Label, PieChart } from "recharts";

const chartData = [
  { title: "Pre Payment", value: 275, fill: "var(--color-prePayment)" },
  { title: "Document Review", value: 300, fill: "var(--color-documentReview)" },
  { title: "Pre Submission", value: 200, fill: "var(--color-preSubmission)" },
  { title: "Post Submission", value: 400, fill: "var(--color-postSubmission)" },
  {
    title: "Approval Decision",
    value: 900,
    fill: "var(--color-approvalDecision)",
  },
];
const chartConfig = {
  total: {
    label: "Total",
  },
  prePayment: {
    label: "Pre Payment",
    color: "var(--chart-1)",
  },
  documentReview: {
    label: "Document Review",
    color: "var(--chart-2)",
  },
  preSubmission: {
    label: "Pre Submission",
    color: "var(--chart-3)",
  },
  postSubmission: {
    label: "Post Submission",
    color: "var(--chart-4)",
  },
  approvalDecision: {
    label: "Approval Decision",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const totalApplications = chartData.reduce((acc, curr) => acc + curr.value, 0);

export default function ApplicationPie() {
  try {
    return (
      <Card className="shadow-none">
        <CardHeader>
          <div>
            <CardTitle>Applications</CardTitle>
            <CardDescription>Applications distribution</CardDescription>
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
                            {totalApplications.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Applications
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
