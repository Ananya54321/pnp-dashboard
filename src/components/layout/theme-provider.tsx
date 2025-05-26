// In your theme-provider.tsx or equivalent file
"use client";

import { ThemeProvider as NextThemeProvider } from 'next-themes';

export function ThemeProvider({ children }: React.PropsWithChildren) {
  return (
    <NextThemeProvider 
      attribute="class" 
      defaultTheme="dark" 
      enableSystem={false}
    >
      {children}
    </NextThemeProvider>
  );
}