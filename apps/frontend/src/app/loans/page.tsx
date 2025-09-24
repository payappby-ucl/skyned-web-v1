import { env } from "@/src/config";
import { organization, sharedMetadata } from "@/src/utils";
import Script from "next/script";
import { WebPage, WithContext } from "schema-dts";
import { Metadata } from "next";
import Jumbotron from "../_components/jumbotron";
import {
  CheckCircleIcon,
  DollarSignIcon,
  MoveRightIcon,
  PiggyBankIcon,
  ShieldIcon,
  CheckCircle,
  DollarSign,
  Shield,
  ArrowRight,
} from "lucide-react";
import { Card } from "@workspace/ui/components/card";
import { LoanApplication } from "./_components/loan-application";

const title = "Study Loans";
const description =
  "Explore flexible study loan options to fund your international education and achieve your academic goals.";

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...sharedMetadata,
    title,
    description,
    alternates: {
      canonical: "/loans",
    },
    openGraph: {
      ...sharedMetadata.openGraph,
      title,
      description,
    },
    twitter: {
      ...sharedMetadata.twitter,
      title,
      description,
    },
  } as Metadata;
}

export default async function Loans() {
  const loansPageJsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${env.client.baseUrl}/loans`,
    reviewedBy: organization,
  };

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(loansPageJsonLd),
        }}
      />
      <Jumbotron
        title={
          <>
            Find the Best <span className="text-[#7ddf62]">Student</span> <br />{" "}
            <span className="text-[#7ddf62]">Loan</span> for Your Program
          </>
        }
        subtitle="We partner with MPOWER and Passage to connect you with the right loan based on your school, program, and visa status. Start by answering a few quick questions — it only takes 2 minutes."
        backgroundImage="/assets/images/backgrounds/loan.jpg"
        cta={{
          label: "Start Loan Check",
          href: "#loan-application",
          icon: MoveRightIcon,
        }}
        badge={{
          icon: PiggyBankIcon,
          text: "Flexible options | Low interest rates",
        }}
        overlay
      />

      <section className="from-background to-muted/20 bg-gradient-to-b py-24">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="sticky top-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-primary h-px w-8"></div>
                <span className="text-primary text-sm font-medium uppercase tracking-wider">
                  Why Choose Us
                </span>
              </div>
              <h2 className="text-foreground mb-6 text-balance text-4xl font-bold leading-tight lg:text-5xl">
                Built for Your
                <span className="text-primary block">Success</span>
              </h2>
              <p className="text-muted-foreground mb-8 text-xl leading-relaxed">
                We've streamlined the student loan process to be transparent,
                fast, and tailored to your educational journey.
              </p>
              <div className="text-primary flex items-center gap-2 font-medium">
                <span>Learn more about our process</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-6">
              {/* First card - larger, featured */}
              <Card className="group relative overflow-hidden border-0 bg-white p-8 shadow-sm transition-all duration-500 hover:shadow-xl">
                <div className="from-primary/10 absolute right-0 top-0 h-24 w-24 rounded-bl-3xl bg-gradient-to-br to-transparent"></div>
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="bg-primary flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110">
                      <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-foreground group-hover:text-primary mb-3 text-2xl font-bold transition-colors">
                      Quick Pre-Approval
                    </h3>
                    <p className="text-muted-foreground mb-4 text-lg leading-relaxed">
                      Get pre-approved in minutes with our streamlined process.
                      No lengthy paperwork or waiting periods.
                    </p>
                    <div className="text-primary text-sm font-medium">
                      Average approval time: 3 minutes
                    </div>
                  </div>
                </div>
              </Card>

              {/* Second row - two smaller cards */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="group relative overflow-hidden border-0 bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-xl">
                  <div className="from-[#96d228]/10 absolute right-0 top-0 h-16 w-16 rounded-bl-2xl bg-gradient-to-br to-transparent"></div>
                  <div className="mb-4">
                    <div className="bg-[#96d228] mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-foreground group-hover:text-[#96d228] mb-2 text-xl font-bold transition-colors">
                      Competitive Rates
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Access the best rates from our trusted lending partners
                    </p>
                  </div>
                </Card>

                <Card className="group relative overflow-hidden border-0 bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-xl">
                  <div className="from-green-600/10 absolute right-0 top-0 h-16 w-16 rounded-bl-2xl bg-gradient-to-br to-transparent"></div>
                  <div className="mb-4">
                    <div className="bg-green-600 mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-foreground group-hover:text-green-600 mb-2 text-xl font-bold transition-colors">
                      Secure & Trusted
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Your information is protected with bank-level security
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Application Form */}
      <section className="bg-accent/60 py-20" id="loan-application">
        <div className="grid grid-cols-1 gap-10">
          <div className="">
            <div className="mb-6 flex items-center gap-3">
              <div className="bg-primary h-px w-8"></div>
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                Loan Application
              </span>
            </div>
            <h2 className="text-foreground mb-6 text-balance text-4xl font-bold leading-tight lg:text-5xl">
              Ready to Take the
              <span className="text-primary block">Next Step?</span>
            </h2>
            <p className="text-muted-foreground mb-8 text-xl leading-relaxed">
              Complete your loan application to get started.
            </p>
          </div>
          <div className="bg-brand-900/10 rounded-lg">
          <div className="container mx-auto max-w-5xl p-4 lg:p-10">
            <LoanApplication />
          </div>
          </div>
        </div>
      </section>
    </>
  );
}
