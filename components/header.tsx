"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { ToggleThemeBtn } from "./toggleThemeBtn"
import Image from "next/image.js";

const tabs = ["Features", "Use Cases", "How it works", "Testimonials", "FAQ"];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverStyle, setHoverStyle] = useState({});
  const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = tabRefs.current[hoveredIndex];
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement;
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    }
  }, [hoveredIndex]);

  useEffect(() => {
    const activeElement = tabRefs.current[activeIndex];
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement;
      setActiveStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    requestAnimationFrame(() => {
      const overviewElement = tabRefs.current[0];
      if (overviewElement) {
        const { offsetLeft, offsetWidth } = overviewElement;
        setActiveStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    });
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-7xl">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="EzPrompt"
                width={200}
                height={200}
                className="h-auto w-6 text-primary"
              />
              <span className="text-xl font-bold">Ezprompt</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {tabs.map((tab, index) => (
            <Link
              key={tab}
              href={`#${tab.toLowerCase().replace(/\s+/g, "-")}`}
              className={`text-sm font-medium transition-colors hover:text-foreground ${
                index === activeIndex
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setActiveIndex(index)}
            >
              {tab}
            </Link>
          ))}
          <Link
            href="/dashboard"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/dashboard"
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/templates"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/templates" || pathname.startsWith("/templates/")
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            Templates
          </Link>
          <ToggleThemeBtn />
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-4">
            {tabs.map((tab, index) => (
              <Link
                key={tab}
                href={`#${tab.toLowerCase().replace(/\s+/g, "-")}`}
                className={`block text-sm font-medium transition-colors hover:text-foreground ${
                  index === activeIndex
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
                onClick={toggleMenu}
              >
                {tab}
              </Link>
            ))}
            <Link
              href="/dashboard"
              className={`block text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/dashboard"
                  ? "text-primary"
                  : "text-muted-foreground"
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
  );
}
