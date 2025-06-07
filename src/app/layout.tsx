import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { ThemeAwareContent } from "@/components/layout/theme-aware-content"; // Import the new component
import { Toaster } from "@/components/ui/sonner";

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
            <div className="flex min-h-screen">
              {/* Sidebar */}
              <Sidebar />
              
              {/* Main Content Area */}
              <div className="flex-1 flex flex-col">
                {/* Navbar for landing page only */}
                <Navbar />
                
                {/* Content with proper spacing for sidebar */}
                <main className="flex-1 md:ml-[75px] transition-all duration-300">
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-4">
                    {children}
                  </div>
                </main>
              </div>
            </div>
            <Toaster />
          </ThemeAwareContent>
        </ThemeProvider>
      </body>
    </html>
  );
}