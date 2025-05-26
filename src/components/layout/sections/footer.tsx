"use client";

import { Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const FooterSection = () => {
  return (
    <>
     

      <footer className="bg-white dark:bg-black text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Left section - Logo and Copyright */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/pnp-logo.png"
                  alt="PickandPartner Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  PickandPartner
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                &copy; {new Date().getFullYear()} PickandPartner. All rights reserved.
              </p>
            </div>

            {/* Right section - Contact */}
            <div className="flex flex-col items-center md:items-end gap-4">
              <Link
                href="mailto:picknpartner@gmail.com"
                className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center transition-colors group"
                aria-label="Email PickandPartner"
              >
                <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="ml-2 text-sm font-medium">picknpartner@gmail.com</span>
              </Link>
              <p className="text-xs text-gray-500 dark:text-gray-500 text-center md:text-right">
                Connect with creators worldwide
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
