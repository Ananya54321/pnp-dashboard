"use client";

import { cn } from "@/lib/utils";
import DottedMap from "dotted-map";
import { useEffect, useState } from "react";

interface MapProps {
  map?: {
    grid: string;
    svgMap: string;
  };
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
  lineOpacity?: number;
  dotColor?: string;
  backgroundColor?: string;
  className?: string;
}

export function WorldMap({
  dots = [],
  lineColor = "#0ea5e9",
  lineOpacity = 0.8,
  dotColor = "#0ea5e9",
  backgroundColor = "transparent",
  className,
}: MapProps) {
  const [svgContent, setSvgContent] = useState("");

  useEffect(() => {
    const map = new DottedMap({ height: 100, grid: "diagonal" });

    // Add dots for each location
    dots.forEach((dot) => {
      map.addPin({
        lat: dot.start.lat,
        lng: dot.start.lng,
        svgOptions: { color: dotColor, radius: 0.8 },
      });
      if (dot.end) {
        map.addPin({
          lat: dot.end.lat,
          lng: dot.end.lng,
          svgOptions: { color: dotColor, radius: 0.8 },
        });
      }
    });

    // Generate SVG
    const svgMap = map.getSVG({
      radius: 0.22,
      color: "#374151",
      shape: "circle",
      backgroundColor: backgroundColor,
    });

    setSvgContent(svgMap);
  }, [dots, dotColor, backgroundColor]);

  return (
    <div className={cn("relative", className)}>
      <div
        className="w-full h-full"
        dangerouslySetInnerHTML={{
          __html: svgContent,
        }}
      />      {/* Add animated connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {dots.map((dot, index) => {
          if (!dot.end) return null;
          
          const startX = ((dot.start.lng + 180) / 360) * 100;
          const startY = ((90 - dot.start.lat) / 180) * 100;
          const endX = ((dot.end.lng + 180) / 360) * 100;
          const endY = ((90 - dot.end.lat) / 180) * 100;

          return (
            <g key={`connection-${index}`}>
              {/* Static connection line */}
              <line
                x1={`${startX}%`}
                y1={`${startY}%`}
                x2={`${endX}%`}
                y2={`${endY}%`}
                stroke={lineColor}
                strokeWidth="1"
                strokeOpacity={lineOpacity * 0.3}
              />
              {/* Animated flowing connection line */}
              <line
                x1={`${startX}%`}
                y1={`${startY}%`}
                x2={`${endX}%`}
                y2={`${endY}%`}
                stroke={lineColor}
                strokeWidth="2"
                strokeOpacity={lineOpacity}
                strokeDasharray="8 12"
                className="animate-flow animate-dot-glow"
                style={{
                  animationDelay: `${index * 0.8}s`,
                  animationDuration: '4s'
                }}
              />
            </g>
          );
        })}
        
        {/* Add location dots with subtle animation */}
        {dots.map((dot, index) => {
          const x = ((dot.start.lng + 180) / 360) * 100;
          const y = ((90 - dot.start.lat) / 180) * 100;

          return (
            <g key={`start-${index}`}>
              {/* Outer gentle pulsing ring */}
              <circle
                cx={`${x}%`}
                cy={`${y}%`}
                r="8"
                fill={dotColor}
                fillOpacity="0.15"
                className="animate-gentle-pulse"
                style={{
                  animationDelay: `${index * 0.4}s`,
                  animationDuration: '3s'
                }}
              />
              {/* Main dot */}
              <circle
                cx={`${x}%`}
                cy={`${y}%`}
                r="4"
                fill={dotColor}
                fillOpacity="0.9"
              />
              {/* Inner bright dot with subtle glow */}
              <circle
                cx={`${x}%`}
                cy={`${y}%`}
                r="2"
                fill="white"
                fillOpacity="0.9"
                className="animate-dot-glow"
                style={{
                  animationDelay: `${index * 0.2}s`
                }}
              />
            </g>
          );
        })}
        
        {dots.map((dot, index) => {
          if (!dot.end) return null;
          const x = ((dot.end.lng + 180) / 360) * 100;
          const y = ((90 - dot.end.lat) / 180) * 100;
          
          return (
            <g key={`end-${index}`}>
              {/* Outer gentle pulsing ring */}
              <circle
                cx={`${x}%`}
                cy={`${y}%`}
                r="8"
                fill={dotColor}
                fillOpacity="0.15"
                className="animate-gentle-pulse"
                style={{
                  animationDelay: `${(index + dots.length) * 0.4}s`,
                  animationDuration: '3s'
                }}
              />
              {/* Main dot */}
              <circle
                cx={`${x}%`}
                cy={`${y}%`}
                r="4"
                fill={dotColor}
                fillOpacity="0.9"
              />
              {/* Inner bright dot with subtle glow */}
              <circle
                cx={`${x}%`}
                cy={`${y}%`}
                r="2"
                fill="white"
                fillOpacity="0.9"
                className="animate-dot-glow"
                style={{
                  animationDelay: `${(index + dots.length) * 0.2}s`
                }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}