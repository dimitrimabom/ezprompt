"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Plus, Search, Star, StarOff } from "lucide-react"
import { useState, useMemo } from "react"
import TemplateCard from "@/components/templateCard";
import initialTemplates from "@/data/initialTemplates.json"

export default function Templates() {
  const [templates, setTemplates] = useState(initialTemplates)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<"name" | "category" | "favorites">("name")

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(templates.map((t) => t.category))]
    return ["All", ...uniqueCategories]
  }, [templates])

  const filteredTemplates = useMemo(() => {
    let filtered = templates.filter((template) => {
      const matchesSearch =
        searchQuery === "" ||
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.variables.some((v) => v.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "All" || template.category === selectedCategory
      const matchesFavorites = !showFavoritesOnly || template.favorite

      return matchesSearch && matchesCategory && matchesFavorites
    })

    // Sort templates
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.title.localeCompare(b.title)
        case "category":
          return a.category.localeCompare(b.category)
        case "favorites":
          return (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0)
        default:
          return 0
      }
    })

    return filtered
  }, [templates, searchQuery, selectedCategory, showFavoritesOnly, sortBy])

  const toggleFavorite = (id: string) => {
    setTemplates(
      templates.map((template) => 
        template.id === id ? { ...template, favorite: !template.favorite } : template
      )
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Templates</h1>
          <p className="text-muted-foreground mt-2">
            {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} found
          </p>
        </div>
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
            <Button
              variant="outline"
              size="icon"
              className="cursor-pointer hover:bg-secondary"
              title="Filter favorites"
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            >
              {showFavoritesOnly ? (
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ) : (
                <StarOff className="h-4 w-4" />
              )}
            </Button>
            
            <Link href="/templates/new">
              <Button className="cursor-pointer">
                <Plus className="mr-2 h-4 w-4" /> New Template
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex-1 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="cursor-pointer"
            >
              {category}
            </Button>
          ))}
        </div>
        <select
          className="px-3 py-2 border rounded-md bg-background"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "name" | "category" | "favorites")}
        >
          <option value="name">Sort by Name</option>
          <option value="category">Sort by Category</option>
          <option value="favorites">Sort by Favorites</option>
        </select>
      </div>

      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              variant= "detailed"
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            No templates found matching your criteria
          </p>
          <Link href="/templates/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create New Template
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
