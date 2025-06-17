"use client";

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect, useCallback } from "react"
import { X, Plus, AlertCircle, Eye, EyeOff, Sparkles, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { toast } from "sonner"

export default function NewTemplate() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [promptTemplate, setPromptTemplate] = useState("")
  const [variables, setVariables] = useState<string[]>([])
  const [newVariable, setNewVariable] = useState("")
  const [error, setError] = useState("")
  const [previewMode, setPreviewMode] = useState(false)
  const [sampleValues, setSampleValues] = useState<Record<string, string>>({})
  const [previewPrompt, setPreviewPrompt] = useState("")
  const router = useRouter()

  // Update sample values when variables change
  useEffect(() => {
    const newSampleValues: Record<string, string> = {}
    variables.forEach((variable) => {
      newSampleValues[variable] = sampleValues[variable] || getSampleValue(variable)
    })
    setSampleValues(newSampleValues)
  }, [variables])

  // Generate preview when in preview mode
  useEffect(() => {
    if (previewMode) {
      generatePreview()
    }
  }, [previewMode, promptTemplate, sampleValues])

  const getSampleValue = (variable: string): string => {
    // Return appropriate sample values based on common variable names
    switch (variable.toLowerCase()) {
      case "code":
        return "function add(a, b) {\n  return a + b;\n}"
      case "error":
        return 'TypeError: Cannot read property "length" of undefined'
      case "context":
        return "This function is used in a React component to calculate totals"
      case "component":
        return "function UserProfile({ user }) {\n  return <div>{user.name}</div>;\n}"
      case "objective":
        return "Improve performance and add error handling"
      case "language":
        return "JavaScript"
      case "query":
        return "SELECT * FROM users WHERE created_at > NOW() - INTERVAL 1 DAY"
      case "database_type":
        return "PostgreSQL"
      default:
        return `Sample ${variable} value`
    }
  }

  const addVariable = () => {
    if (!newVariable.trim()) {
      setError("Variable name cannot be empty")
      return
    }

    if (variables.includes(newVariable)) {
      setError("Variable already exists")
      return
    }

    setVariables([...variables, newVariable])
    setNewVariable("")
    setError("")
  }

  const removeVariable = (index: number) => {
    setVariables(variables.filter((_, i) => i !== index))
  }

  const handleSampleValueChange = (variable: string, value: string) => {
    setSampleValues({
      ...sampleValues,
      [variable]: value,
    })
  }

  const generatePreview = useCallback(() => {
    let result = promptTemplate

    // Replace all variables in the template
    Object.entries(sampleValues).forEach(([variable, value]) => {
      const regex = new RegExp(`{{${variable}}}`, "g")
      result = result.replace(regex, value)
    })

    setPreviewPrompt(result)
  }, [promptTemplate, sampleValues])

  const insertVariableIntoTemplate = (variable: string) => {
    const textArea = document.getElementById("promptTemplate") as HTMLTextAreaElement
    if (textArea) {
      const start = textArea.selectionStart
      const end = textArea.selectionEnd
      const text = promptTemplate
      const before = text.substring(0, start)
      const after = text.substring(end, text.length)
      const newText = `${before}{{${variable}}}${after}`
      setPromptTemplate(newText)

      // Set cursor position after the inserted variable
      setTimeout(() => {
        textArea.focus()
        const newPosition = start + variable.length + 4 // +4 for the {{ and }}
        textArea.setSelectionRange(newPosition, newPosition)
      }, 0)
    }
  }

  const highlightVariables = (text: string): React.ReactNode => {
    if (!text) return null

    // Split the text by variable placeholders
    const parts = text.split(/(\{\{[^{}]+\}\})/g)

    return parts.map((part, index) => {
      if (part.match(/^\{\{[^{}]+\}\}$/)) {
        // This is a variable placeholder
        return (
          <span key={index} className="bg-primary/20 text-primary rounded px-1">
            {part}
          </span>
        )
      }
      return <span key={index}>{part}</span>
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      setError("Title is required")
      return
    }

    if (!promptTemplate.trim()) {
      setError("Prompt template is required")
      return
    }

    try {
      // Save template to localStorage
      const templates = JSON.parse(localStorage.getItem("templates") || "[]")
      const newTemplate = {
        id: Date.now(),
        title,
        description,
        category,
        promptTemplate,
        variables,
        createdAt: new Date().toISOString()
      }
      templates.push(newTemplate)
      localStorage.setItem("templates", JSON.stringify(templates))

      toast.success("Template created", {
        description: "Your prompt template has been saved successfully.",
      })

      // Redirect to templates page
      router.push("/templates")
    } catch (error) {
      toast.error("Error saving template", {
        description: "There was a problem saving your template. Please try again.",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/templates" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-3xl font-bold">Create New Template</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Template Details</CardTitle>
                <CardDescription>Provide basic information about your prompt template</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="E.g., Debug JavaScript Code"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what this template does..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Debugging">Debugging</SelectItem>
                      <SelectItem value="Learning">Learning</SelectItem>
                      <SelectItem value="Refactoring">Refactoring</SelectItem>
                      <SelectItem value="Database">Database</SelectItem>
                      <SelectItem value="Testing">Testing</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Variables</CardTitle>
                <CardDescription>Define the dynamic parts of your prompt template</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Variable name (e.g., code)"
                    value={newVariable}
                    onChange={(e) => setNewVariable(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addVariable()
                      }
                    }}
                  />
                  <Button type="button" onClick={addVariable}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="flex flex-wrap gap-2 mt-4">
                  {variables.map((variable, index) => (
                    <div
                      key={index}
                      className="bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm flex items-center gap-1"
                    >
                      <button
                        type="button"
                        className="cursor-pointer"
                        onClick={() => insertVariableIntoTemplate(variable)}
                      >
                        {`{{${variable}}}`}
                      </button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 ml-1"
                        onClick={() => removeVariable(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  {variables.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      No variables added yet. Variables will appear as {"{{"} variable_name {"}}"} in your template.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="h-full flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Prompt Template</CardTitle>
                  <CardDescription>
                    Write your prompt template using {"{{"} variable {"}}"} syntax for dynamic parts
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPreviewMode(!previewMode)}
                  title={previewMode ? "Edit mode" : "Preview mode"}
                >
                  {previewMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <CardContent className="flex-grow pt-6">
                <Tabs defaultValue="editor" value={previewMode ? "preview" : "editor"}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="editor" onClick={() => setPreviewMode(false)}>
                      Editor
                    </TabsTrigger>
                    <TabsTrigger value="preview" onClick={() => setPreviewMode(true)}>
                      Preview
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="editor" className="mt-0">
                    <div className="relative">
                      <Textarea
                        id="promptTemplate"
                        className="min-h-[300px] font-mono"
                        placeholder={`Example:
I need help debugging the following JavaScript code:

{{code}}

I'm getting this error:
{{error}}

Additional context:
{{context}}

Please explain what's wrong and how to fix it.`}
                        value={promptTemplate}
                        onChange={(e) => setPromptTemplate(e.target.value)}
                      />
                      <div className="absolute top-2 right-2">
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setPromptTemplate(`I need help with the following:

{{code}}

Please explain what this does and how I can improve it.`)
                          }}
                          title="Insert template example"
                        >
                          <Sparkles className="h-4 w-4 mr-1" /> Template
                        </Button>
                      </div>
                    </div>

                    {variables.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Click to insert:</p>
                        <div className="flex flex-wrap gap-2">
                          {variables.map((variable) => (
                            <Button
                              key={variable}
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => insertVariableIntoTemplate(variable)}
                            >
                              {`{{${variable}}}`}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="preview" className="mt-0">
                    <div className="space-y-6">
                      <div className="bg-muted p-4 rounded-md min-h-[200px] whitespace-pre-wrap">
                        {highlightVariables(promptTemplate)}
                      </div>

                      {variables.length > 0 && (
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium">Sample values:</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {variables.map((variable) => (
                              <div key={variable} className="space-y-1">
                                <Label htmlFor={`sample-${variable}`}>{`{{${variable}}}`}</Label>
                                <Input
                                  id={`sample-${variable}`}
                                  value={sampleValues[variable] || ""}
                                  onChange={(e) => handleSampleValueChange(variable, e.target.value)}
                                  placeholder={`Sample value for ${variable}`}
                                />
                              </div>
                            ))}
                          </div>

                          <div className="pt-4 border-t">
                            <h3 className="text-sm font-medium mb-2">Preview with sample values:</h3>
                            <div className="bg-muted p-4 rounded-md whitespace-pre-wrap font-mono text-sm">
                              {previewPrompt || "Your preview will appear here..."}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="border-t pt-6">
                <Button type="submit" className="w-full">
                  Save Template
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
