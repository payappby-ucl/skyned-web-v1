import { env } from "@/src/config";
import { organization, sharedMetadata } from "@/src/utils";
import Script from "next/script";
import { WebPage, WithContext } from "schema-dts";
import { Metadata } from "next";
import Jumbotron from "../_components/jumbotron";
import { ShieldCheckIcon, TagIcon, BadgeCheckIcon, ZapIcon } from "lucide-react";
import { PaymentButton } from "@/src/components/payment/payment-button";

const title = "Test Vouchers";
const description =
  "Buy GRE, TOEFL, Duolingo, and Pearson test vouchers at the best prices through Skyned's ApplyBoard partnership.";

export const metadata: Metadata = {
  ...sharedMetadata,
  title,
  description,
  alternates: {
    canonical: "/test-vouchers",
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
};

const tests = [
  {
    name: "GRE",
    fullName: "Graduate Record Examination",
    icon: "🎓",
    description: "Required for graduate school admissions in the US and Canada.",
  },
  {
    name: "TOEFL",
    fullName: "Test of English as a Foreign Language",
    icon: "📝",
    description: "Accepted by over 11,000 universities worldwide.",
  },
  {
    name: "Duolingo",
    fullName: "Duolingo English Test",
    icon: "🦜",
    description: "Fast, affordable, and accepted by 4,500+ institutions.",
  },
  {
    name: "Pearson",
    fullName: "Pearson Test of English",
    icon: "📊",
    description: "Recognised by thousands of universities, colleges, and professional bodies.",
  },
];

const features = [
  {
    icon: TagIcon,
    title: "Best Market Prices",
    description: "We offer test vouchers at the most competitive prices — powered by our ApplyBoard partnership.",
    color: "bg-blue-600",
  },
  {
    icon: ShieldCheckIcon,
    title: "Secure Checkout",
    description: "All purchases are processed through a secure iFrame — your payment data never touches our servers.",
    color: "bg-indigo-600",
  },
  {
    icon: BadgeCheckIcon,
    title: "Instant Delivery",
    description: "Receive your voucher code immediately after purchase so you can book your test right away.",
    color: "bg-violet-600",
  },
  {
    icon: ZapIcon,
    title: "Expert Guidance",
    description: "Our team is on hand to help you choose the right test and guide your prep.",
    color: "bg-purple-600",
  },
];

export default function TestVouchers() {
  const pageJsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${env.client.baseUrl}/test-vouchers`,
    reviewedBy: organization,
  };

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />

      <Jumbotron
        title={
          <>
            Test Vouchers at{" "}
            <span className="text-[#7ddf62]">the Best Prices</span>
          </>
        }
        subtitle="Buy GRE, TOEFL, Duolingo, and Pearson vouchers directly through Skyned — competitive pricing, secure checkout, instant delivery."
        backgroundImage="/assets/images/backgrounds/pattern-1.png"
        badge={{
          icon: ShieldCheckIcon,
          text: "Powered by ApplyBoard | Best market prices",
        }}
        overlay
      />

      {/* Tests grid */}
      <section className="bg-background py-20">
        <div className="container mx-auto space-y-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="bg-primary h-px w-8" />
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                Available Tests
              </span>
              <div className="bg-primary h-px w-8" />
            </div>
            <h2 className="text-foreground text-4xl font-bold leading-tight lg:text-5xl">
              Which test do you need?
            </h2>
            <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto">
              Click the button below to browse all available vouchers and purchase securely through our portal.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tests.map(({ name, fullName, icon, description }) => (
              <div
                key={name}
                className="group bg-background rounded-2xl p-6 shadow-sm border border-border transition-all duration-300 hover:shadow-lg space-y-3 text-center"
              >
                <div className="text-4xl">{icon}</div>
                <h3 className="text-foreground font-bold text-xl">{name}</h3>
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">{fullName}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-4">
            <PaymentButton label="Browse & Buy Test Vouchers" color="#3477FE" size="large" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="from-background to-muted/20 bg-gradient-to-b py-24">
        <div className="container mx-auto">
          <div className="mb-12 text-center space-y-4">
            <h2 className="text-foreground text-3xl font-bold lg:text-4xl">
              Why buy through Skyned?
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description, color }) => (
              <div
                key={title}
                className="group bg-background rounded-2xl p-6 shadow-sm border border-border transition-all duration-300 hover:shadow-lg space-y-4"
              >
                <div className={`${color} flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-foreground font-bold text-lg">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
