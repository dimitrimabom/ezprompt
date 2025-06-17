"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import TemplateCard from "@/components/templateCard";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import template from "@/data/templates.json";

export default function Dashboard() {
  const [templates, setTemplates] = useState(template);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      return (
        searchQuery === "" ||
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [templates, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-between items-start gap-6 mb-8 flex-col md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome to EzPrompt</h1>
          <p className="text-muted-foreground mt-2">
            Create, manage, and use your AI prompt templates
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
          <Link href="/templates/new">
            <Button className="cursor-pointer">
              <Plus className="mr-2 h-4 w-4" /> New Template
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              variant="default"
            />
          ))
        ) : (
          <div className="text-center py-12 col-span-full">
            <p className="text-muted-foreground mb-4">
              {searchQuery
                ? "No templates match your search. Try different keywords!"
                : "No templates found. Create your first template to get started!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
