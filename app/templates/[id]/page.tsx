"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect, useCallback } from "react"
import { Copy, Check, Bug, ArrowLeft, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useParams } from "next/navigation"
import { toast } from "sonner"

// Mock data - in a real app, this would come from localStorage or a state management library
const mockTemplates = [
  {
    id: 1,
    title: "Debug Code",
    description: "Analyze and fix bugs in your code",
    variables: ["code", "error", "context"],
    category: "Debugging",
    icon: <Bug className="h-5 w-5" />,
    promptTemplate: `I need help debugging the following code:

{{code}}

I'm getting this error:
{{error}}

Additional context:
{{context}}

Please explain what's wrong and how to fix it.`,
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
  },
]

export default function TemplateDetail() {
  const params = useParams()
  const id = Number(params.id)
  const [copied, setCopied] = useState(false)
  const [formValues, setFormValues] = useState<Record<string, string>>({})
  const [finalPrompt, setFinalPrompt] = useState("")
  const [template, setTemplate] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    // Find the template by ID from our mock data
    const foundTemplate = mockTemplates.find((t) => t.id === Number(params.id))
    if (foundTemplate) {
      setTemplate(foundTemplate)

      // Initialize form values
      const initialValues: Record<string, string> = {}
      foundTemplate.variables.forEach((variable: string) => {
        initialValues[variable] = ""
      })
      setFormValues(initialValues)
    }
  }, [params.id])

  const handleInputChange = (variable: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [variable]: value,
    }))
  }

  const generatePrompt = useCallback(() => {
    setIsGenerating(true)

    // Simulate a delay for the generation process
    setTimeout(() => {
      let result = template.promptTemplate

      // Replace all variables in the template
      Object.entries(formValues).forEach(([variable, value]) => {
        const regex = new RegExp(`{{${variable}}}`, "g")
        result = result.replace(regex, value)
      })

      setFinalPrompt(result)
      setIsGenerating(false)
    }, 500)
  }, [template?.promptTemplate, formValues])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(finalPrompt)
    setCopied(true)
    toast.success("Copied to clipboard", {
      description: "The prompt has been copied to your clipboard.",
    })

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const fillWithSampleData = () => {
    if (!template) return

    const sampleValues: Record<string, string> = {}
    template.variables.forEach((variable: string) => {
      // Return appropriate sample values based on common variable names
      switch (variable.toLowerCase()) {
        case "code":
          sampleValues[variable] = "function add(a, b) {\n  return a + b;\n}"
          break
        case "error":
          sampleValues[variable] = 'TypeError: Cannot read property "length" of undefined'
          break
        case "context":
          sampleValues[variable] = "This function is used in a React component to calculate totals"
          break
        case "component":
          sampleValues[variable] = "function UserProfile({ user }) {\n  return <div>{user.name}</div>;\n}"
          break
        case "objective":
          sampleValues[variable] = "Improve performance and add error handling"
          break
        case "language":
          sampleValues[variable] = "JavaScript"
          break
        case "query":
          sampleValues[variable] = "SELECT * FROM users WHERE created_at > NOW() - INTERVAL 1 DAY"
          break
        case "database_type":
          sampleValues[variable] = "PostgreSQL"
          break
        default:
          sampleValues[variable] = `Sample ${variable} value`
      }
    })

    setFormValues(sampleValues)
  }

  if (!template) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading template...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl ">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/templates" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">{template.title}</h1>
          <Badge variant="outline">{template.category}</Badge>
        </div>
      </div>
      <p className="text-muted-foreground mb-8">{template.description}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Fill in the Variables</CardTitle>
                <CardDescription>Provide values for each variable in the template</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={fillWithSampleData} className="flex items-center gap-1 cursor-pointer">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Fill with samples</span>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {template.variables.map((variable: string) => (
                <div key={variable} className="space-y-2">
                  <Label htmlFor={variable}>{`{{${variable}}}`}</Label>
                  {variable === "code" || variable === "component" || variable === "error" || variable === "context" ? (
                    <Textarea
                      id={variable}
                      placeholder={`Enter ${variable}...`}
                      value={formValues[variable] || ""}
                      onChange={(e) => handleInputChange(variable, e.target.value)}
                      rows={variable === "code" || variable === "component" ? 6 : 3}
                      className="font-mono"
                    />
                  ) : (
                    <Input
                      id={variable}
                      placeholder={`Enter ${variable}...`}
                      value={formValues[variable] || ""}
                      onChange={(e) => handleInputChange(variable, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button onClick={generatePrompt} className="w-full cursor-pointer" disabled={isGenerating}>
                {isGenerating ? "Generating..." : "Generate Prompt"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Generated Prompt</CardTitle>
              <CardDescription>Your final prompt with all variables filled in</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="bg-muted p-4 rounded-md min-h-[300px] whitespace-pre-wrap font-mono text-sm">
                {finalPrompt || "Your generated prompt will appear here..."}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <Button onClick={copyToClipboard} className="w-full cursor-pointer" disabled={!finalPrompt}>
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" /> Copy to Clipboard
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
