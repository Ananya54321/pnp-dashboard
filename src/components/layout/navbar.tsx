"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ToggleTheme } from "./toogle-theme";
import { useTheme } from "next-themes";
import { useAuth } from "@/contexts/AuthContext";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { User } from "lucide-react";

export const Navbar = () => {
  const { theme } = useTheme();
  const { user, loading } = useAuth();
  const isDarkMode = theme === "dark";

  // // Only show navbar on landing page
  // if (pathname !== "/" && !pathname.startsWith("/auth")) {
  //   return null;
  // }

  const bgColor = isDarkMode ? "bg-black" : "bg-white";
  const textColor = isDarkMode ? "text-neutral-content" : "text-neutral-900";
  const borderColor = isDarkMode ? "border-neutral-800" : "border-neutral-300";

  return (
    <header
      className={`backdrop-blur-md w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky z-40 rounded-2xl flex justify-between items-center p-4 transition-all duration-300 shadow-md ${bgColor} ${textColor} ${borderColor} border`}
    >
      <Link
        href="/"
        className="font-bold text-lg flex items-center ml-2 hover:opacity-80 transition space-x-2"
      >
        <Image 
          src="/pnp-logo.png" 
          alt="PickandPartner Logo" 
          width={32} 
          height={32}
          className="object-contain" 
        />
        <p>PickandPartner</p>
      </Link>

      <div className="flex items-center">
        {/* User section - only show when authenticated */}
        {!loading && user && (
          <div className="flex items-center space-x-3">
            <LogoutButton 
              variant="ghost" 
              size="sm" 
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20" 
              showIcon={true}
            >
              <span className="hidden sm:inline">Sign Out</span>
            </LogoutButton>
          </div>
        )}
        
        <ToggleTheme />
      </div>
    </header>
  );
};
