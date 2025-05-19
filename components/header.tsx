"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="flex items-center justify-center sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-7xl">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="font-bold text-xl">EzPrompt</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/dashboard"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/templates"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/templates" || pathname.startsWith("/templates/") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Templates
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-4">
            <Link
              href="/dashboard"
              className={`block text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={toggleMenu}
            >
              Dashboard
            </Link>
            <Link
              href="/templates"
              className={`block text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/templates" || pathname.startsWith("/templates/")
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
              onClick={toggleMenu}
            >
              Templates
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
