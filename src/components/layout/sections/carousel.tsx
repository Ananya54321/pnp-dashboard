"use client";

import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

const CarouselSection = () => {
  const cards = [
    {
      src: "/hero-image-light.jpeg",
      title: "AI-Powered Matching",
      category: "Smart Technology",
      content: (
        <div className="space-y-4">
          <p className="text-neutral-700 dark:text-neutral-300">
            Our advanced AI algorithms analyze brand requirements and influencer profiles
            to find the perfect matches for your campaigns.
          </p>
          <p className="text-neutral-700 dark:text-neutral-300">
            Get recommendations based on audience demographics, engagement rates,
            content quality, and brand alignment.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-gray-100 dark:bg-neutral-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Smart Analytics</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Deep insights into influencer performance
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-neutral-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Real-time Matching</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Instant recommendations based on your criteria
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      src: "/demo-img.jpg",
      title: "Campaign Management",
      category: "Efficiency",
      content: (
        <div className="space-y-4">
          <p className="text-neutral-700 dark:text-neutral-300">
            Streamline your entire influencer marketing workflow from discovery
            to campaign completion with our comprehensive management tools.
          </p>
          <p className="text-neutral-700 dark:text-neutral-300">
            Track performance, manage contracts, and measure ROI all in one place.
          </p>
          <div className="mt-6">
            <h4 className="font-semibold mb-3">Key Features:</h4>
            <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
              <li>• Contract management and negotiations</li>
              <li>• Real-time campaign tracking</li>
              <li>• Performance analytics and reporting</li>
              <li>• Payment processing and invoicing</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      src: "/business-discussion.svg",
      title: "Data-Driven Insights",
      category: "Analytics",
      content: (
        <div className="space-y-4">
          <p className="text-neutral-700 dark:text-neutral-300">
            Make informed decisions with comprehensive analytics and reporting
            that give you deep insights into your influencer marketing performance.
          </p>
          <p className="text-neutral-700 dark:text-neutral-300">
            Track engagement rates, conversion metrics, and ROI across all your campaigns.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">95%</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">Match Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">3x</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">Faster Campaigns</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">50%</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">Cost Reduction</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      src: "/register.svg",
      title: "Global Network",
      category: "Scale",
      content: (
        <div className="space-y-4">
          <p className="text-neutral-700 dark:text-neutral-300">
            Connect with influencers from around the world across all major
            social media platforms and niches.
          </p>
          <p className="text-neutral-700 dark:text-neutral-300">
            Our platform hosts thousands of verified influencers ready to
            collaborate on your next campaign.
          </p>
          <div className="mt-6 space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-neutral-800 rounded-lg">
              <span className="font-medium">Instagram</span>
              <span className="text-blue-600">10K+ Influencers</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-neutral-800 rounded-lg">
              <span className="font-medium">YouTube</span>
              <span className="text-red-600">5K+ Creators</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-neutral-800 rounded-lg">
              <span className="font-medium">TikTok</span>
              <span className="text-purple-600">8K+ Creators</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const carouselItems = cards.map((card, index) => (
    <Card key={card.title} card={card} index={index} />
  ));

  return (
    <section className="w-full py-20 bg-gradient-to-b from-gray-50 to-white dark:from-neutral-900 dark:to-black">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Pick and Partner?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the features that make our platform the preferred choice for brands and influencers worldwide
          </p>
        </div>
        <div className="w-full h-full py-10">
          <Carousel items={carouselItems} />
        </div>
      </div>
    </section>
  );
};

export default CarouselSection;
