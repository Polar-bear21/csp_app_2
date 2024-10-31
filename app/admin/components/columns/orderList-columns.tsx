'use client'
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

// データ型の定義
export type ProjectList = {
    id: number;
    project_names: string;
    workers: string;
}
// accessorKeyはデータ型のプロパティと一致する必要がある
export const columns: ColumnDef<ProjectList>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "project_names", header: "名称" },
    { accessorKey: "workers", header: "作業者" },
    {
      id: "actions",
      header: "action",
      cell: ({ row }) => {
        const projectlist = row.original;
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  console.log(projectlist);
                  // navigator.clipboard.writeText(report.status)
                }}
              >
                Console Log object
              </DropdownMenuItem>
              {/* <EditDialogW report={report}></EditDialogW> */}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];



