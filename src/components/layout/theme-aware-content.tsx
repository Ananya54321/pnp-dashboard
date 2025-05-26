// components/layout/theme-aware-content.tsx
"use client";
import { useState, useEffect } from "react";

export function ThemeAwareContent({ children }: React.PropsWithChildren) {
  const [mounted, setMounted] = useState(false);
  
  // Only show content after component has mounted (client-side)
  useEffect(() => setMounted(true), []);
  
  if (!mounted) {
    // Return a placeholder with dark theme styling while mounting
    return <div className="bg-black min-h-screen">{/* placeholder */}</div>;
  }
  
  return <>{children}</>;
}