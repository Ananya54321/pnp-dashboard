"use client";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import ShimmerButton from "@/components/magicui/shimmer-button";

export const HeroSection = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const bgColor = isDarkMode ? "bg-black" : "bg-white";
  const textColor = isDarkMode ? "text-neutral-200" : "text-neutral-900";
  const secondaryText = isDarkMode ? "text-neutral-400" : "text-muted-foreground";
  const gradientText = isDarkMode
    ? "from-white via-blue-300 to-violet-400"
    : "from-[#2D5CE9] via-[#9c40ff] to-[#2D5CE9]";

  return (
    <section className={`w-full ${bgColor} transition-colors duration-300 relative overflow-hidden`}>
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        width={70}
        height={70}
        strokeDasharray={4}
        className={cn(
          "absolute inset-0 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
        )}
      />
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-24 md:py-32 flex justify-center items-center">
        <div className="text-center space-y-8 relative z-10">
          <AnimatedGradientText className="flex items-center justify-center">
            🎉 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />{" "}
            <span
              className={`inline animate-gradient bg-gradient-to-r ${gradientText} bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`}
            >
              Connect, Create, Collaborate
            </span>
            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>

          <div className={`text-3xl md:text-6xl font-bold ${textColor}`}>
            <h1>
              Grow Your Newsletter{" "}
              <span className="text-transparent px-2 bg-gradient-to-r from-blue-600 to-primary bg-clip-text">
                4x Faster
              </span>
            </h1>
          </div>

          <p className={`max-w-2xl mx-auto text-xl ${secondaryText}`}>
            Connect with other newsletter creators and exchange audiences to grow your subscriber base organically.
          </p>

          <div className="flex justify-center">
            <a
              href="https://forms.gle/MUmgQ7xBWAd3fiXBA"
              target="_blank"
              rel="noopener noreferrer"
              className="z-10 inline-block"
            >
              <ShimmerButton className="w-fit" background="#2D5CE9">
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                  Submit Your Newsletter
                </span>
                <ArrowRight className="ml-2 h-5 w-5 text-white hover:scale-110" />
              </ShimmerButton>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
