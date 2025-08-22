import CustomBreadCrumb from "@/src/components/custom-bredcrumb";
import { env } from "@/src/config";
import { brandServerApi } from "@/src/lib/server";
import { sharedMetadata } from "@/src/utils";
import { ISchool } from "@workspace/shared";
import { Metadata } from "next";
import Script from "next/script";
import { cache } from "react";
import { School, WithContext } from "schema-dts";
import Alert from "@/src/components/alert";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Badge } from "@workspace/ui/components/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { BookTextIcon, ListFilterPlus, Share } from "lucide-react";
import FormatNumber from "@/src/components/format-number";
import { Button } from "@workspace/ui/components/button";
import CountryDisplay from "@/src/components/country-display";
import StateDisplay from "@/src/components/state-display";
import Jumbotron from "@/src/app/_components/jumbotron";
import SchoolProgramsList from "../../_components/program";

type Props = {
  params: Promise<{ slug: string }>;
};

const getSchool = cache(async (slug: string) => {
  const { data: school } = await brandServerApi.httpClient.request<ISchool>(
    `/schools/${slug}`,
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
  const { slug } = await params;
  const school = await getSchool(slug);

  return {
    ...sharedMetadata,
    title: school.name,
    description: school.overview,
    alternates: {
      canonical: `/schools/${school.slug}`,
    },
    keywords: school.name.split(" "),
    openGraph: {
      ...sharedMetadata.openGraph,
      images: [
        {
          url: school.logo.url,
          width: 1200,
          height: 630,
          alt: "School image",
        },
      ],
    },
    twitter: {
      ...sharedMetadata.twitter,
      images: {
        url: school.logo.url,
        alt: `School logo for ${school.name}`,
      },
    },
  } as Metadata;
}

export default async function SchoolProgramsDetails({ params }: Props) {
  try {
    const { slug } = await params;
    const school = await getSchool(slug);

    const schoolJsonLd: WithContext<School> = {
      "@context": "https://schema.org",
      "@type": "School",
      "@id": `${env.client.baseUrl}/schools/${school.slug}`,
      name: school.name,
      description: school.overview,
      image: school.schoolImage.url,
      url: `${env.client.baseUrl}/schools/${school.slug}`,
      logo: school.logo.url,
      address: {
        "@type": "PostalAddress",
        streetAddress: school.address,
        addressLocality: school.city,
        addressRegion: school.state,
        addressCountry: school.country,
      },
      sameAs: [school.link],
    };

    return (
      <>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolJsonLd) }}
        />

        <Jumbotron
          title={school.name}
          subtitle={`${school.address}`}
          backgroundImage={
            school.schoolImage.url || "/assets/images/backgrounds/school-bg.png"
          }
          overlay
        />

        <CustomBreadCrumb className="border-y" />

        {/* Brief Details */}
        <section className="bg-background sticky top-0 z-50 flex gap-4 !py-5">
          <Avatar className="size-10 md:size-14 lg:size-16">
            <AvatarFallback>{school.name[0]?.toUpperCase()}</AvatarFallback>
            <AvatarImage src={school.logo.url} alt={`${school.name}'s logo`} />
          </Avatar>

          <div className="w-full">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="!text-xl md:!text-3xl lg:!text-4xl">
                    {school.name}
                  </h2>

                  <CountryDisplay
                    isoCode={school.country}
                    hideName
                    flagProps={{
                      className: "!text-xl md:!text-3xl lg:!text-4xl",
                    }}
                  />
                </div>
                <div className="text-muted-foreground flex items-center gap-1 text-xs">
                  {school.address}, {school.city}{" "}
                  <StateDisplay
                    countryIsoCode={school.country}
                    stateIsoCode={school.state}
                  />
                  <CountryDisplay isoCode={school.country} hideFlag />
                </div>
              </div>

              <Button
                size="icon"
                variant="outline"
                className="hidden md:inline-flex"
              >
                <Share />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              {/* Institution Type */}
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="outline" className="uppercase">
                    {school.institutionType}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>Institution type</TooltipContent>
              </Tooltip>

              {/* Ownership type */}
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="outline" className="uppercase">
                    {school.ownershipType}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>Ownership type</TooltipContent>
              </Tooltip>

              {/* Programs Count */}
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="outline" className="h-full uppercase">
                    <FormatNumber value={school._count?.programs || 0} />
                    <BookTextIcon className="!size-2.5" />
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>Programs</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </section>

        <section id="school-programs-list" className="space-y-5 !py-5">
          <div className="flex items-center justify-end">
            <Button variant="outline">
              <ListFilterPlus /> Filters
            </Button>
          </div>
          <SchoolProgramsList school={school} />
        </section>
      </>
    );
  } catch (error) {
    return <Alert message="Error" />;
  }
}
