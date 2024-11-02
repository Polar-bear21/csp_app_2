"use client";
import * as XLSX from "xlsx";
import { WorkerList } from "./columns/workerList-columns";
import { ProjectList } from "./columns/orderList-columns";
import { Report } from "./columns/report-columns";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

// excelフォーマットを作成
const exportToExcel = (data: Array<Array<string | number | undefined>>, fileName: string) => {
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Excelファイルとしてエクスポート
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

const handleExportReports = (data: Report[]) => {
  const headers = [
    "ID",
    "日付",
    "作業者",
    "工番",
    "開始時刻",
    "終了時刻",
    "休憩時間",
    "所要時間",
    "Status",
    "Chekcer",
  ];
  const rows = data.map((item) => [
    item.id,
    item.data,
    item.worker_name,
    item.project_name,
    item.start_time,
    item.end_time,
    item.break_time,
    item.duration,
    item.status,
    item.approver_id,
  ]);
  exportToExcel([headers, ...rows], "report_file");
};
const handleExportWorkers = (data: WorkerList[]) => {
  const headers = [
    "ID",
    "Worker Name",
    "Company Name",
    "User ID",
    "Project Names",
  ];
  const rows = data.map((item) => [
    item.id,
    item.worker_name,
    item.company_name,
    item.user_id,
    item.project_names,
  ]);
  exportToExcel([headers, ...rows], "worker_list_file");
};

const handleExportProjects = (data: ProjectList[]) => {
  const headers = ["ID", "Project Names", "Workers"];
  const rows = data.map((item) => [item.id, item.project_names, item.workers]);
  exportToExcel([headers, ...rows], "project_list_file");
};

// export excelボタン群
export function Export_Rbutton({ data }: { data: Report[] }) {
  return (
    <Button
      onClick={() => handleExportReports(data)}
      variant="outline"
      className="shadow-sm"
    >
      <Download />
      Export Excel File
    </Button>
  );
}
export function Export_Wbutton({ data }: { data: WorkerList[] }) {
  return (
    <Button
      onClick={() => handleExportWorkers(data)}
      variant="outline"
      className="shadow-sm"
    >
      <Download />
      Export Excel File
    </Button>
  );
}
export function Export_Pbutton({ data }: { data: ProjectList[] }) {
  return (
    <Button
      onClick={() => handleExportProjects(data)}
      variant="outline"
      className="shadow-sm"
    >
      <Download />
      Export Excel File
    </Button>
  );
}
