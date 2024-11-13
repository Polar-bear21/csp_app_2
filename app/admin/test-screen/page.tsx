import CardTable from "./components/card-table";
// APIエンドポイントで受け取るデータ
type WorkerDataAPI = {
  id: number;
  worker_name: string;
  company_name: string;
  user_id: string;
  project_names: string;
};

// 作成するwoeker Data
export interface WorkerData  {
  id: number;
  worker_name: string;
  company_name: string;
  user_id: string;
  project_names?: string[];
};

// テーブルに表示するデータ
async function getData() {
  // Fetch data from your API here.
  const res = await fetch("https://csp-app-2.vercel.app/api/worker-data", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  console.log("APIリクエスト完了");
  const workerList: WorkerData[] = data.map((item: WorkerDataAPI) => ({
    id: item.id,
    worker_name: item.worker_name,
    company_name: item.company_name,
    user_id: item.user_id,
    project_names: item.project_names?.split(","),
  }));

  return workerList;
  // ...
}

export default async function page() {
  const workerlist = await getData();
  return <div>
    <CardTable workerdata={workerlist}></CardTable>
  </div>;
}
