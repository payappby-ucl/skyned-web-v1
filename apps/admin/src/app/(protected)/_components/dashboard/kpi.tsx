import { Badge } from "@workspace/ui/components/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import React from "react";

const KPI: React.FC = () => {
  return (
    <Card className="gap-2 shadow-none">
      <CardHeader>
        <div>
          <CardTitle>KPI's</CardTitle>
          <CardDescription>Core Performance Metrics</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {/* Schools */}
        <div className="space-y-1 rounded-md border p-4">
          <p className="text-md font-semibold">Schools</p>
          <h3 className="!text-2xl font-semibold">30</h3>

          <p className="bg-muted rounded-xs w-fit border px-2 text-xs font-semibold">
            20 Active
          </p>
        </div>

        {/* Programs */}
        <div className="space-y-1 rounded-md border p-4">
          <p className="text-md font-semibold">Programs</p>
          <h3 className="!text-2xl font-semibold">200</h3>
          <p className="bg-muted rounded-xs w-fit border px-2 text-xs font-semibold">
            20 Active
          </p>
        </div>

        {/* Students */}
        <div className="space-y-1 rounded-md border p-4">
          <p className="text-md font-semibold">Students</p>
          <h3 className="!text-2xl font-semibold">2,500</h3>
          <div className="space-x-1">
            <Badge
              title="Paid"
              className="h-5 min-w-5 rounded-full bg-green-600 px-1 font-mono tabular-nums text-white"
            >
              10
            </Badge>
            <Badge
              title="Unpaid"
              className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
            >
              2
            </Badge>
          </div>
        </div>

        {/* Applications */}
        <div className="space-y-1 rounded-md border p-4">
          <p className="text-md font-semibold">Applications</p>
          <h3 className="!text-2xl font-semibold">500</h3>
          <div className="space-x-1">
            <Badge
              title="Prepayment"
              className="h-5 min-w-5 rounded-full bg-green-600 px-1 font-mono tabular-nums text-white"
            >
              10
            </Badge>
            <Badge
              title="PostPayment"
              className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
            >
              2
            </Badge>
          </div>
        </div>

        {/* Staffs */}
        <div className="space-y-1 rounded-md border p-4">
          <p className="text-md font-semibold">Staffs</p>
          <h3 className="!text-2xl font-semibold">10</h3>
          <p className="bg-muted rounded-xs w-fit border px-2 text-xs font-semibold">
            10 Active
          </p>
        </div>

        {/* FAQs */}
        <div className="space-y-1 rounded-md border p-4">
          <p className="text-md font-semibold">FAQs</p>
          <h3 className="!text-2xl font-semibold">10</h3>
        </div>

        {/* Inquiries */}
        <div className="space-y-1 rounded-md border p-4">
          <p className="text-md font-semibold">Inquiries</p>
          <h3 className="!text-2xl font-semibold">10</h3>
        </div>

        {/* Blog Posts */}
        <div className="space-y-1 rounded-md border p-4">
          <p className="text-md font-semibold">Blog Posts</p>
          <h3 className="!text-2xl font-semibold">10</h3>
          <div className="space-x-1">
            <Badge
              title="Published"
              className="h-5 min-w-5 rounded-full bg-green-600 px-1 font-mono tabular-nums text-white"
            >
              10
            </Badge>
            <Badge
              title="Draft"
              variant="outline"
              className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
            >
              2
            </Badge>
            <Badge
              title="Scheduled"
              variant="default"
              className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
            >
              1
            </Badge>
            <Badge
              title="Unpublished"
              variant="secondary"
              className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
            >
              4
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground text-sm">
          Metrics may be delayed up to 24 hours
        </p>
      </CardFooter>
    </Card>
  );
};
export default KPI;
