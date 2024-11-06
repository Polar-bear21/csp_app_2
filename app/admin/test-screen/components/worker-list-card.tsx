"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit2 } from "lucide-react";
import { WorkerData } from "../page";

export function WorkerCard({
  id,
  worker_name,
  company_name,
  user_id,
  project_names,
}: WorkerData) {
  return (
    <Card className="min-h-full">
      <CardHeader>
        <div className="flex justify-between  items-start">
          <div>
            <div className="text-sm text-muted-foreground mb-1">ID: {id}</div>
            <h2 className="text-2xl font-bold tracking-tight">{worker_name}</h2>
            <CardDescription>会社名: {company_name}</CardDescription>
          </div>
          <Button size="icon" variant="ghost">
            <Edit2></Edit2>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            User ID:
          </span>
          <span className="font-medium">{user_id}</span>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">プロジェクト:</div>
          <div className="flex flex-wrap gap-2">
            {project_names?.map((project) => (
              <Badge
                key={project}
                variant="secondary"
                className="cursor-pointer bg-gray-100 text-gray-800 hover:bg-gray-200"
              >
                <div className="text-sm">{project}</div>
                
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
