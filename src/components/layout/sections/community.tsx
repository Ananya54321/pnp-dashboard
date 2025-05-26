"use client";
import DiscordIcon from "@/components/icons/discord-icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export const CommunitySection = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const bgColor = isDarkMode ? "bg-black" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-black";
  const cardBg = isDarkMode ? "bg-gray-800/50" : "bg-gray-100";
  const borderColor = isDarkMode ? "border-slate-500" : "border-gray-300";

  return (
    <section
      id="community"
      className={cn("w-full py-16 md:py-24", bgColor, textColor)}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
          <Card
            className={cn(
              "border text-center flex flex-col items-center justify-center shadow-md",
              cardBg,
              borderColor,
              bgColor
            )}
          >
            <CardHeader className="w-full">
              <CardTitle className="text-4xl md:text-5xl font-bold flex flex-col items-center gap-4">
                <DiscordIcon className="h-10 w-16" />
                <div>
                  Meet your network
                  <span className="text-transparent pl-2 bg-gradient-to-r from-blue-600 to-primary bg-clip-text">
                    here ...
                  </span>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="w-full max-w-2xl mx-auto">
              <p className="text-lg md:text-xl text-muted-foreground">
                Join us on Discord for the latest updates! Connect and grow with
                like-minded enthusiasts. Click to join the journey!
              </p>
            </CardContent>

            <CardFooter className="pb-8">
              <Button size="lg" className="text-base" asChild>
                <a
                  href="https://discord.com/invite/tGZAgPZjgz"
                  rel="noopener"
                  target="_blank"
                >
                  Join us on Discord
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};
