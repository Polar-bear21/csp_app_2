"use client";
import * as XLSX from "xlsx";
import React from "react";
import { WorkerList } from "./columns/workerList-columns";

type ExportButtonProps = {
  data: WorkerList[];
};

export function ExportButton({ data }: ExportButtonProps) {
  // CSVエクスポート関数
  const exportExcel = () => {
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

    // シート作成
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    // ブック作成
    const workbook = XLSX.utils.book_new();
    // ブックにシートを追加
    XLSX.utils.book_append_sheet(workbook, worksheet, "Workers");

    // Excelファイルとしてエクスポート
    XLSX.writeFile(workbook, "worker_data.xlsx");
  };

  return (
    <div>
      <button
        onClick={exportExcel}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Export Excel
      </button>
    </div>
  );
}
