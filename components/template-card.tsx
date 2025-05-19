"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, StarOff, ArrowRight, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import type { Template } from "@/lib/template-store"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"

interface TemplateCardProps {
  template: Template
  onToggleFavorite?: (id: number) => void
  onDelete?: (id: number) => void
  showActions?: boolean
}

export default function TemplateCard({ template, onToggleFavorite, onDelete, showActions = true }: TemplateCardProps) {

  const handleDelete = () => {
    if (onDelete) {
      onDelete(template.id)
      toast.success("Template deleted", {
        description: "The template has been deleted successfully.",
      })
    }
  }

  const handleToggleFavorite = () => {
    if (onToggleFavorite) {
      onToggleFavorite(template.id)
      toast.success(template.favorite ? "Removed from favorites" : "Added to favorites", {
        description: template.favorite
          ? "The template has been removed from your favorites."
          : "The template has been added to your favorites.",
      })
    }
  }

  // Determine icon based on category
  const getIcon = () => {
    // This would be more sophisticated in a real app
    return <div className="bg-primary/10 p-2 rounded-full">{template.icon || <Star className="h-5 w-5" />}</div>
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          {getIcon()}
          <div className="flex items-center gap-2">
            <Badge variant="outline">{template.category}</Badge>
            {onToggleFavorite && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleToggleFavorite}>
                {template.favorite ? (
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ) : (
                  <StarOff className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
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
      {showActions && (
        <CardFooter className="flex gap-2">
          <Link href={`/templates/${template.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              Use <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <div className="flex gap-2 flex-1">
            <Link href={`/templates/${template.id}/edit`} className="flex-1">
              <Button variant="outline" className="w-full">
                <Pencil className="h-4 w-4" />
              </Button>
            </Link>
            {onDelete && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="flex-1">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Template</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this template? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
