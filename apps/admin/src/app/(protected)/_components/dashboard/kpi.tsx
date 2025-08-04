import { Badge } from "@workspace/ui/components/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { School } from "lucide-react";
import React from "react";

const KPI: React.FC = () => {
  const kpis = {
    schools: {
      total: 200,
      active: 50,
      growth: 8,
    },
    programs: {
      total: 5000,
      active: 300,
      growth: -20,
    },
    inquiries: {
      total: 200,
      growth: 10,
    },
    faqs: {
      total: 10,
      growth: 1,
    },
    blog: {
      total: 100,
      published: 10,
      draft: 10,
      scheduled: 3,
      unpublished: 2,
      growth: 2,
    },
    staffs: {
      total: 30,
      growth: 4,
      active: 60,
    },
    students: {
      total: 200,
      paid: 20,
      active: 20,
      growth: 10,
    },
  };
  return (
    <div className="columns-1">
      <Card>
        <CardHeader>
          <CardDescription>Total Schools</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            200
          </CardTitle>
          <CardAction>
            <School className="text-muted-foreground" />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {/* Trending up this month <IconTrendingUp className="size-4" /> */}
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
export default KPI;
