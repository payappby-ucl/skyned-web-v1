import type { Metadata } from "next";
import { Manrope, Poppins } from "next/font/google";
import "@workspace/ui/globals.css";
import { AuthProvider } from "@/src/components/providers/auth-provider";
import Nav from "@/src/components/nav";
import { Toaster } from "@workspace/ui/components/sonner";
import { ThemeProviders } from "../components/providers/theme-provider";

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
  title: "Skyned Consults Corporation",
  description:
    "We offer free and seamless international study application support into bachelors, postgraduate diploma, post-baccalaureate, graduate certificates and masters programs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
