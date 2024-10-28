
// データテーブルProps群

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../components/report-table";

// データの型を定義
export type Payment = {
  id: number;
  data: string;
  worker: string;
  project_id: number;
  start_time: string;
  end_time: string;
  break_time: string;
  status: "pending" | "processing" | "success" | "failed";
  approver: string;
};
// accessorKeyはPayment型のプロパティと一致する必要がある
export const columns: ColumnDef<Payment>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "data", header: "日付" },
  { accessorKey: "worker", header: "作業者" },
  { accessorKey: "project_id", header: "工番" },
  { accessorKey: "start_time", header: "開始時刻" },
  { accessorKey: "end_time", header: "終了時刻" },
  { accessorKey: "break_time", header: "休憩時間" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "approver", header: "Chekcer" },
];
// テーブルに表示するデータ
async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  const user: Payment[] = [
    {
      id: 1,
      data: "2024-10-28",
      worker: "W001",
      project_id: 1,
      start_time: "08:00",
      end_time: "17:00",
      break_time: "01:00",
      status: "pending",
      approver: "A001",
    },
  ];
  let currentDate = new Date("2024-10-28");
  const statuses = ["pending", "processing", "success", "failed"];

  for (let i = 1; i < 55; i++) {
    user.push({
       ...user[0],
       id: user[0].id + i,
       data: currentDate.toISOString().split('T')[0],
       status: statuses[i%4],
    });
  }
  return user;
  // ...
}


export default async function page() {
  const data = await getData();
  return (
    <div className="container mx-auto">
      {/* フィルターを表示するかどうかを選べる */}
      <DataTable columns={columns} data={data} showButton={true} />
    </div>
  );
}
