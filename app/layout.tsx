import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster, toast } from 'sonner'
import Header from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  // metadataBase: new URL("https://ezprompt.dev"),
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "EzPrompt — Build better prompts, faster",
    template: "%s | EzPrompt",
  },
  description:
    "EzPrompt est un outil ultra-minimaliste pour créer, gérer et partager facilement des modèles de prompts. Gagnez du temps et structurez vos interactions avec l'IA.",
  keywords: [
    "prompt",
    "prompt engineering",
    "SaaS",
    "developer tool",
    "productivity",
    "EzPrompt",
  ],
  authors: [{ name: "EzPrompt Team", url: "https://ezprompt.dev" }],
  creator: "EzPrompt",
  openGraph: {
    title: "EzPrompt — Build better prompts, faster",
    description:
      "Créez, organisez et partagez vos meilleurs prompts avec une interface propre, rapide et efficace.",
    url: "https://ezprompt.dev",
    siteName: "EzPrompt",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EzPrompt — votre assistant de prompting",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EzPrompt",
    description:
      "L'outil parfait pour les développeurs et les équipes IA qui veulent structurer leurs prompts efficacement.",
    images: ["/og-image.png"],
    creator: "@ezpromptapp",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-32x32.png", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 ">{children}</main>
          </div>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
