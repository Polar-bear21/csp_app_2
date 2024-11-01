import { columns, WorkerList } from "../components/columns/workerList-columns";
import { Export_Wbutton } from "../components/export-button";
import { DataTable } from "../components/report-table";

// テーブルに表示するデータ
async function getData(): Promise<WorkerList[]> {
  // Fetch data from your API here.
  const res = await fetch("http://localhost:3000/api/worker-data", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  console.log("APIリクエスト完了");
  const workerList: WorkerList[] = data.map((item: any) => ({
    id: item.id,
    worker_name: item.worker_name,
    company_name: item.company_name,
    user_id: item.user_id,
    project_names: item.project_names,
  }));

  return workerList;
  // ...
}

export default async function page() {
  const data = await getData();
  return (
    <div className="container mx-auto">
      <Export_Wbutton data={data}></Export_Wbutton>
      {/* フィルターを表示するかどうかを選べる */}
      <DataTable
        columns={columns}
        data={data}
        showButton={true}
        filterValue="worker_name"
        filterLabel="氏名"
      />
    </div>
  );
}
