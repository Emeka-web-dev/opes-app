import { auth } from "@/auth";
import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { SessionProviders } from "@/components/providers/session-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";
import "./globals.css";
import TawkToWidget from "@/components/providers/tawkto-widget-provider";

const inter = Rubik({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Opes Tech - The #1 earning platform",
  description: "You can also join Hawkit today and start earning",
  openGraph: {
    title: "Opes Tech - The #1 earning platform",
    description: "You can also join Hawkit today and start earning",
    type: "website",
    locale: "en_US",
    url: "https://www.opes-tech.com/",
    siteName: "OpesTech",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS}`}
      ></Script>
      <Script id="ga-script" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname});
            `}
      </Script>
      <body className={cn(inter.className, "scroll-smooth")}>
        <SessionProviders session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            storageKey="opes-app"
          >
            <QueryProvider>
              <Toaster className="z-50" position="top-center" duration={1000} />
              <TawkToWidget />
              <ModalProvider />
              {children}
            </QueryProvider>
          </ThemeProvider>
        </SessionProviders>
      </body>
    </html>
  );
}
