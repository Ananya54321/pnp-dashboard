import { CommunitySection } from "@/components/layout/sections/community";

import { FAQSection } from "@/components/layout/sections/faq";

import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import Calculator from "@/components/layout/sections/calculator";
import HowItWorks from "@/components/layout/sections/howitworks";
import Testimonials from "@/components/layout/sections/testimonials";
import CarouselSection from "@/components/layout/sections/carousel";
import BentoSection from "@/components/layout/sections/bento";
import { GlobalNetworkSection } from "@/components/layout/sections/global-network";
import { PlatformDemoSection } from "@/components/layout/sections/platform-demo";

export const metadata = {
  title: "PickandPartner",
  description:
    "Simplifying influencer marketing with smart, data-driven, and AI-powered solutions.",
  openGraph: {
    type: "website",
    url: "https://pickandpartner.com",
    title: "Pick and Partner",
    description:
      "Simplifying influencer marketing with smart, data-driven, and AI-powered solutions.",
    images: [
      {
        url: "https://i.ibb.co/fYMSTGqv/pnp-logo.png",
        width: 1200,
        height: 630,
        alt: "Winqoo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://Winqoo.com",
    title: "Winqoo",
    description:
      "Simplifying influencer marketing with smart, data-driven, and AI-powered solutions.",
    images: ["https://i.ibb.co/fYMSTGqv/pnp-logo.png"],
  },
};

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full overflow-hidden">
      <HeroSection />
      <Calculator />
      <BentoSection />
      <PlatformDemoSection />
      <GlobalNetworkSection />
      <CarouselSection />
      <CommunitySection />
      <HowItWorks />
      <Testimonials />
      <FAQSection />
      <FooterSection />
    </main>
  );
}