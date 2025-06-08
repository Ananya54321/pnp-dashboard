"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Home,
  Users,
  Settings,
  MessageCircle,
  Calendar,
  Award,
} from "lucide-react";

function Sidebar() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  // Add debounced hover handling for smoother animations
  useEffect(() => {
    // This effect can be used for cleanup if needed
  }, [isVisible]);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  // Define navigation items
  const navItems = [
    {
      href: "/dashboard",
      icon: Home,
      label: "Dashboard",
    },
    {
      href: "/creators",
      icon: Users,
      label: "Creators",
    },
    {
      href: "/campaigns",
      icon: Award,
      label: "Campaigns",
    },
    {
      href: "/messages",
      icon: MessageCircle,
      label: "Messages",
    },
    {
      href: "/schedule",
      icon: Calendar,
      label: "Schedule",
    },
    {
      href: "/settings",
      icon: Settings,
      label: "Settings",
    },
  ];

  // Skip sidebar on landing page
  if (pathname === "/" || pathname.startsWith("/auth")) {
    return null;
  }

  return (
    <>
      <div
        className="sidebar h-[100%]  z-10 fixed"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ willChange: 'transform' }}
      >
        {/* Invisible hover area for desktop - made wider for easier interaction */}
        <div className="hidden md:block fixed left-0 top-1/2 transform -translate-y-1/2 w-16 h-[80%] bg-transparent z-10" />

        <div
          className={`
            flex md:flex-col md:rounded-lg shadow-lg justify-around 
            items-center ${
              isDarkMode 
                ? "bg-gray-900 border-gray-700" 
                : "bg-white border-gray-200"
            } border text-current p-2 w-full md:w-[75px]
            fixed bottom-0 left-0 md:fixed md:top-1/2 md:transform md:-translate-y-1/2 md:h-[70vh]
            md:transition-all md:duration-700 md:ease-[cubic-bezier(0.23,1,0.32,1)]
            ${isVisible ? "md:translate-x-0 md:w-[200px]" : "md:translate-x-[-80%]"}
            overflow-hidden transform-gpu backface-visibility-hidden
          `}
          style={{ 
            willChange: 'transform, width',
            backfaceVisibility: 'hidden',
            perspective: '1000px'
          }}
        >

          {/* Navigation Items */}
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            
            return (
              <div
                key={item.href}
                className="w-full flex-1 md:flex-none text-center md:text-left p-2 flex items-center md:flex-row md:gap-4"
              >
                <Link
                  href={item.href}
                  className={`
                    flex items-center w-full h-full
                    rounded-md transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] p-2 transform-gpu
                    ${isVisible ? "justify-start" : "justify-center md:justify-center"}
                    ${
                      isActive
                        ? "bg-black dark:bg-gray-700 text-white shadow-lg"
                        : isDarkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }
                  `}
                  style={{ willChange: 'transform, background-color' }}
                >
                  <Icon
                    className={`transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] transform-gpu ${
                      isVisible ? "mr-3" : "mx-auto"
                    } ${isActive ? "text-white" : ""}`}
                    size={20}
                    style={{ willChange: 'transform' }}
                  />
                  <span 
                    className={`text-sm font-medium transition-all duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] whitespace-nowrap transform-gpu ${
                      isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-[-15px] scale-95 md:hidden"
                    }`}
                    style={{ 
                      transitionDelay: isVisible ? `${100 + index * 50}ms` : '0ms',
                      willChange: 'transform, opacity'
                    }}
                  >
                    {item.label}
                  </span>
                </Link>
              </div>
            );
          })}

          {/* Theme Toggle */}
          <div className="hidden md:block mt-auto mb-4">
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
