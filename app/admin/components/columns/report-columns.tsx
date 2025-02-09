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
import { EditDialogP } from "../edit/edit-report";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DeleteDialogR } from "../delete/delete-report";

// データの型を定義
export type Report = {
  id: number;
  date: string;
  worker_name: string;
  project_name: string;
  start_time: string;
  end_time: string;
  break_time: string;
  duration: string;
  status: "pending" | "approved" | "rejected";
  approver_id: number | null;
};
// accessorKeyはデータ型のプロパティと一致する必要がある
export const columns: ColumnDef<Report>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    )
  },
  { accessorKey: "id", header: "ID" },
  { accessorKey: "date", header: "日付" },
  { accessorKey: "worker_name", header: "作業者氏名" },
  { accessorKey: "project_name", header: "工番" },
  {
    accessorKey: "start_time",
    header: "開始時刻",
    cell: ({ row }) => {
      const start_time: string = row.getValue("start_time");
      return <div className="text-center">{start_time}</div>;
    },
  },
  {
    accessorKey: "end_time",
    header: "終了時刻",
    cell: ({ row }) => {
      const end_time: string = row.getValue("end_time");
      return <div className="text-center">{end_time}</div>;
    },
  },
  {
    accessorKey: "break_time",
    header: "休憩時間",
    cell: ({ row }) => {
      const break_time: string = row.getValue("break_time");
      return <div className="text-center">{break_time}</div>;
    },
  },
  {
    accessorKey: "duration",
    header: "所要時間",
    cell: ({ row }) => {
      const duration: string = row.getValue("duration");
      return <div className="text-center">{duration}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <div className="flex items-left">
          {status === "approved" && (
            <Badge className="bg-emerald-400 text-white hover:bg-green-600">
              承認済み
            </Badge>
          )}
          {status === "pending" && (
            <Badge className="bg-amber-400 text-white hover:bg-yellow-600">
              保留中
            </Badge>
          )}
          {status === "rejected" && (
            <Badge className="bg-rose-400 text-white hover:bg-red-600">
              却下
            </Badge>
          )}
        </div>
      );
    },
  },
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
            <EditDialogP report={report}></EditDialogP>
            <DeleteDialogR report={report}></DeleteDialogR>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
