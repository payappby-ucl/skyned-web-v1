import { Manrope, Poppins } from "next/font/google";
import "@workspace/ui/globals.css";
import { ThemeProviders } from "../components/providers/theme-provider";
import { AuthProvider } from "../components/providers/auth-provider";
import { Toaster } from "@workspace/ui/components/sonner";
import TanstackQueryProvider from "../components/providers/tanstack-provider";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${manrope.variable} antialiased`}>
        <TanstackQueryProvider>
          <ThemeProviders>
            <AuthProvider>{children}</AuthProvider>
            <Toaster richColors closeButton />
          </ThemeProviders>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
