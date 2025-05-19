"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Plus, Search, Code, Bug, Wrench, ArrowRight, Star, StarOff, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useState, useMemo } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample templates - in a real app, these would come from localStorage or a state management library
const initialTemplates = [
  {
    id: 1,
    title: "Debug Code",
    description: "Analyze and fix bugs in your code",
    variables: ["code", "error", "context"],
    category: "Debugging",
    icon: <Bug className="h-5 w-5" />,
    favorite: true,
  },
  {
    id: 2,
    title: "Explain Code",
    description: "Get a detailed explanation of code functionality",
    variables: ["code", "language"],
    category: "Learning",
    icon: <Code className="h-5 w-5" />,
    favorite: false,
  },
  {
    id: 3,
    title: "Refactor React Component",
    description: "Improve and optimize React components",
    variables: ["component", "objective"],
    category: "Refactoring",
    icon: <Wrench className="h-5 w-5" />,
    favorite: true,
  },
  {
    id: 4,
    title: "Optimize SQL Query",
    description: "Improve performance of database queries",
    variables: ["query", "database_type", "constraints"],
    category: "Database",
    icon: <Code className="h-5 w-5" />,
    favorite: false,
  },
  {
    id: 5,
    title: "Generate Unit Tests",
    description: "Create comprehensive unit tests for your code",
    variables: ["code", "framework", "coverage_level"],
    category: "Testing",
    icon: <Code className="h-5 w-5" />,
    favorite: false,
  },
]

export default function Templates() {
  const [templates, setTemplates] = useState(initialTemplates)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(templates.map((t) => t.category))]
    return ["All", ...uniqueCategories]
  }, [templates])

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      // Filter by search query
      const matchesSearch =
        searchQuery === "" ||
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.variables.some((v) => v.toLowerCase().includes(searchQuery.toLowerCase()))

      // Filter by category
      const matchesCategory = selectedCategory === "All" || template.category === selectedCategory

      // Filter by favorites
      const matchesFavorites = !showFavoritesOnly || template.favorite

      return matchesSearch && matchesCategory && matchesFavorites
    })
  }, [templates, searchQuery, selectedCategory, showFavoritesOnly])

  const toggleFavorite = (id: number) => {
    setTemplates(
      templates.map((template) => (template.id === id ? { ...template, favorite: !template.favorite } : template)),
    )
  }

  // const deleteTemplate = (id: number) => {
  //   setTemplates(templates.filter((template) => template.id !== id))
  // }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Templates</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search templates..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="cursor-pointer">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuCheckboxItem checked={showFavoritesOnly} onCheckedChange={setShowFavoritesOnly}>
                  Favorites only
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/templates/new">
              <Button className="cursor-pointer">
                <Plus className="mr-2 h-4 w-4" /> New Template
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Tabs defaultValue="All" value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
        <TabsList className="mb-4 px-2 py-1 flex flex-wrap h-auto">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="cursor-pointer">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory}>
          {filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="group hover:shadow-md transition-all">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="bg-primary/10 p-2 rounded-full">{template.icon}</div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{template.category}</Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 cursor-pointer"
                          onClick={() => toggleFavorite(template.id)}
                        >
                          {template.favorite ? (
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ) : (
                            <StarOff className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="mt-4 group-hover:text-primary transition-colors">{template.title}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {template.variables.map((variable) => (
                        <div
                          key={variable}
                          className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs"
                        >
                          {`{{${variable}}}`}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Link href={`/templates/${template.id}`} className="flex-1">
                      <Button variant="outline" className="w-full group-hover:bg-primary/10 transition-colors cursor-pointer">
                        Use <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/templates/${template.id}/edit`} className="flex-1">
                      <Button variant="outline" className="w-full cursor-pointer">
                        Edit
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No templates found matching your criteria</p>
              <Link href="/templates/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Create New Template
                </Button>
              </Link>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
