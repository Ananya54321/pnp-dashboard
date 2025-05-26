"use client";

import React from "react";
import Link from "next/link";
import { ToggleTheme } from "./toogle-theme";
import { useTheme } from "next-themes";
import Image from "next/image";

export const Navbar = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const bgColor = isDarkMode ? "bg-black" : "bg-white";
  const textColor = isDarkMode ? "text-neutral-content" : "text-neutral-900";
  const borderColor = isDarkMode ? "border-neutral-800" : "border-neutral-300";

  return (
    <header
      className={`backdrop-blur-md w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky z-40 rounded-2xl flex justify-between items-center p-4 transition-all duration-300 shadow-md ${bgColor} ${textColor} ${borderColor} border`}
    >
      <Link
        href="/"
        className="font-bold text-lg flex items-center ml-2 hover:opacity-80 transition"
      >
        {/* <Image src={logo} alt="logo" width={100} height={32} /> */}
        <p>PickandPartner</p>
      </Link>

      <div className="flex items-center">
        <ToggleTheme />
      </div>
    </header>
  );
};
