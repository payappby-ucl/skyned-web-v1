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
import { AlertCircle } from "lucide-react";
import Image from "next/image";
import { ProgramHeader } from "../_components/program-header";
import { ApplyForm } from "../_components/apply-form";
import {
  AlertDescription,
  AlertTitle,
  Alert as FormAlert,
} from "@workspace/ui/components/alert";

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

        <section className="space-y-10">
          <FormAlert className="mx-auto max-w-2xl">
            <AlertTitle>Apply</AlertTitle>
            <AlertDescription>
              Thank you for your interest in {program.name}. Please fill the
              form below and we'll reach out to you
            </AlertDescription>
          </FormAlert>
          <ApplyForm program={program} />
        </section>
      </>
    );
  } catch (error) {
    return <Alert message="Error" />;
  }
}
