import type { Metadata } from "next";
import { Manrope, Poppins } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "@workspace/ui/globals.css";
import { AuthProvider } from "@/src/components/providers/auth-provider";
import Nav from "@/src/components/nav";
import { Toaster } from "@workspace/ui/components/sonner";
import { ThemeProviders } from "../components/providers/theme-provider";
import { sharedMetadata } from "../utils";
import { env } from "../config";

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
  alternates: {
    canonical: "/",
    // languages: {
    //   "en-US": "/en-US",
    //   "de-DE": "/de-DE",
    // },
  },

  // authors: [{ name: "Seb" }, { name: "Josh", url: "https://nextjs.org" }],
  // creator: "Jiachi Liu",
  // publisher: "Sebastian Markbåge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {env.seo.googleTagManagerId ? (
        <GoogleTagManager gtmId={env.seo.googleTagManagerId} />
      ) : null}
      <body className={`${poppins.variable} ${manrope.variable} antialiased`}>
        <ThemeProviders>
          <AuthProvider>
            <Nav />
            {children}
          </AuthProvider>
          <Toaster richColors closeButton />
        </ThemeProviders>
      </body>
    </html>
  );
}
