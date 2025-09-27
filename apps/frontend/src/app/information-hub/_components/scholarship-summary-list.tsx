"use client";

import { IScholarshipSummary, scholarshipCategories } from "@workspace/shared";
import { Button } from "@workspace/ui/components/button";
import {
  BookOpen,
  DollarSign,
  GraduationCap,
  LucideIcon,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import React, { useMemo } from "react";

interface Props {
  summary?: IScholarshipSummary[];
}
const ScholarshipSummaryList: React.FC<Props> = ({ summary }) => {
  const list: {
    category: (typeof scholarshipCategories)[number];
    Icon: LucideIcon;
    title: string;
    subtitle: string;
    total: number;
    link: `/scholarships?category=${string}`;
  }[] = useMemo(() => {
    return [
      {
        category: "accommodation",
        Icon: UsersRound,
        title: "Accommodations & Housing",
        subtitle:
          "Financial assistance for housing and accommodation expenses.",
        total:
          summary?.find((s) => s.category === "accommodation")?._count._all ||
          0,
        link: `/scholarships?category=accommodation`,
      },
      {
        category: "tuition",
        Icon: GraduationCap,
        title: "Tuition Scholarships",
        subtitle: "Direct support for educational tuition cost.",
        total: summary?.find((s) => s.category === "tuition")?._count._all || 0,
        link: `/scholarships?category=tuition`,
      },

      {
        category: "application fees",
        Icon: DollarSign,
        title: "Application Fee Discounts",
        subtitle:
          "Reduces or waived application fees for educational programs.",
        total:
          summary?.find((s) => s.category === "application fees")?._count
            ._all || 0,
        link: `/scholarships?category=application fees`,
      },

      {
        category: "others",
        Icon: BookOpen,
        title: "Other Scholarships",
        subtitle: "Additional scholarship opportunities and financial aids.",
        total: summary?.find((s) => s.category === "others")?._count._all || 0,
        link: `/scholarships?category=others`,
      },
    ];
  }, [summary]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {list.map(({ category, Icon, title, subtitle, total, link }) => (
        <div
          key={category}
          className="space-y-5 rounded-lg border px-4 py-5 shadow"
        >
          <div className="bg-muted mx-auto w-fit rounded-full p-2">
            <Icon size={30} />
          </div>

          <div className="text-center">
            <h3 className="text-xl">{title}</h3>
            <p className="text-muted-foreground text-sm">{subtitle}</p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold">{total}</p>
            <p className="text-muted-foreground text-sm">
              Available Scholarships
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            className="w-full rounded-md text-sm"
          >
            <Link href={link} aria-label={`view ${category} scholarships`}>
              View Scholarships
            </Link>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ScholarshipSummaryList;
