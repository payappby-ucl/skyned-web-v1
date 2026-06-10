import type { Metadata } from "next";
import { Manrope, Poppins } from "next/font/google";
import { Graph } from "schema-dts";
import "@workspace/ui/globals.css";
import { AuthProvider } from "@/src/components/providers/auth-provider";
import Nav from "@/src/components/nav";
import { Toaster } from "@workspace/ui/components/sonner";
import { ThemeProviders } from "../components/providers/theme-provider";
import { organization, sharedMetadata } from "../utils";
import { env } from "../config";
import Script from "next/script";
import Footer from "../components/footer/footer";
import { CookieContextProvider } from "../components/providers/cookie-consent";
import Analytics from "./_components/analytics";
import CookieBanner from "./_components/cookie/cookie-banner";
import TanstackQueryProvider from "../components/providers/tanstack-provider";
import WhatsAppWidget from "../components/chats/whatsapp";
import { Navigation } from "../components/navigation";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...sharedMetadata,
  title: {
    default: "Skyned Consults Corporation",
    template: "%s | Skyned Consults Corporation",
  },
  description:
    "We offer free expert support for international study applications into bachelor's, master's & diploma programs. Get guidance on admissions, visas, and study funding.",
  // alternates: {
  //   canonical: "/",
  // languages: {
  //   "en-US": "/en-US",
  //   "de-DE": "/de-DE",
  // },
  // },

  // authors: [{ name: "Seb" }, { name: "Josh", url: "https://nextjs.org" }],
  // creator: "Jiachi Liu",
  // publisher: "Sebastian Markbåge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ? Organization and website JSON-LD
  const baseJSONLD: Graph = {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      {
        "@type": "WebSite",
        name: env.organization.name,
        url: env.client.baseUrl,
        // potentialAction: {
        //   "@type": "SearchAction",
        //   target: "https://yourwebsite.com/search?q={search_term_string}",
        //   "query-input": "required name=search_term_string",
        // },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${poppins.variable} ${manrope.variable} antialiased`}
        suppressHydrationWarning
      >
        <CookieContextProvider>
          <Analytics />
          <TanstackQueryProvider>
            <ThemeProviders>
              <AuthProvider>
                <Navigation>
                  <Nav />
                </Navigation>
                <main>{children}</main>
                <Footer />
              </AuthProvider>
              <Toaster richColors closeButton />
              <CookieBanner />
            </ThemeProviders>
            <WhatsAppWidget />
          </TanstackQueryProvider>
        </CookieContextProvider>
      </body>

      {/* JSON-LD */}
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(baseJSONLD) }}
      />

      {/* Payment Widget */}
      <Script
        id="payment-widget"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,o,f,js,fjs){
              w['PaymentWidget']=o;w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
              js=d.createElement(s);fjs=d.getElementsByTagName(s)[0];
              js.id=o;js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);
            }(window,document,'script','paymentWidget','https://cdn.paytring.com/js/quick/embeded.js'));

            paymentWidget('init', {
              universityId: 'Skyned',
              globalDefault: {
                domain: 'quick.paytring.com/ecom/v/applyboard?cc=true&category=660601864373',
                name: 'ApplyBoard Payments'
              },
              useIframe: true,
              floatingButton: {
                text: 'Buy Test Voucher',
                position: 'left',
                backgroundColor: '#3477FE'
              }
            });
          `,
        }}
      />
    </html>
  );
}
