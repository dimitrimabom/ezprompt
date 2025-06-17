// components/TemplateCard.tsx
import React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, StarOff, ArrowRight, Bug, Code, Wrench } from "lucide-react";

export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  variables: string[];
  favorite: boolean;
}

interface TemplateCardProps {
  template: Template;
  toggleFavorite?: (id: string) => void;
  variant?: "default" | "detailed";
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  toggleFavorite,
  variant = "default",
}) => {
  const isDetailed = variant === "detailed";

  return (
    <Card
      key={template.id}
      className={isDetailed ? "group hover:shadow-md transition-all" : ""}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="bg-primary/10 p-2 rounded-full">
            {template.icon === "bug" && <Bug className="h-5 w-5" />}
            {template.icon === "code" && <Code className="h-5 w-5" />}
            {template.icon === "wrench" && <Wrench className="h-5 w-5" />}
          </div>

          {isDetailed ? (
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="group-hover:border-primary group-hover:text-primary transition-colors"
              >
                {template.category}
              </Badge>
              {toggleFavorite && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(template.id);
                  }}
                  aria-label={
                    template.favorite
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  {template.favorite ? (
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ) : (
                    <StarOff className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              {template.category}
            </div>
          )}
        </div>

        <CardTitle
          className={
            isDetailed
              ? "mt-4 group-hover:text-primary transition-colors"
              : "mt-4"
          }
        >
          {template.title}
        </CardTitle>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>

      {template.variables.length > 0 && (
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
      )}

      <CardFooter className={isDetailed ? "flex gap-2" : ""}>
        <Link
          href={`/templates/${template.id}`}
          className={isDetailed ? "flex-1" : "w-full"}
        >
          <Button
            variant="outline"
            className={`w-full cursor-pointer ${
              isDetailed ? "group-hover:bg-primary/10 transition-colors" : ""
            }`}
          >
            Use <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>

        {isDetailed && (
          <Link href={`/templates/${template.id}/edit`} className="flex-1">
            <Button variant="outline" className="w-full cursor-pointer">
              Edit
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;
