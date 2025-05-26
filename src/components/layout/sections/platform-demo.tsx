"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";

export function PlatformDemoSection() {
  return (
    <section className="w-full bg-gradient-to-b from-muted/50 to-background">
      <ContainerScroll
        titleComponent={
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-neutral-50 dark:to-neutral-400">
              Experience Our Platform
            </h2>
            <p className="text-lg mb-10 md:text-xl text-muted-foreground max-w-3xl mx-auto text-center">
              Discover how Pick and Partner revolutionizes influencer marketing with 
              our intuitive dashboard, AI-powered matching, and comprehensive analytics.
            </p>
          </div>
        }
      >
        <div className="relative h-full w-full">
          {/* Main Dashboard Interface */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 rounded-lg overflow-hidden">
            
            {/* Header Bar */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
                <span className="font-semibold text-gray-800 dark:text-gray-200">Pick & Partner</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="p-6 space-y-6">
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="text-2xl font-bold text-blue-600">2.5M+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Active Influencers</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="text-2xl font-bold text-green-600">98%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Match Success Rate</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="text-2xl font-bold text-purple-600">500K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Campaigns Launched</div>
                </div>
              </div>

              {/* Influencer Cards */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  AI-Recommended Influencers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {i}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800 dark:text-gray-200">
                          @influencer{i}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {(Math.random() * 500 + 100).toFixed(0)}K followers
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">
                          {(Math.random() * 30 + 70).toFixed(0)}% match
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Analytics Chart Placeholder */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  Campaign Performance
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Engagement Rate", value: 85, color: "bg-blue-500" },
                    { label: "Reach Growth", value: 92, color: "bg-green-500" },
                    { label: "Conversion Rate", value: 78, color: "bg-purple-500" },
                    { label: "ROI", value: 94, color: "bg-orange-500" },
                  ].map((metric, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{metric.label}</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{metric.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`${metric.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${metric.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Floating Action Buttons */}
          <div className="absolute bottom-4 right-4 space-y-2">
            <div className="w-12 h-12 bg-blue-500 rounded-full shadow-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded opacity-80"></div>
            </div>
            <div className="w-10 h-10 bg-purple-500 rounded-full shadow-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded opacity-80"></div>
            </div>
          </div>

        </div>
      </ContainerScroll>
    </section>
  );
}
