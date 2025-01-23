import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import "@workspace/ui/globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
  display: "swap",
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
    <html lang="en">
      <body
        className={`${bricolageGrotesque.variable} ${manrope.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
