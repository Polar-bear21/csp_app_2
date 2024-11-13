// daily-reportテーブル
import { DataTable } from "./components/report-table";
import { Report, columns } from "./components/columns/report-columns";
import { AddReportDialog } from "./components/add-report-button";
import { Export_Rbutton } from "./components/export-button";

// 取得する方のdaily_report型の指定
interface RawReportData {
  id: number;
  date: string;
  worker_name: string | null;
  project_name: string | null;
  start_time: string;
  end_time: string;
  break_time: string | null;
  duration: string;
  status: string | null;
  approver_id: number | null;
}
//  kdk

// テーブルに表示するデータ: データの型は admin/componets/columnsで確認
async function getData(): Promise<Report[]> {
  console.log("APIリクエスト開始");
  // Fetch data from your API here.
  // エラーが出るから絶対パスで指定
  // cacheをnoにしないと更新されない
  const res = await fetch("https://csp-app-2.vercel.app/api/report-data", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  console.log("APIリクエスト完了");
  const report: Report[] = data.map((item: RawReportData) => ({
    id: item.id,
    date: new Date(item.date).toISOString().split("T")[0], // 日付部分のみ抽出
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
      <div className="container mx-auto flex justify-end space-x-4">
        <Export_Rbutton data={data} />
        <AddReportDialog />
      </div>
      <div className="container mx-auto p-0">
        {/* フィルターを表示するかどうかを選べる */}
        <DataTable
          columns={columns}
          data={data}
          showButton={true}
          filterValue="worker_name"
          filterLabel="作業者"
        />
      </div>
    </div>
  );
}
