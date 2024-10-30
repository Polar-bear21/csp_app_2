"use client";
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


// データの型を定義
export type Report = {
  id: number;
  data: string;
  worker_id: number;
  project_id: number;
  start_time: string;
  end_time: string;
  break_time: string;
  duration: string;
  status: "pending" | "approved" | "rejected";
  approver_id: number;
};
// accessorKeyはPayment型のプロパティと一致する必要がある
export const columns: ColumnDef<Report>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "data", header: "日付" },
  { accessorKey: "worker_id", header: "作業者ID" },
  { accessorKey: "project_id", header: "工番" },
  { accessorKey: "start_time", header: "開始時刻" },
  { accessorKey: "end_time", header: "終了時刻" },
  { accessorKey: "break_time", header: "休憩時間" },
  { accessorKey: "duration", header: "所要時間" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "approver_id", header: "Chekcer" },
  {
    id: "actions",
    header: "action",
    cell: ({ row }) => {
      const report = row.original;

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
                console.log(report);
                // navigator.clipboard.writeText(report.status)
              }}
            >
              Console Log object
            </DropdownMenuItem>
            <EditDialogW report={report}></EditDialogW>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
