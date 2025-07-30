import { env } from "@/src/config";
import { organization, sharedMetadata } from "@/src/utils";
import { Metadata } from "next";
import Script from "next/script";
import { WithContext, WebPage } from "schema-dts";
import { redirect } from "next/navigation";
import { brandServerApi } from "@/src/lib/server";
import { IFaq } from "@workspace/shared";
import FAQs from "./_components/faqs";
import Jumbotron from "../_components/jumbotron";
import Image from "next/image";

const title = "Frequently Asked Questions";
const description = `These are the most commonly asked questions about ${env.organization.name}`;

export const metadata: Metadata = {
  ...sharedMetadata,
  title,
  description,
  alternates: {
    canonical: "/faqs",
  },
};

export default async function Faqs() {
  try {
    const { data } = await brandServerApi.httpClient.request<
      Pick<IFaq, "answer" | "question">[]
    >("/faqs/list", "GET", {
      next: {
        revalidate: 604800,
      },
    });

    const jsonLd: WithContext<WebPage> = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url: `${env.client.baseUrl}/faqs`,
      reviewedBy: organization,
      mainEntityOfPage: {
        "@type": "FAQPage",
        mainEntity: data.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    };

    return (
      <>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Jumbotron
          title={title}
          subtitle={description}
          backgroundImage="/assets/images/backgrounds/faqs.png"
          cta={{
            label: "Chat with our friendly team",
            href: "/contact",
          }}
        />

        <section
          className="bg-[#fafafa]"
          aria-labelledby="equipment-heading"
        >
          <div className="container px-6">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-14">
              <article>
                <header>
                  <h2
                    id="faqs"
                    className="text-primary text-3xl font-bold md:text-4xl"
                  >
                    Frequently Asked Questions
                  </h2>
                </header>
                <div className="mt-6 space-y-6">
                  <FAQs faqs={data} />
                </div>
              </article>

              <div className="hidden lg:grid grid-cols-1 gap-4">
                <Image
                  src="/assets/images/backgrounds/faq-1.png"
                  alt="Frequently Asked Questions"
                  width={600}
                  height={400}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="h-auto w-full rounded-lg shadow-md"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                <div className="grid grid-cols-2 gap-4">
                  <Image
                    src="/assets/images/backgrounds/faq-2.png"
                    alt="Frequently Asked Questions"
                    width={300}
                    height={200}
                    sizes="(max-width: 768px) 50vw, 300px"
                    className="h-full w-full rounded-lg shadow-md object-cover"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                  <Image
                    src="/assets/images/backgrounds/faq-3.png"
                    alt="Frequently Asked Questions"
                    width={300}
                    height={200}
                    sizes="(max-width: 768px) 50vw, 300px"
                    className="h-full w-full rounded-lg shadow-md object-cover"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  } catch (error) {
    redirect("/");
  }
}
