"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface CountUpProps {
  end: number;
  duration?: number;
  delay?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  formatter?: (value: number) => string;
  separator?: string;
}

const defaultFormatter = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toLocaleString();
};

export const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 2.5,
  delay = 0,
  className,
  prefix = "",
  suffix = "",
  formatter = defaultFormatter,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { 
    damping: 60, 
    stiffness: 100,
    duration: duration * 1000 
  });
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        motionValue.set(end);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView, end, delay, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(formatter(Math.floor(latest)));
    });

    return unsubscribe;
  }, [springValue, formatter]);

  return (
    <motion.span
      ref={ref}
      className={cn("tabular-nums", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: delay }}
    >
      {prefix}
      {displayValue}
      {suffix}
    </motion.span>
  );
};

interface CountUpAnimationProps {
  targetValue: number;
  duration?: number;
  label?: string;
  description?: string;
  className?: string;
  showPlusSign?: boolean;
}

export const CountUpAnimation: React.FC<CountUpAnimationProps> = ({
  targetValue,
  duration = 3,
  label = "Total Network Subscribers",
  description = "reached through our platform partnerships",
  className,
  showPlusSign = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "text-center space-y-3",
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: 0.2,
        ease: "easeOut"
      }}
    >
      {/* Counter */}
      <div className="space-y-1">
        <div className="flex items-center justify-center gap-1">
          <CountUp
            end={targetValue}
            duration={duration}
            delay={0.4}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white"
            formatter={(value) => {
              const formatted = defaultFormatter(value);
              return formatted;
            }}
          />
          {showPlusSign && (
            <motion.span
              className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: duration + 0.6 }}
            >
              +
            </motion.span>
          )}
        </div>
        
        <motion.p
          className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          {label}
        </motion.p>
      </div>

      {/* Description */}
      <motion.p
        className="text-sm text-gray-500 dark:text-gray-500 max-w-xs mx-auto"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};
