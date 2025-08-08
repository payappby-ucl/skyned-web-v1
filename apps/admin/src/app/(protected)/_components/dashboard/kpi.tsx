import Alert from "@/src/components/alert";
import FormatNumber from "@/src/components/format-number";
import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import { IKPI } from "@workspace/shared";
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

export default async function KPI() {
  try {
    const { data } = await brandServerApi.httpClient.request<IKPI>(
      `/admins/dashboard/kpis`,
      "GET",
      {
        next: {
          tags: [`${serverCacheTags.kpi}`],
        },
      },
    );

    console.log(data);

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
            <h3 className="!text-2xl font-semibold">
              <FormatNumber value={data?.totalSchools || 0} />
            </h3>

            <p className="bg-muted rounded-xs w-fit border px-2 text-xs font-semibold">
              <FormatNumber value={data?.activeSchools || 0} /> Active
            </p>
          </div>

          {/* Programs */}
          <div className="space-y-1 rounded-md border p-4">
            <p className="text-md font-semibold">Programs</p>
            <h3 className="!text-2xl font-semibold">
              {" "}
              <FormatNumber value={data?.totalPrograms || 0} />
            </h3>
            <p className="bg-muted rounded-xs w-fit border px-2 text-xs font-semibold">
              <FormatNumber value={data?.activePrograms || 0} /> Active
            </p>
          </div>

          {/* Students */}
          {/* TODO:  Work on this when implementation is ready */}
          <div className="space-y-1 rounded-md border p-4">
            <p className="text-md font-semibold">Students</p>

            <h3 className="!text-2xl font-semibold">
              <FormatNumber value={1500} />
            </h3>
            <div className="space-x-1">
              <Badge
                title="Paid"
                className="h-5 min-w-5 rounded-full bg-green-600 px-1 font-mono tabular-nums text-white"
              >
                <FormatNumber value={10} />
              </Badge>
              <Badge
                title="Unpaid"
                className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
              >
                <FormatNumber value={2} />
              </Badge>
            </div>
          </div>

          {/* Applications */}
          <div className="space-y-1 rounded-md border p-4">
            <p className="text-md font-semibold">Applications</p>
            <h3 className="!text-2xl font-semibold">
              <FormatNumber value={23000} />
            </h3>
            <div className="space-x-1">
              <Badge
                title="Prepayment"
                className="h-5 min-w-5 rounded-full bg-green-600 px-1 font-mono tabular-nums text-white"
              >
                <FormatNumber value={10} />
              </Badge>
              <Badge
                title="PostPayment"
                className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
              >
                <FormatNumber value={5} />
              </Badge>
            </div>
          </div>

          {/* Staffs */}
          <div className="space-y-1 rounded-md border p-4">
            <p className="text-md font-semibold">Staffs</p>
            <h3 className="!text-2xl font-semibold">
              {" "}
              <FormatNumber value={data?.totalAdmins || 0} />
            </h3>
            <p className="bg-muted rounded-xs w-fit border px-2 text-xs font-semibold">
              <FormatNumber value={data?.activeAdmins || 0} /> Active
            </p>
          </div>

          {/* FAQs */}
          <div className="space-y-1 rounded-md border p-4">
            <p className="text-md font-semibold">FAQs</p>
            <h3 className="!text-2xl font-semibold">
              {" "}
              <FormatNumber value={data?.totalFaqs || 0} />
            </h3>
          </div>

          {/* Inquiries */}
          <div className="space-y-1 rounded-md border p-4">
            <p className="text-md font-semibold">Inquiries</p>
            <h3 className="!text-2xl font-semibold">
              {" "}
              <FormatNumber value={data?.totalInquiries || 0} />
            </h3>
          </div>

          {/* Blog Posts */}
          <div className="space-y-1 rounded-md border p-4">
            <p className="text-md font-semibold">Blog Posts</p>
            <h3 className="!text-2xl font-semibold">
              {" "}
              <FormatNumber value={data?.totalPosts || 0} />
            </h3>
            <div className="space-x-1">
              <Badge
                title="Published"
                className="h-5 min-w-5 rounded-full bg-green-600 px-1 font-mono tabular-nums text-white"
              >
                <FormatNumber value={data?.publishedPosts || 0} />
              </Badge>
              <Badge
                title="Draft"
                variant="outline"
                className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
              >
                <FormatNumber value={data?.draftPosts || 0} />
              </Badge>
              <Badge
                title="Scheduled"
                variant="default"
                className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
              >
                <FormatNumber value={data?.scheduledPosts || 0} />
              </Badge>
              <Badge
                title="Unpublished"
                variant="secondary"
                className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
              >
                <FormatNumber value={data?.unpublishedPosts || 0} />
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
  } catch (error) {
    <Alert message="Error" />;
  }
}
