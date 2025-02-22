"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  VisibilityState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  Settings2,
  X,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { BatchDeleteDialogR } from "./delete/delete-reports";
import { BatchApprovalDialogR } from "./edit/approval-reports";
import { BatchRejectedDialogR } from "./edit/rejected-reports";


// 受け取るデータ
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]; // データの定義
  data: TData[]; // 実際の値
  showButton?: boolean; // ボタンの表示を制御するプロパティ
  filterValue: string; // フィルタリング対象の列名
  filterLabel: string; // フィルタリング用の表示名
}

export function DataTable<TData, TValue>({
  columns,
  data,
  showButton,
  filterValue,
  filterLabel,
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({}); // 行可視状態
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  ); // フィルターボタン
  const [rowSelection, setRowSelection] = useState({}); //

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility, // 行可視・不可視
    state: { columnVisibility, columnFilters, rowSelection },
  });

  // 選択された行s
  const selectrows = table.getFilteredSelectedRowModel().rows;
  // 選択された行の情報をオブジェクト配列で取得
  const selectedReports = selectrows.map((row) => {
    const { id, status } = row.original as { id: number; status: string };
    return { id, status };
  });

  return (
    <div>
      {/* 上部ボタン群 */}
      <div className="flex items-center space-x-4 py-4">
        {/* 条件付きフィルター機能 */}
        {showButton && (
          <div className="relative max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder={`${filterLabel} 検索`}
              value={
                (table.getColumn(filterValue)?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn(filterValue)?.setFilterValue(event.target.value)
              }
              className="pl-8 h-10"
            />
          </div>
        )}
        {/* Status フィルタリングドロップダウン */}
        {table.getColumn("status") && (
          <div className="flex items-center space-x-2">
            <Select
              // allを追加、デフォルトでallを選択
              value={
                (table.getColumn("status")?.getFilterValue() as
                  | "approved"
                  | "pending"
                  | "rejected"
                  | "all") ?? "all"
              }
              // allなら検索に何も入れない
              onValueChange={(value) =>
                table
                  .getColumn("status")
                  ?.setFilterValue(value === "all" ? undefined : value)
              }
            >
              <SelectTrigger className="w-[100px]">status</SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="approved">承認済み</SelectItem>
                <SelectItem value="pending">保留中</SelectItem>
                <SelectItem value="rejected">却下</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-autos h-10">
                <Settings2 />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* ALLオプションの追加 */}
              <DropdownMenuCheckboxItem
                key="all"
                className="capitalize"
                checked={table
                  .getAllColumns()
                  .every((column) => column.getIsVisible())}
                onCheckedChange={(value) => {
                  // ALLが選択されたらすべての列を表示
                  table.getAllColumns().forEach((column) => {
                    column.toggleVisibility(!!value);
                  });
                }}
              >
                ALL
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />

              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      // className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {typeof column.columnDef.header === "string"
                        ? column.columnDef.header
                        : ""}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {selectrows.length > 0 && (
          <div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-autos h-10"
                  onClick={() => table.resetRowSelection()}
                >
                  <X className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                </Button>
                <span className="text-sm font-medium">
                  {selectrows.length}個を選択中
                </span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-sm font-medium"
                  >
                    一括処理
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <BatchApprovalDialogR selectedReports={selectedReports} />
                  <BatchRejectedDialogR selectedReports={selectedReports}/>
                  <DropdownMenuSeparator />
                  <BatchDeleteDialogR selectedReports={selectedReports} />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}
      </div>
      {/* テーブル本体 */}
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-neutral-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* テーブル下のボタン群 */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">表示件数</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <div>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
