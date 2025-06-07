"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ToggleTheme } from "./toogle-theme";
import { useTheme } from "next-themes";
import {
  Home,
  Users,
  User,
  BarChart3,
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
        className="sidebar h-[100%] ml-2 z-10 fixed flex flex-col justify-center"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {/* Invisible hover area for desktop */}
        <div className="hidden md:block fixed left-0 top-0 w-2 h-full bg-transparent z-10" />

        <div
          className={`
            flex md:flex-col md:rounded-lg shadow-lg justify-around 
            items-center ${
              isDarkMode 
                ? "bg-gray-900 border-gray-700" 
                : "bg-white border-gray-200"
            } border text-current p-2 w-full md:w-[75px]
            fixed bottom-0 left-0 md:relative md:bottom-auto md:top-0 md:pl-4 md:h-[90vh]
            md:transition-all md:duration-300 md:ease-in-out
            ${isVisible ? "md:translate-x-0 md:w-[200px]" : "md:translate-x-[-85%]"}
          `}
        >
          {/* Logo/Brand */}
          <div className="hidden md:block mb-4 mt-2">
            <Link
              href="/dashboard"
              className="font-bold text-sm flex items-center transition-opacity duration-300"
            >
              <span 
                className={`text-blue-800 dark:text-blue-400 transition-opacity duration-300 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                PickandPartner
              </span>
            </Link>
          </div>

          {/* Navigation Items */}
          {navItems.map((item) => {
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
                    rounded-md transition-all duration-200 p-2
                    ${isVisible ? "justify-start" : "justify-center md:justify-center"}
                    ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : isDarkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }
                  `}
                >
                  <Icon
                    className={`${isVisible ? "mr-3" : "mx-auto"} ${isActive ? "text-white" : ""}`}
                    size={20}
                  />
                  <span 
                    className={`text-sm font-medium transition-opacity duration-300 ${
                      isVisible ? "opacity-100" : "opacity-0 md:hidden"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </div>
            );
          })}

          {/* Theme Toggle */}
          <div className="hidden md:block mt-auto mb-4">
            <div className={`flex items-center justify-center ${isVisible ? "px-4" : ""}`}>
              <ToggleTheme />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
