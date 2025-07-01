"use client";

import Link from "next/link";
import {
  Check,
  Copy,
  FileCode,
  Layers,
  Sparkles,
  Zap,
  MessageSquare,
  Users,
  Code,
  Laptop,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CssGridBackground from "@/components/css-grid-background";
import FramerSpotlight from "@/components/framer-spotlight";
import { useEffect, useRef, useState } from "react";
import Image from "next/image.js";

const tabs = ["Features", "Use Cases", "How it works", "Testimonials", "FAQ"];

export default function Home() {
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
    <div className="flex min-h-screen flex-col bg-background text-foreground">

      <main className="flex-1">
        {/* Hero Section with Email Collection */}
        <section
          id="hero"
          className="relative min-h-96 py-30 flex items-center justify-center overflow-hidden px-6 md:px-12 lg:px-16"
        >
          <CssGridBackground />
          <FramerSpotlight />
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-block rounded-full bg-gradient-to-r from-primary to-chart-4 px-3 py-1 text-xs font-medium mb-6">
              Coming soon
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Create, save and reuse your AI prompts
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl/relaxed">
              Stop rewriting the same AI prompts. Create templates with dynamic
              variables, fill them in seconds, and boost your development
              workflow.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                variant="default"
                size="lg"
                className="w-full sm:w-auto px-8 py-4 text-lg font-semibold shadow-md transition cursor-pointer"
                onClick={() => {
                  window.location.href = "/api/auth/signup";
                }}
              >
                Get started for free
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-8 py-4 text-lg font-semibold transition cursor-pointer"
                onClick={() => {
                  window.location.href = "/api/auth/signin";
                }}
              >
                Se connecter
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-16 md:py-24 border-t border-border px-6 md:px-12 lg:px-16 flex flex-col items-center"
        >
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                Features designed for developers
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
                Everything you need to streamline your AI prompt workflow
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-3">
              <div className="rounded-lg border border-border bg-card p-6 backdrop-blur-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-bold">Template Library</h3>
                <p className="mt-2 text-muted-foreground">
                  Create and organize your prompt templates with custom
                  variables for different use cases.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6 backdrop-blur-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <FileCode className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-bold">Dynamic Variables</h3>
                <p className="mt-2 text-muted-foreground">
                  Add {"{{code}}"}, {"{{error}}"}, and other variables to your
                  templates for quick customization.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6 backdrop-blur-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <Copy className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-bold">One-Click Copy</h3>
                <p className="mt-2 text-muted-foreground">
                  Generate and copy your complete prompts with a single click,
                  ready to paste into any AI tool.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6 backdrop-blur-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-bold">Quick Access</h3>
                <p className="mt-2 text-muted-foreground">
                  Access your most used templates instantly with keyboard
                  shortcuts and favorites.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6 backdrop-blur-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-bold">Team Sharing</h3>
                <p className="mt-2 text-muted-foreground">
                  Share your best templates with your team to establish
                  consistent AI interactions.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6 backdrop-blur-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <Code className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-bold">Version History</h3>
                <p className="mt-2 text-muted-foreground">
                  Track changes to your templates over time and revert to
                  previous versions when needed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section
          id="use-cases"
          className="py-16 md:py-24 border-t border-border bg-secondary/30 px-6 md:px-12 lg:px-16 flex flex-col items-center"
        >
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                Designed for every AI workflow
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
                See how Ezprompt can help in different scenarios
              </p>
            </div>

            <div className="mt-16">
              <Tabs defaultValue="development" className="w-full">
                <div className="flex justify-center mb-8">
                  <TabsList className="grid grid-cols-3 w-full max-w-xl">
                    <TabsTrigger value="development">Development</TabsTrigger>
                    <TabsTrigger value="content">Content Creation</TabsTrigger>
                    <TabsTrigger value="research">Research</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="development" className="mx-auto max-w-4xl">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                      <div className="inline-flex items-center rounded-full bg-primary/20 px-3 py-1 text-sm">
                        <Code className="mr-2 h-4 w-4" />
                        For Developers
                      </div>
                      <h3 className="text-2xl font-bold">
                        Accelerate your development workflow
                      </h3>
                      <p className="text-muted-foreground">
                        Create templates for common development tasks like
                        debugging, code reviews, refactoring, and documentation.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary mt-0.5" />
                          <span>
                            Debug complex errors with consistent prompts
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary mt-0.5" />
                          <span>Generate documentation for your code</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary mt-0.5" />
                          <span>Refactor code with detailed instructions</span>
                        </li>
                      </ul>
                    </div>
                    <div className="rounded-lg border border-border bg-card p-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-card-foreground flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary" />
                            Code Refactoring Template
                          </h4>
                        </div>
                        <div className="rounded-md bg-secondary p-4 text-sm">
                          <p>
                            Refactor this code to be more efficient and
                            readable:
                          </p>
                          <p className="mt-2 text-primary">{"{{code}}"}</p>
                          <p className="mt-2">Focus on these aspects:</p>
                          <p className="mt-2 text-primary">
                            {"{{focus_areas}}"}
                          </p>
                          <p className="mt-2">Additional context:</p>
                          <p className="mt-2 text-primary">{"{{context}}"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="content" className="mx-auto max-w-4xl">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                      <div className="inline-flex items-center rounded-full bg-chart-4/20 px-3 py-1 text-sm">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        For Content Creators
                      </div>
                      <h3 className="text-2xl font-bold">
                        Streamline your content creation
                      </h3>
                      <p className="text-muted-foreground">
                        Create templates for blog posts, social media content,
                        email newsletters, and more.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary mt-0.5" />
                          <span>Generate consistent blog outlines</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary mt-0.5" />
                          <span>
                            Create social media posts with your brand voice
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary mt-0.5" />
                          <span>Draft emails with personalized variables</span>
                        </li>
                      </ul>
                    </div>
                    <div className="rounded-lg border border-border bg-card p-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-card-foreground flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-chart-4" />
                            Blog Post Template
                          </h4>
                        </div>
                        <div className="rounded-md bg-secondary p-4 text-sm">
                          <p>Write a blog post about:</p>
                          <p className="mt-2 text-chart-4">{"{{topic}}"}</p>
                          <p className="mt-2">Target audience:</p>
                          <p className="mt-2 text-chart-4">{"{{audience}}"}</p>
                          <p className="mt-2">Key points to include:</p>
                          <p className="mt-2 text-chart-4">
                            {"{{key_points}}"}
                          </p>
                          <p className="mt-2">Tone of voice:</p>
                          <p className="mt-2 text-chart-4">{"{{tone}}"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="research" className="mx-auto max-w-4xl">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                      <div className="inline-flex items-center rounded-full bg-chart-1/20 px-3 py-1 text-sm">
                        <Laptop className="mr-2 h-4 w-4" />
                        For Researchers
                      </div>
                      <h3 className="text-2xl font-bold">
                        Enhance your research process
                      </h3>
                      <p className="text-muted-foreground">
                        Create templates for literature reviews, data analysis,
                        hypothesis testing, and more.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary mt-0.5" />
                          <span>Summarize research papers consistently</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary mt-0.5" />
                          <span>Generate analysis frameworks for data</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary mt-0.5" />
                          <span>Create structured literature reviews</span>
                        </li>
                      </ul>
                    </div>
                    <div className="rounded-lg border border-border bg-card p-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-card-foreground flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-chart-1" />
                            Research Summary Template
                          </h4>
                        </div>
                        <div className="rounded-md bg-secondary p-4 text-sm">
                          <p>Summarize this research paper:</p>
                          <p className="mt-2 text-chart-1">
                            {"{{paper_title}}"}
                          </p>
                          <p className="mt-2">Abstract:</p>
                          <p className="mt-2 text-chart-1">{"{{abstract}}"}</p>
                          <p className="mt-2">Focus on these aspects:</p>
                          <p className="mt-2 text-chart-1">
                            {"{{focus_areas}}"}
                          </p>
                          <p className="mt-2">Relate to my research on:</p>
                          <p className="mt-2 text-chart-1">
                            {"{{my_research}}"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          id="how-it-works"
          className="py-16 md:py-24 border-t border-border px-6 md:px-12 lg:px-16 flex flex-col items-center"
        >
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                How Ezprompt works
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
                Simple, fast, and effective prompt management
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  1
                </div>
                <h3 className="mt-4 text-xl font-bold">Create Templates</h3>
                <p className="mt-2 text-muted-foreground">
                  Build reusable prompt templates with dynamic variables for
                  your common AI interactions.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  2
                </div>
                <h3 className="mt-4 text-xl font-bold">Fill Variables</h3>
                <p className="mt-2 text-muted-foreground">
                  Quickly fill in your template variables through a simple form
                  interface.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  3
                </div>
                <h3 className="mt-4 text-xl font-bold">Generate & Use</h3>
                <p className="mt-2 text-muted-foreground">
                  Generate your complete prompt, copy it with one click, and
                  paste it into your AI tool.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="py-16 md:py-24 border-t border-border bg-secondary/30 px-6 md:px-12 lg:px-16 flex flex-col items-center"
        >
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                What developers are saying
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
                Hear from our early adopters
              </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-lg font-bold">S</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Sarah Chen</h4>
                    <p className="text-sm text-muted-foreground">
                      Senior Developer @ Acme Inc
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Ezprompt has saved me hours of repetitive work. I use it
                  daily for code reviews and debugging sessions with AI
                  assistants."
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-chart-4/20 flex items-center justify-center">
                    <span className="text-lg font-bold">M</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Michael Torres</h4>
                    <p className="text-sm text-muted-foreground">
                      Freelance Developer
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "The template system is brilliant. I've created a library of
                  prompts that help me maintain consistency across all my
                  projects."
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-chart-1/20 flex items-center justify-center">
                    <span className="text-lg font-bold">J</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Jessica Kim</h4>
                    <p className="text-sm text-muted-foreground">
                      Tech Lead @ StartupXYZ
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Our entire team uses Ezprompt to standardize how we interact
                  with AI tools. It's become an essential part of our workflow."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section
          id="cta"
          className="py-20 md:py-32 border-t border-border px-6 md:px-12 lg:px-16 flex flex-col items-center bg-gradient-to-r from-primary/10 via-secondary/30 to-chart-4/10"
        >
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Boost your productivity with Ezprompt
              </h2>
              <p className="mt-6 text-xl text-muted-foreground">
                Stop wasting time rewriting prompts. Join hundreds of developers who are already saving hours every week.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  variant="default"
                  size="lg"
                  className="w-full sm:w-auto px-10 py-5 text-lg font-bold shadow-xl transition"
                  onClick={() => {
                    window.location.href = "/api/auth/signup";
                  }}
                >
                  Get started for free
                </Button>

              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                No credit card required. Be among the first to try Ezprompt!
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          className="py-16 md:py-24 border-t border-border bg-secondary/30 px-6 md:px-12 lg:px-16 flex flex-col items-center"
        >
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                Frequently asked questions
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
                Everything you need to know about Ezprompt
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is Ezprompt?</AccordionTrigger>
                  <AccordionContent>
                    Ezprompt is a tool that helps developers create, manage, and
                    reuse AI prompt templates. It allows you to create templates
                    with dynamic variables that you can fill in quickly, saving
                    you time and ensuring consistency in your AI interactions.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>How does Ezprompt work?</AccordionTrigger>
                  <AccordionContent>
                    You create templates with variables like {"{{code}}"} or{" "}
                    {"{{error}}"}. When you need to use a template, you select
                    it, fill in the variables through a simple form, and
                    Ezprompt generates the complete prompt ready to be copied
                    and pasted into your AI tool of choice.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Is Ezprompt free to use?</AccordionTrigger>
                  <AccordionContent>
                    Ezprompt will have a free tier that allows you to create and
                    use a limited number of templates. We'll also offer a Pro
                    plan with additional features like team sharing, unlimited
                    templates, and advanced organization options.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    Can I share templates with my team?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, Ezprompt will support team sharing and collaboration
                    features, allowing you to share your templates with
                    colleagues and establish consistent AI interaction patterns
                    across your organization.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    When will Ezprompt be available?
                  </AccordionTrigger>
                  <AccordionContent>
                    We're currently in development and plan to launch soon. Join
                    our waitlist to be notified when we launch and to get early
                    access to the platform.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-12 px-6 md:px-12 lg:px-16 flex flex-col items-center">
        <div className="container">
          <div className="flex justify-center items-center max-w-7xl mx-auto">
            <div className="space-y-4 flex justify-center items-center flex-col">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="EzPrompt"
                  width={200}
                  height={200}
                  className="h-auto w-6 text-primary"
                />
                <span className="text-lg font-bold">Ezprompt</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Create, save and reuse your AI prompts with dynamic variables.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Altplus. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

