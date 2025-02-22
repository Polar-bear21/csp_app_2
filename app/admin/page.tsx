// ファイルの先頭に以下を追加
export const dynamic = "force-dynamic"
export const revalidate = 0

// daily-reportテーブル
import { DataTable } from "./components/report-table";
import { Report, columns } from "./components/columns/report-columns";
import { AddReportDialog } from "./components/add/add-report-button";
import { Export_Rbutton } from "./components/export-button";
import { getProjects, getWorkers } from "./action/master-data";
import { getAllReports } from "./fetchers/master-data";

// 取得する方のdaily_report型の指定l
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

export interface ListItem {
  id: number;
  label: string;
};

// テーブルに表示するデータ: データの型は admin/componets/columnsで確認
async function getData(): Promise<Report[]> {
  //データ取得
    const response  = await getAllReports();
    const data = await response.json()
    console.log("APIリクエスト完了");
    // データ整形
  const report: Report[] = data.map((item: RawReportData) => ({
    id: item.id,
    // date: new Date(item.date).toISOString().split("T")[0], // 日付部分のみ抽出
    date: new Date(item.date).toLocaleDateString('ja-JP').split("T")[0], // 日付部分のみ抽出
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
  // データ加工
  const data = await getData();
  console.count("APIリクエスト");
  const p_data = await getProjects();
  const projects:ListItem[] = p_data.map((row:{id:number,code:string})=>({
    id: row.id,
    label: row.code
  }))
  const w_data = await getWorkers();
  const workers:ListItem[] = w_data.map((row:{id:number,name:string})=>({
    id: row.id,
    label: row.name
  }))

  return (
    <div className="">
      <div className="container mx-auto flex justify-end space-x-4">
        <Export_Rbutton data={data} />
        <AddReportDialog projects={projects} workers={workers}/>
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
