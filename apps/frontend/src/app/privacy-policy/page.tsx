import { env } from "@/src/config";
import { organization, sharedMetadata } from "@/src/utils";
import Script from "next/script";
import { WebPage, WithContext } from "schema-dts";
import { Metadata } from "next";
import Jumbotron from "../_components/jumbotron";
import DateDisplay from "@/src/components/date-display";

const title = "Privacy Policy & Cookie Policy";
const description =
  'Skyned Consults Corporation ("we", "us", "our") is committed to protecting your privacy. This Privacy & Cookies Policy explains how we collect, use, disclose, and protect your personal information when you visit or use our website and services.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...sharedMetadata,
    title,
    description,
    alternates: {
      canonical: "/privacy-policy",
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

export default async function PrivacyPolicy() {
  const privacyPolicyPageJsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${env.client.baseUrl}/privacy-policy`,
    reviewedBy: organization,
  };

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(privacyPolicyPageJsonLd),
        }}
      />

      <Jumbotron
        title={title}
        backgroundImage="/assets/images/backgrounds/privacy-bg.png"
      />

      <section className="bg-accent">
        {/*  Skyned Consults  */}
        <div className="mx-auto max-w-3xl space-y-5">
          <h2 className="text-3xl">Privacy Policy</h2>

          {/* Introduction */}
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl">1. Introduction</h3>
            <p className="text-md">
              Skyned Consults Corporation ("we", "us", "our") is committed to
              protecting your privacy. This Privacy & Cookies Policy explains
              how we collect, use, disclose, and protect your personal
              information when you visit or use our website and services.
            </p>
          </div>

          {/* Data Collection */}
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl">2. Information We Collect</h3>
            <ul className="ml-8 list-disc space-y-1">
              <li>
                <p className="text-md">
                  <strong>Personal Data:</strong> Includes your name, email
                  address, phone number, educational history, application
                  information used to provide study abroad consultations.
                </p>
              </li>
              <li>
                <p className="text-md">
                  <strong>Usage Data:</strong> Includes IP address, browser
                  type, pages visited, access times, device and operating system
                  details.
                </p>
              </li>
              <li>
                <p className="text-md">
                  <strong>Cookies & Tracking Technologies:</strong> We use
                  cookies, web beacons, and similar tools to enhance your
                  experience, remember preferences, and analyze site usage.
                </p>
              </li>
            </ul>
          </div>

          {/* How we use your information */}
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl">
              3. How We Use Your Information
            </h3>
            <p className="text-md">We may use your information to:</p>
            <ul className="ml-8 list-disc space-y-1">
              <li>
                <p className="text-md">
                  Provide, maintain, and improve our services.
                </p>
              </li>
              <li>
                <p className="text-md">Respond to inquiries or requests.</p>
              </li>
              <li>
                <p className="text-md">
                  Send important notices and marketing communications with your
                  consent.
                </p>
              </li>
              <li>
                <p className="text-md">
                  Analyze trends, monitor site usage, and prevent fraud.
                </p>
              </li>
            </ul>
          </div>

          {/* Cookies & Tracking */}
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl">4. Cookies & Tracking</h3>
            <ul className="ml-8 list-disc space-y-1">
              <li>
                <p className="text-md">
                  <strong>Essential Cookies:</strong> Required for site
                  functionality (e.g., session management).
                </p>
              </li>
              <li>
                <p className="text-md">
                  <strong>Performance & Analytics Cookies:</strong> Help us
                  understand how you use the site and improve performance.
                </p>
              </li>
              <li>
                <p className="text-md">
                  You may manage or disable cookies via your browser settings,
                  though this may affect site functionality.
                </p>
              </li>
            </ul>
          </div>

          {/* How We Share Your Information */}
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl">
              5. How We Share Your Information
            </h3>
            <p className="text-md">
              We do not sell your personal data. We may share data with:
            </p>
            <ul className="ml-8 list-disc space-y-1">
              <li>
                <p className="text-md">
                  <strong>Service Providers:</strong> Partners who assist us
                  (e.g., hosting, analytics, payment processing) under
                  confidentiality.
                </p>
              </li>
              <li>
                <p className="text-md">
                  {" "}
                  <strong>Legal Authorities:</strong>When required by law or to
                  protect our rights.
                </p>
              </li>
              <li>
                <p className="text-md">
                  <strong>Business Transfers:</strong> In case of merger or
                  acquisition, as permitted by law.
                </p>
              </li>
            </ul>
          </div>

          {/* Data Security & Retention */}
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl">
              6. Data Security & Retention
            </h3>
            <p className="text-md">
              We employ industry-appropriate security measures to protect your
              data. We retain personal data only as long as necessary for
              defined purposes or as required by law.
            </p>
          </div>

          {/* Your Rights */}
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl">7. Your Rights</h3>
            <p className="text-md">You may:</p>
            <ul className="ml-8 list-disc space-y-1">
              <li>
                <p className="text-md">Access or correct your personal data.</p>
              </li>
              <li>
                <p className="text-md">
                  Request deletion, restriction, or object to processing.
                </p>
              </li>
              <li>
                <p className="text-md">Opt-out of marketing communications.</p>
              </li>
              <li>
                <p className="text-md">
                  Lodge a complaint with a relevant supervisory authority if
                  concerned about our handling of your data.
                </p>
              </li>
            </ul>
          </div>

          {/* Children's Privacy */}
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl">8. Children's Privacy</h3>
            <p className="text-md">
              Our services are not intended for children under 13 (or higher age
              if required by local law). We do not knowingly collect data from
              minors.
            </p>
          </div>

          {/* Updates to This Policy */}
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl">8. Updates to This Policy</h3>
            <p className="text-md">
              We may update this policy periodically. We will post changes on
              our site with the effective date. Continued use implies
              acceptance.
            </p>
          </div>

          {/* Contact Us */}
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl">10. Contact Us</h3>
            <p className="text-md">
              For questions, data requests, or concerns, please contact:
            </p>
            <p className="text-md">
              <strong>Email:</strong>{" "}
              <a href="mailto:info@skynedconsults.com" className="underline">
                info@skynedconsults.com
              </a>
            </p>
            <address className="text-md">
              Lagos Office:
              <br />
              Unit 25, Westbrook Mall, 4th round about,
              <br /> Chisco Ikate, Lagos.
              <br />
              Nigeria.
            </address>
            <address className="text-md">
              Abuja Office:
              <br />
              Novare Central Mall 2nd Floor
              <br /> Plot 502 Dalaba Street,
              <br />
              Off Michael Okpara Str,
              <br />
              Abuja Wuse Zone 5 Abuja
              <br />
              Nigeria. Nigeria.
            </address>
          </div>
        </div>
      </section>

      <section className="bg-accent">
        {/*  Cookies  */}
        <div className="text-md mx-auto max-w-3xl space-y-5">
          <h2 className="text-3xl">Cookies</h2>
          <p>
            Use cookies on our website to support technical features that
            enhance your user experience.
          </p>
          <p>
            We also use analytics & advertising services. To opt-out click for
            more information.
          </p>
          <p>
            <strong>I understand</strong>
          </p>
          <p>
            <strong>More information</strong>
          </p>
          <p>
            Cookies Preference Center
            <br />
            When you visit any website, it may store or retrieve information on
            your browser, mostly in the form of cookies. This information might
            be about you, your preferences or your device and is mostly used to
            make the site work as you expect it to. The information does not
            usually directly identify you, but it can give you a more
            personalized web experience. Because we respect your right to
            privacy, you can choose not to allow some types of cookies. Click on
            the different category headings to find out more and change our
            default settings. However, blocking some types of cookies may impact
            your experience of the site and the services we are able to offer.
          </p>

          <p>
            Strictly Necessary Cookies:
            <br />
            These cookies are necessary for the website to function and cannot
            be switched off in our systems. They are usually only set in
            response to actions made by you which amount to a request for
            services, such as setting your privacy preferences, logging in or
            filling in forms. You can set your browser to block or alert you
            about these cookies, but some parts of the site will not then work.
            These cookies do not store any personally identifiable information.
          </p>

          <p>
            Performance Cookies:
            <br />
            These cookies allow us to count visits and traffic sources so we can
            measure and improve the performance of our site. They help us to
            know which pages are the most and least popular and see how visitors
            move around the site. All information these cookies collect is
            aggregated and therefore anonymous. If you do not allow these
            cookies we will not know when you have visited our site, and will
            not be able to monitor its performance.
          </p>

          <p>
            Functional Cookies:
            <br />
            These cookies enable the website to provide enhanced functionality
            and personalization. They may be set by us or by third party
            providers whose services we have added to our pages. If you do not
            allow these cookies then some or all of these services may not
            function properly.
          </p>

          <p>
            Targeting Cookies:
            <br />
            These cookies may be set through our site by our advertising
            partners. They may be used by those companies to build a profile of
            your interests and show you relevant adverts on other sites. They do
            not store directly personal information, but are based on uniquely
            identifying your browser and internet device. If you do not allow
            these cookies, you will experience less targeted advertising.
          </p>
          <div className="flex items-center gap-2">
            <p className="text-xs">Last Updated</p>
            <DateDisplay date={new Date(2025, 8, 24, 1, 7)} />
          </div>
        </div>
      </section>
    </>
  );
}
