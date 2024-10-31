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
import { EditDialogW } from "../edit-report";

// データ型の定義
export type WorkerList = {
    id: number;
    worker_name: string;
    company_name: string;
    user_id: string;
    project_names: string;
}
// accessorKeyはデータ型のプロパティと一致する必要がある
export const columns: ColumnDef<WorkerList>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "worker_name", header: "氏名" },
    { accessorKey: "company_name", header: "会社名" },
    { accessorKey: "user_id", header: "UserID" },
    { accessorKey: "project_names", header: "可能工番" },
    {
      id: "actions",
      header: "action",
      cell: ({ row }) => {
        const workerlist = row.original;
  
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
                  console.log(workerlist);
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



