"use client";

import { WorldMap } from "@/components/magicui/dotted-map";
import { motion } from "framer-motion";

export const GlobalNetworkSection = () => {
  // Sample data for influencer locations and connections
  const sampleArcs = [
    {
      start: { lat: 40.7128, lng: -74.0060, label: "New York" },
      end: { lat: 51.5074, lng: -0.1278, label: "London" },
    },
    {
      start: { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
      end: { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
    },
    {
      start: { lat: 28.6139, lng: 77.2090, label: "Delhi" },
      end: { lat: -33.8688, lng: 151.2093, label: "Sydney" },
    },
    {
      start: { lat: 55.7558, lng: 37.6176, label: "Moscow" },
      end: { lat: -23.5505, lng: -46.6333, label: "São Paulo" },
    },
    {
      start: { lat: 48.8566, lng: 2.3522, label: "Paris" },
      end: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
    },
    {
      start: { lat: 25.2048, lng: 55.2708, label: "Dubai" },
      end: { lat: 19.4326, lng: -99.1332, label: "Mexico City" },
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <div className="inline-flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950 px-4 py-2 mb-4">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400 tracking-wider">
                GLOBAL NETWORK
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Global Influencer Network
            </h2>
            <p className="mx-auto max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Connect with top influencers from around the world. Our platform spans across continents,
              giving you access to diverse audiences and markets.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-6xl"
        >
          <div className="relative rounded-lg border bg-card p-8 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-lg"></div>
            <div className="relative">
              <WorldMap
                dots={sampleArcs}
                className="h-[400px] md:h-[500px] w-full"
                lineColor="#0ea5e9"
                dotColor="#0ea5e9"
                backgroundColor="transparent"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl"
        >
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary">100+</div>
            <div className="text-muted-foreground">Countries</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary">50K+</div>
            <div className="text-muted-foreground">Active Influencers</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary">1M+</div>
            <div className="text-muted-foreground">Successful Campaigns</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
