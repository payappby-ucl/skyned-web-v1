import CustomBreadCrumb from "@/src/components/custom-bredcrumb";
import { env } from "@/src/config";
import { brandServerApi } from "@/src/lib/server";
import { sharedMetadata } from "@/src/utils";
import { IProgram } from "@workspace/shared";
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
  Clock,
  FileText,
  GraduationCap,
  MapPinCheck,
  Share,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";
import Link from "next/link";
import StateDisplay from "@/src/components/state-display";
import CountryDisplay from "@/src/components/country-display";
import FormatNumber from "@/src/components/format-number";
import DateDisplay from "@/src/components/date-display";
import { ProgramHeader } from "../_components/program-header";

type Props = {
  params: Promise<{ slug: string; pslug: string }>;
};

const getProgram = cache(async (slug: string, pslug: string) => {
  const { data: program } = await brandServerApi.httpClient.request<IProgram>(
    `/schools/${slug}/programs/${pslug}`,
    "GET",
    {
      next: {
        revalidate: 86400,
      },
    },
  );

  return program;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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
      title: program.name,
      description: program.overview,
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
      title: program.name,
      description: program.overview,
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
        <ProgramHeader program={program} applyHidden />

        <section>Apply</section>
      </>
    );
  } catch (error) {
    return <Alert message="Error" />;
  }
}
