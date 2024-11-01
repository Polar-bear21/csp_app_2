// daily-reportテーブル

import { DataTable } from "./components/report-table";
import { Report, columns } from "./components/columns/report-columns";
import AddReportDialog from "./components/addbutton";
import { Export_Rbutton } from "./components/export-button";

// テーブルに表示するデータ
// データの型は admin/componets/columnsで確認
async function getData(): Promise<Report[]> {
  console.log("APIリクエスト開始");
  // Fetch data from your API here.
  // エラーが出るから絶対パスで指定
  // cacheをnoにしないと更新されない
  const res = await fetch("http://localhost:3000/api/report-data", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  console.log("APIリクエスト完了");
  const report: Report[] = data.map((item: any) => ({
    id: item.id,
    data: new Date(item.date).toISOString().split("T")[0], // 日付部分のみ抽出
    worker_name: item.worker_name,
    project_name: item.project_name,
    start_time: item.start_time.slice(0, -3), // 最後の:00を消す
    end_time: item.end_time.slice(0, -3),
    break_time:
      item.break_time !== null ? item.break_time.slice(0, -3) : item.break_time,
    duration: item.duration.slice(0, -3),
    status: item.status,
    approver_id: item.approver_id,
  }));
  return report;
  // ...
}

export default async function page() {
  const data = await getData();
  console.count("APIリクエスト");

  return (
    <div className="">
      <Export_Rbutton data={data}></Export_Rbutton>
      <div className="container mx-auto flex justify-end">
        <AddReportDialog></AddReportDialog>
      </div>
      <div className="container mx-auto p-0">
        {/* フィルターを表示するかどうかを選べる */}
        <DataTable
          columns={columns}
          data={data}
          showButton={true}
          filterValue="status"
          filterLabel="Status"
        />
      </div>
    </div>
  );
}
