"use client";

import CountryDisplay from "@/src/components/country-display";
import DateDisplay from "@/src/components/date-display";
import { SocialShare } from "@/src/components/social-share";
import StateDisplay from "@/src/components/state-display";
import { env } from "@/src/config";
import { IProgram } from "@workspace/shared";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { GraduationCap, MapPinCheck, Clock } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  program: IProgram;
  applyHidden?: boolean;
}
export const ProgramHeader: React.FC<Props> = ({ program, applyHidden }) => {
  return (
    <section
      id="sticky-main"
      className="bg-background sticky top-0 z-50 flex gap-4 !py-5"
    >
      <Avatar>
        <AvatarFallback>
          {program.school?.name[0]?.toUpperCase()}
        </AvatarFallback>
        <AvatarImage
          src={program.school?.logo.url}
          alt={`${program.school?.name}'s logo`}
        />
      </Avatar>

      <div className="flex flex-1 flex-col items-center gap-4 md:flex-row md:justify-between">
        <div>
          <h1 className="!text-xl md:!text-2xl">{program.name}</h1>
          <div className="text-muted-foreground hidden items-center gap-1 divide-x text-sm md:flex">
            {/* School Name */}
            <Link
              href={`/schools/${program.school?.slug}`}
              className="flex items-center gap-1 pr-2 hover:underline"
            >
              <GraduationCap size={15} />
              {program.school?.name}
            </Link>

            {/* Location */}
            <div className="flex items-center gap-1 px-2">
              <MapPinCheck size={15} />
              <StateDisplay
                stateIsoCode={program.school?.state || ""}
                countryIsoCode={program.school?.country || ""}
              />

              <CountryDisplay isoCode={program.school?.country || ""} />
            </div>

            {/* Application Count */}
            {/* <div className="flex items-center gap-1 px-2">
              <FileText size={15} />
              <FormatNumber value={2500} />
            </div> */}

            {/* Last Updated */}
            <div className="flex items-center gap-1 px-2">
              <Clock size={15} />
              <DateDisplay date={program.updatedAt} className="!text-sm" />
            </div>
          </div>
        </div>

        {/* CTA's */}
        <div className="flex w-full flex-col gap-4 md:w-fit md:flex-row md:items-center">
          {/* Share Button */}
          <SocialShare
            title={`Check out ${program.name}`}
            text={`I found a great program at ${program.school?.name}`}
            url={`${env.client.baseUrl}/schools/${program.school?.slug}/programs/${program.slug}`}
            context="Program"
            imageUrl={`${program.school?.logo.url || env.client.baseUrl + "/assets/images/brand/logo.png"}`}
          />

          {/* Apply Button */}
          {/* {!applyHidden ? (
            <Button asChild variant="brand" className="!w-full md:w-fit">
              <Link
                href={`/schools/${program.school?.slug}/programs/${program.slug}/apply`}
              >
                Apply Now
              </Link>
            </Button>
          ) : null} */}
        </div>
      </div>
    </section>
  );
};
