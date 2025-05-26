import { 
  Users, 
  BarChart3, 
  Brain, 
  Target, 
  TrendingUp
} from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";

const features = [
  {
    Icon: Users,
    name: "Influencer Discovery",
    description: "Find the perfect influencers for your brand with our AI-powered discovery engine.",
    href: "#",
    cta: "Learn more",
    background: (
      <div className="absolute -right-20 -top-20 opacity-60">
        <div className="flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
          <Users className="h-20 w-20 text-white" />
        </div>
      </div>
    ),
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: BarChart3,
    name: "Analytics & Insights",
    description: "Get detailed analytics and insights on your influencer marketing campaigns.",
    href: "#",
    cta: "View analytics",
    background: (
      <div className="absolute -right-10 -top-10 opacity-60">
        <div className="h-32 w-32 rounded-lg bg-gradient-to-br from-green-500 to-teal-600 p-4">
          <BarChart3 className="h-full w-full text-white" />
        </div>
      </div>
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: Brain,
    name: "AI-Powered Matching",
    description: "Our advanced AI matches brands with the most suitable influencers.",
    href: "#",
    cta: "Try AI matching",
    background: (
      <div className="absolute -right-16 -top-16 opacity-60">
        <div className="flex h-36 w-36 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600">
          <Brain className="h-18 w-18 text-white" />
        </div>
      </div>
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: Target,
    name: "Precise Targeting",
    description: "Target your audience with precision using our advanced demographic filters.",
    href: "#",
    cta: "Start targeting",
    background: (
      <div className="absolute -right-12 -top-12 opacity-60">
        <div className="h-32 w-32 rounded-full bg-gradient-to-br from-red-500 to-orange-600 p-4">
          <Target className="h-full w-full text-white" />
        </div>
      </div>
    ),
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: TrendingUp,
    name: "Performance Tracking",
    description: "Track the performance of your campaigns in real-time with detailed metrics.",
    href: "#",
    cta: "Track performance",
    background: (
      <div className="absolute -right-14 -top-14 opacity-60">
        <div className="h-34 w-34 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600 p-4">
          <TrendingUp className="h-full w-full text-white" />
        </div>
      </div>
    ),
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-4",
  },
];

export const BentoSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950 px-4 py-2 mb-4">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400 tracking-wider">
                FEATURES
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Powerful Features for Influencer Marketing
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
              Discover our comprehensive suite of tools designed to revolutionize your influencer marketing campaigns.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-16 flex justify-center">
          <BentoGrid className="lg:grid-rows-3 w-full max-w-6xl">
            {features.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
        </div>
      </div>
    </section>
  );
};
