import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { ThemeAwareContent } from "@/components/layout/theme-aware-content"; // Import the new component
import StarsCanvas from "@/components/main/StarBackground";

const inter = Inter({ subsets: ["latin"] });
// const inter = Inter({
//   subsets: ["latin"],
//   weight: ["400", "700", "800"], // 700 or 800 for bold headings
//   variable: '--font-inter', // optional, helps for Tailwind setup
// });
export const metadata: Metadata = {
  title: "pickandpartner",
  description: "Simplifying influencer marketing with smart, data-driven, and AI-powered solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={cn(" overflow-y-scroll overflow-x-hidden", inter.className)}>
        <ThemeProvider>
          <ThemeAwareContent> 
            <Navbar />
            {children}
          </ThemeAwareContent>
        </ThemeProvider>
      </body>
    </html>
  );
}