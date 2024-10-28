// daily-reportテーブル

import { DataTable } from "./components/report-table";
import { Report, columns } from "./components/columns/report-columns";

// テーブルに表示するデータ
// データの型は admin/componets/columnsで確認
async function getData(): Promise<Report[]> {
  // Fetch data from your API here.
  const res = await fetch("http://localhost:3000/api/report-data");  // エラーが出るから絶対パスで指定
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  const report: Report[] = data.map((item: any) => ({
    id: item.id,
    data: new Date(item.date).toISOString().split('T')[0],  // 日付部分のみ抽出
    worker_id: item.worker_id,  
    project_id: item.project_id,
    start_time: item.start_time,
    end_time: item.end_time,
    break_time: item.break_time,
    duration: item.duration,
    status: item.status,
    approver_id: item.approver_id,  
  }));
  return report;
  // ...
}

export default async function page() {
  const data = await getData();
  //console.log(data)

  return (
    <div className="container mx-auto">
      {/* フィルターを表示するかどうかを選べる */}
      <DataTable columns={columns} data={data} showButton={true} />
    </div>
  );
}
