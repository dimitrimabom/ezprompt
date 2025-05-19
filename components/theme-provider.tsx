"use client"

import type React from "react"

import { createContext, useContext, useEffect } from "react"

type ThemeProviderProps = {
  children: React.ReactNode
}

const ThemeContext = createContext<{ theme: string }>({ theme: "light" })

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Always use light theme
  const theme = "dark"

  // Apply the theme class to the document element
  useEffect(() => {
    document.documentElement.classList.remove("dark")
    document.documentElement.classList.add("light")
  }, [])

  return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
