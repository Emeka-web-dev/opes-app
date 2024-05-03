import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "dark:bg-[#1d2144]")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          storageKey="opes-app"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
