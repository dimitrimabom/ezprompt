import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Plus, Code, Bug, Wrench, ArrowRight } from "lucide-react"

export default function Dashboard() {
  // Sample templates - in a real app, these would come from localStorage or a state management library
  const templates = [
    {
      id: 1,
      title: "Debug Code",
      description: "Analyze and fix bugs in your code",
      variables: ["code", "error", "context"],
      category: "Debugging",
      icon: <Bug className="h-5 w-5" />,
    },
    {
      id: 2,
      title: "Explain Code",
      description: "Get a detailed explanation of code functionality",
      variables: ["code", "language"],
      category: "Learning",
      icon: <Code className="h-5 w-5" />,
    },
    {
      id: 3,
      title: "Refactor React Component",
      description: "Improve and optimize React components",
      variables: ["component", "objective"],
      category: "Refactoring",
      icon: <Wrench className="h-5 w-5" />,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-between items-start gap-6 mb-8 flex-col md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome to EzPrompt</h1>
          <p className="text-muted-foreground mt-2">Create, manage, and use your AI prompt templates</p>
        </div>
        <Link href="/templates/new">
          <Button className=" cursor-pointer">
            <Plus className="mr-2 h-4 w-4" /> New Template
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="bg-primary/10 p-2 rounded-full">{template.icon}</div>
                <div className="text-sm text-muted-foreground">{template.category}</div>
              </div>
              <CardTitle className="mt-4">{template.title}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {template.variables.map((variable) => (
                  <div key={variable} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs">
                    {`{{${variable}}}`}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/templates/${template.id}`} className="w-full">
                <Button variant="outline" className="w-full cursor-pointer">
                  Use Template <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
