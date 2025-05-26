"use client";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export const ToggleTheme = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Only show correct icon after component has mounted
  useEffect(() => setMounted(true), []);
  
  // Use resolvedTheme for more reliable theme detection
  const currentTheme = mounted ? resolvedTheme : "dark"; // Default to dark while mounting
  
  return (
    <Button
      onClick={() => setTheme(currentTheme === "light" ? "dark" : "light")}
      size="sm"
      variant="ghost"
      className="w-full justify-start"
    >
      {mounted && (
        <>
          {currentTheme === "light" ? (
            <div className="flex gap-2">
              <Moon className="size-5" />
              {/* <span className="block lg:hidden"></span> */}
            </div>
          ) : (
            <div className="flex gap-2">
              <Sun className="size-5" />
              {/* <span className="block lg:hidden"></span> */}
            </div>
          )}
        </>
      )}
      <span className="sr-only">Trocar de tema</span>
    </Button>
  );
};