"use client";

import CountryDisplay from "@/src/components/country-display";
import FormatCurrency from "@/src/components/format-currency";
import StateDisplay from "@/src/components/state-display";
import { IProgram } from "@workspace/shared";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { School } from "lucide-react";
import Link from "next/link";
import React, { useMemo } from "react";

interface Props {
  program: IProgram;
}
const ProgramCard: React.FC<Props> = ({ program }) => {
  const discount = useMemo(() => program.applicationFeeDiscount, [program]);
  return (
    <article className="h-full">
      <Card className="h-full">
        <CardHeader>
          <div className="flex gap-2">
            <Avatar>
              <AvatarFallback>
                {program.school?.name[0]?.toUpperCase()}
              </AvatarFallback>
              <AvatarImage
                src={program.school?.logo.url}
                alt={`${program.school?.name}'s logo`}
              />
            </Avatar>
            <div className="space-y-2">
              <CardTitle>
                <Link
                  href={`/schools/${program.school?.slug}/programs/${program.slug}`}
                  className="text-md hover:underline md:text-base"
                  // target="_blank"
                >
                  {program.name}
                </Link>
              </CardTitle>
              <CardDescription>
                <Link
                  href={`/schools/${program.school?.slug}`}
                  className="flex items-center gap-2 hover:underline"
                  // target="_blank"
                >
                  <School className="!size-4" /> {program.school?.name}
                </Link>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* Location */}
          <div className="text-muted-foreground flex items-center gap-1 text-sm">
            <StateDisplay
              stateIsoCode={program.school?.state || ""}
              countryIsoCode={program.school?.country || ""}
            />
            <CountryDisplay isoCode={program.school?.country || ""} />
          </div>

          {/* Overview */}
          <p className="md:text-md line-clamp-3 text-ellipsis whitespace-pre-line text-sm">
            {program.overview}
          </p>

          {/* Fees */}
          <div className="grid grid-cols-3 items-center justify-center gap-1 border-t pt-3">
            <div className="text-center">
              <p className="text-brand dark:text-foreground text-[6px] font-bold uppercase md:text-[9px]">
                Tuition Fee ({program.tuitionFeeType.replaceAll("_", " ")})
              </p>
              <p className="md:text-md text-sm font-bold">
                <FormatCurrency
                  amount={program.tuitionFee}
                  currency={program.school?.currency}
                  currencyDisplay="symbol"
                />
              </p>
            </div>

            <div className="text-center">
              <p className="text-brand dark:text-foreground text-[6px] font-bold uppercase md:text-[9px]">
                Application Fee
              </p>
              <p className="md:text-md text-sm font-bold">
                <FormatCurrency
                  amount={program.applicationFee}
                  currency={program.school?.currency}
                  currencyDisplay="symbol"
                />
              </p>
            </div>

            <div className="text-center">
              <p className="text-brand dark:text-foreground text-[6px] font-bold uppercase md:text-[9px]">
                Discount*
              </p>
              <p
                className={`${discount > 0 ? "bg-brand rounded-md px-4 py-1 !text-sm text-white" : ""} md:text-md mx-auto w-fit text-sm font-bold`}
              >
                {discount}%
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild variant="brand" className="!w-full md:w-fit">
            <Link
              href={`/schools/${program.school?.slug}/programs/${program.slug}`}
            >
              View More
            </Link>
          </Button>

          {/* <Button asChild variant="brand" className="!w-full md:w-fit">
            <Link
              href={`/schools/${program.school?.slug}/programs/${program.slug}/apply`}
            >
              Apply Now
            </Link>
          </Button> */}
        </CardFooter>
      </Card>
    </article>
  );
};

export default ProgramCard;
