// src/app/providers.js
'use client'

import { ThemeProvider } from "@/components/ui/theme-provider"

export function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}