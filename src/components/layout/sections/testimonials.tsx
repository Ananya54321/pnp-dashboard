"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Marquee from "@/components/magicui/marquee";

const TestimonialsSection = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

 

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      content:
        "Partnering with other creators through this platform has doubled my newsletter reach in just three months!",
      author: "Jessica Lee",
      role: "Founder, The Daily Digest",
      image: "/api/placeholder/40/40",
    },
    {
      id: 2,
      content:
        "The collaboration opportunities here are fantastic! My audience has grown exponentially through strategic partnerships.",
      author: "Mark Thompson",
      role: "Editor, Startup Insights",
      image: "/api/placeholder/40/40",
    },
    {
      id: 3,
      content:
        "A game-changer for independent newsletter creators. I have built strong connections and gained thousands of new subscribers!",
      author: "Rachel Adams",
      role: "Writer, Tech Trends Weekly",
      image: "/api/placeholder/40/40",
    },
    {
      id: 4,
      content:
        "The analytics and networking features help me make data-driven decisions, leading to higher engagement and growth!",
      author: "Tom Richardson",
      role: "Publisher, Finance Today",
      image: "/api/placeholder/40/40",
    },
    {
      id: 5,
      content:
        "The best platform for newsletter creators to connect and grow together. My subscriber count has tripled!",
      author: "Sarah Johnson",
      role: "Creator, Health & Wellness Weekly",
      image: "/api/placeholder/40/40",
    },
    {
      id: 6,
      content:
        "Amazing community and tools! The cross-promotion features have been incredibly valuable for my business.",
      author: "David Chen",
      role: "Editor, AI Insights Daily",
      image: "/api/placeholder/40/40",
    },
  ];

  const bgColor = isDarkMode ? "bg-black" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-black";
  const subText = isDarkMode ? "text-gray-300" : "text-gray-700";
  const cardBg = isDarkMode ? "bg-slate-800/50" : "bg-gray-100";
  const cardBorder = isDarkMode ? "border-slate-700/50" : "border-gray-300";
  const shadowColor = isDarkMode ? "shadow-blue-500/10" : "shadow-gray-300";
  const quoteText = isDarkMode ? "text-gray-200" : "text-gray-800";
  const authorRole = isDarkMode ? "text-gray-400" : "text-gray-500";

  return (
    <section className={`w-full ${bgColor} py-16 md:py-24 relative overflow-hidden transition-colors duration-300`}>
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="h-full w-full">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
        </div>
      </div>

      <div className="absolute inset-0 bg-grid-white/5 pointer-events-none"></div>

      {/* Content */}
      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950 px-4 py-2 mb-4">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 tracking-wider">
              TESTIMONIALS
            </span>
          </div>
          <h2 className={`text-3xl md:text-4xl font-semibold ${textColor} mb-4`}>What our users say</h2>
          <p className={`text-lg ${subText}`}>
            Don&apos;t just take our word for it — hear what our users have to say about their experience.
          </p>
        </div>

       

        {/* Testimonials Marquee */}
        <div className="relative">
          {/* First row - normal direction */}
          <Marquee pauseOnHover className="[--duration:80s]">
            {testimonials.slice(0, 3).map((testimonial) => (
              <div
                key={testimonial.id}
                className={`${cardBg} backdrop-blur-sm rounded-xl border ${cardBorder} p-6 
                  shadow-md transition-all duration-300 hover:shadow-lg flex flex-col w-80 mx-2 min-h-[200px]`}
              >
                <div className="flex-1">
                  <p className={`${quoteText} text-base relative pl-6 before:content-['"'] before:absolute before:left-0 before:top-0 before:text-2xl before:text-blue-500 italic leading-relaxed`}>
                    {testimonial.content}
                  </p>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 h-10 w-10 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-semibold ${textColor}`}>{testimonial.author}</p>
                    <p className={`text-xs ${authorRole}`}>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
          
          {/* Second row - reverse direction */}
          <Marquee reverse pauseOnHover className="[--duration:80s] mt-6">
            {testimonials.slice(3, 6).map((testimonial) => (
              <div
                key={testimonial.id}
                className={`${cardBg} backdrop-blur-sm rounded-xl border ${cardBorder} p-6 
                  shadow-md transition-all duration-300 hover:shadow-lg flex flex-col w-80 mx-2 min-h-[200px]`}
              >
                <div className="flex-1">
                  <p className={`${quoteText} text-base relative pl-6 before:content-['"'] before:absolute before:left-0 before:top-0 before:text-2xl before:text-blue-500 italic leading-relaxed`}>
                    {testimonial.content}
                  </p>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 h-10 w-10 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-semibold ${textColor}`}>{testimonial.author}</p>
                    <p className={`text-xs ${authorRole}`}>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export { TestimonialsSection };
