import type React from "react"

export interface Template {
  id: number
  title: string
  description: string
  variables: string[]
  category: string
  promptTemplate: string
  favorite?: boolean
  icon?: React.ReactNode
}

// Mock data - in a real app, this would be stored in localStorage
let templates: Template[] = [
  {
    id: 1,
    title: "Debug Code",
    description: "Analyze and fix bugs in your code",
    variables: ["code", "error", "context"],
    category: "Debugging",
    promptTemplate: `I need help debugging the following code:

{{code}}

I'm getting this error:
{{error}}

Additional context:
{{context}}

Please explain what's wrong and how to fix it.`,
    favorite: true,
  },
  {
    id: 2,
    title: "Explain Code",
    description: "Get a detailed explanation of code functionality",
    variables: ["code", "language"],
    category: "Learning",
    promptTemplate: `Please explain the following code in detail:

{{code}}

Programming language: {{language}}

I'd like to understand:
1. What this code does
2. How it works step by step
3. Any patterns or techniques used
4. Potential improvements or optimizations`,
    favorite: false,
  },
  {
    id: 3,
    title: "Refactor React Component",
    description: "Improve and optimize React components",
    variables: ["component", "objective"],
    category: "Refactoring",
    promptTemplate: `Please help me refactor this React component:

{{component}}

My objective is to: {{objective}}

Please provide the refactored code with explanations of what you changed and why.`,
    favorite: true,
  },
  {
    id: 4,
    title: "Optimize SQL Query",
    description: "Improve performance of database queries",
    variables: ["query", "database_type", "constraints"],
    category: "Database",
    promptTemplate: `I need help optimizing this SQL query:

{{query}}

Database: {{database_type}}

Additional constraints or requirements:
{{constraints}}

Please provide an optimized version of this query with explanations of the changes made and why they improve performance.`,
    favorite: false,
  },
  {
    id: 5,
    title: "Generate Unit Tests",
    description: "Create comprehensive unit tests for your code",
    variables: ["code", "framework", "coverage_level"],
    category: "Testing",
    promptTemplate: `Please generate unit tests for the following code:

{{code}}

Testing framework: {{framework}}
Desired coverage level: {{coverage_level}}

Please include tests for edge cases and error conditions.`,
    favorite: false,
  },
]

// Get all templates
export function getAllTemplates(): Template[] {
  return templates
}

// Get template by ID
export function getTemplateById(id: number): Template | undefined {
  return templates.find((template) => template.id === id)
}

// Create a new template
export function createTemplate(template: Omit<Template, "id">): Template {
  const newId = Math.max(0, ...templates.map((t) => t.id)) + 1
  const newTemplate = { ...template, id: newId }
  templates = [...templates, newTemplate]
  return newTemplate
}

// Update an existing template
export function updateTemplate(id: number, template: Partial<Template>): Template | undefined {
  const index = templates.findIndex((t) => t.id === id)
  if (index === -1) return undefined

  const updatedTemplate = { ...templates[index], ...template }
  templates = [...templates.slice(0, index), updatedTemplate, ...templates.slice(index + 1)]

  return updatedTemplate
}

// Delete a template
export function deleteTemplate(id: number): boolean {
  const index = templates.findIndex((t) => t.id === id)
  if (index === -1) return false

  templates = [...templates.slice(0, index), ...templates.slice(index + 1)]

  return true
}

// Toggle favorite status
export function toggleFavorite(id: number): Template | undefined {
  const template = getTemplateById(id)
  if (!template) return undefined

  return updateTemplate(id, { favorite: !template.favorite })
}
