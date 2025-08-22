import CustomBreadCrumb from "@/src/components/custom-bredcrumb";
import { env } from "@/src/config";
import { brandServerApi } from "@/src/lib/server";
import { sharedMetadata } from "@/src/utils";
import { EnglishProficiency, IProgram } from "@workspace/shared";
import { Metadata } from "next";
import Script from "next/script";
import { cache } from "react";
import { EducationalOccupationalProgram, WithContext } from "schema-dts";
import Alert from "@/src/components/alert";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import {
  Award,
  Banknote,
  CalendarDays,
  Clock,
  FileText,
  GraduationCap,
  HandCoins,
  MapPinCheck,
  NotebookPen,
  NotebookText,
  Share,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";
import Link from "next/link";
import StateDisplay from "@/src/components/state-display";
import CountryDisplay from "@/src/components/country-display";
import FormatNumber from "@/src/components/format-number";
import DateDisplay from "@/src/components/date-display";
import TabWatcher from "./_components/tab-watcher";
import { Separator } from "@workspace/ui/components/separator";
import { ProficiencyDisplay } from "@workspace/ui/components/proficiency-display";
import ProgramIntakes from "./_components/intakes";
import Fee from "./_components/fee";
import EducationLevel from "./_components/education-level";

type Props = {
  params: Promise<{ slug: string; pslug: string }>;
};

const getProgram = cache(async (slug: string, pslug: string) => {
  const { data: school } = await brandServerApi.httpClient.request<IProgram>(
    `/schools/${slug}/programs/${pslug}`,
    "GET",
    {
      next: {
        revalidate: 86400,
      },
    },
  );

  return school;
});

export async function generateMetadata({ params }: Props) {
  const { slug, pslug } = await params;
  const program = await getProgram(slug, pslug);

  return {
    ...sharedMetadata,
    title: program.name,
    description: program.overview,
    alternates: {
      canonical: `/schools/${slug}/programs/${program.slug}`,
    },
    keywords: [sharedMetadata.keywords, program.name],
    openGraph: {
      ...sharedMetadata.openGraph,
      images: [
        {
          url: program.school?.logo.url,
          width: 1200,
          height: 630,
          alt: "School image",
        },
      ],
    },
    twitter: {
      ...sharedMetadata.twitter,
      images: {
        url: program.school?.logo.url,
        alt: `School logo for ${program.school?.name}`,
      },
    },
  } as Metadata;
}

export default async function ProgramDetails({ params }: Props) {
  try {
    const { slug, pslug } = await params;
    const program = await getProgram(slug, pslug);

    console.log(program);

    const programJsonLd: WithContext<EducationalOccupationalProgram> = {
      "@context": "https://schema.org",
      "@type": "EducationalOccupationalProgram",
      "@id": `${env.client.baseUrl}/schools/${slug}/programs/${program.slug}`,
      name: program.name,
      description: program.overview,
      timeToComplete: `${program.duration} ${program.timeframe}`,
      provider: {
        "@type": "CollegeOrUniversity",
        name: program.school?.name,
        description: program.school?.overview,
        image: program.school?.schoolImage.url,
        url: `${env.client.baseUrl}/schools/${program.school?.slug}`,
        logo: program.school?.logo.url,
        address: {
          "@type": "PostalAddress",
          streetAddress: program.school?.address,
          addressLocality: program.school?.city,
          addressRegion: program.school?.state,
          addressCountry: program.school?.country,
        },
        sameAs: [program.school!.link],
      },
    };

    return (
      <>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(programJsonLd) }}
        />

        <Image
          src={program.school?.schoolImage.url || ""}
          width={500}
          height={200}
          alt={`${program.school?.name}'s image`}
          className="h-[100px] w-[100vw] object-cover"
        />

        <CustomBreadCrumb className="border-y" />

        {/* Brief Details */}
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
                  href={`/schools/${slug}`}
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
                <div className="flex items-center gap-1 px-2">
                  <FileText size={15} />
                  <FormatNumber value={2500} />
                </div>

                {/* Last Updated */}
                <div className="flex items-center gap-1 px-2">
                  <Clock size={15} />
                  <DateDisplay date={program.updatedAt} className="!text-sm" />
                </div>
              </div>
            </div>

            {/* CTA's */}
            <div className="flex w-full items-center gap-4 md:w-fit">
              {/* Share Button */}
              <Button
                size="icon"
                variant="outline"
                className="hidden md:inline-flex"
              >
                <Share />
              </Button>

              {/* Apply Button */}
              <Button variant="brand" className="!w-full md:w-fit">
                Apply Now
              </Button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 scroll-smooth !py-5 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            {/* Overview */}
            <p className="whitespace-pre-wrap">{program.overview}</p>

            {/* Tab Info */}
            <TabWatcher program={program} />

            {/* Description */}
            <article id="description" className="space-y-4">
              <h2 className="flex items-center gap-2 !text-2xl">
                <NotebookPen className="text-muted-foreground" /> Description
              </h2>

              <div
                dangerouslySetInnerHTML={{
                  __html: program.description,
                }}
                className="wysiwyg-view"
              />
            </article>

            {/* Requirements */}
            {program.requirements ? (
              <article id="requirements" className="space-y-4">
                <h2 className="flex items-center gap-2 !text-2xl">
                  <NotebookText className="text-muted-foreground" />{" "}
                  Requirements
                </h2>

                <div
                  dangerouslySetInnerHTML={{
                    __html: program.requirements || "",
                  }}
                  className="wysiwyg-view"
                />
              </article>
            ) : null}
          </div>

          {/* Details */}
          <div className="space-y-2">
            <div className="space-y-2 rounded-md border p-4">
              <h3 className="!text-xl">Cost and Duration</h3>
              <Separator />
              <div className="space-y-3">
                {/* Degree Award */}
                <div className="flex items-center gap-4">
                  <div className="bg-accent rounded-lg p-2">
                    <Award />
                  </div>
                  <div>
                    <p className="text-md font-semibold">
                      {program.degreeType as string}
                    </p>
                    <small className="text-muted-foreground">
                      Program Award
                    </small>
                  </div>
                </div>

                {/* Minimum Education Level */}
                <div className="flex items-center gap-4">
                  <div className="bg-accent rounded-lg p-2">
                    <GraduationCap />
                  </div>
                  <div>
                    <p className="text-md font-semibold">
                      <EducationLevel
                        level={program.minimumEducationLevel}
                        degree={program.minimumEducationDegree}
                      />
                    </p>
                    <small className="text-muted-foreground">
                      Minimum Education Level
                    </small>
                  </div>
                </div>

                {/* Program Duration */}
                <div className="flex items-center gap-4">
                  <div className="bg-accent rounded-lg p-2">
                    <CalendarDays />
                  </div>
                  <div>
                    <p className="text-md font-semibold capitalize">
                      {program.duration} {program.timeframe}
                      {program.duration > 1 ? "'s" : ""}
                    </p>
                    <small className="text-muted-foreground">
                      Program Duration
                    </small>
                  </div>
                </div>

                {/* Tuition Fee */}
                <div className="flex items-center gap-4">
                  <div className="bg-accent rounded-lg p-2">
                    <Banknote />
                  </div>
                  <div>
                    <p className="text-md flex items-center font-semibold">
                      <Fee
                        currency={program.school?.currency!}
                        amount={program.tuitionFee}
                      />{" "}
                      ({(program.tuitionFeeType as string).replace("_", " ")})
                    </p>
                    <small className="text-muted-foreground">Tuition Fee</small>
                  </div>
                </div>

                {/* Application Fee */}
                <div className="flex items-center gap-4">
                  <div className="bg-accent rounded-lg p-2">
                    <HandCoins />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p
                        className={`text-md flex items-center font-semibold ${program.applicationFeeDiscount > 0 ? "line-through" : ""}`}
                      >
                        <Fee
                          currency={program.school?.currency!}
                          amount={program.applicationFee}
                        />
                      </p>

                      {program.applicationFeeDiscount ? (
                        <p className="text-md flex items-center font-semibold">
                          <Fee
                            currency={program.school?.currency!}
                            amount={
                              program.applicationFee -
                              program.applicationFee *
                                (program.applicationFeeDiscount / 100)
                            }
                          />
                        </p>
                      ) : null}
                    </div>
                    <small className="text-muted-foreground">
                      Application Fee
                    </small>
                  </div>
                </div>
              </div>
            </div>

            {/* Proficiencies */}
            {program.proficiencies ? (
              <div className="space-y-2 rounded-md border p-4">
                <h3 className="!text-xl">Minimum English Proficiency</h3>
                <Separator />
                <div className="space-y-3">
                  {program.proficiencies.map(({ test, score }) => {
                    const gcfe = EnglishProficiency.getCefr(test, score);
                    return (
                      <ProficiencyDisplay
                        key={test}
                        name={gcfe.name}
                        tags={gcfe.tags}
                        test={test}
                        score={score}
                        publicUser
                      />
                    );
                  })}
                </div>
              </div>
            ) : null}

            {/* Intakes */}
            <ProgramIntakes intakes={program.intakes} program={program} />
          </div>
        </section>
      </>
    );
  } catch (error) {
    return <Alert message="Error" />;
  }
}
