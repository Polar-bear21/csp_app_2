import { AddWorkerDialog } from "../components/add/add-worker-button";
import { columns, WorkerList } from "../components/columns/workerList-columns";
import { Export_Wbutton } from "../components/export-button";
import { DataTable } from "../components/report-table";
import { getCompany, getProjects } from "../action/master-data";

// 取得する方のworkerList型の指定
interface RawWorkerListData {
  id: number;
  worker_name: string;
  company_name: string;
  user_id: string;
  project_codes: string | null;
}

// テーブルに表示するデータ
async function getData(): Promise<WorkerList[]> {
  // Fetch data from your API here.
  
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${baseUrl}/api/worker-data`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  console.log("APIリクエスト完了");
  const workerList: WorkerList[] = data.map((item: RawWorkerListData) => ({
    id: item.id,
    worker_name: item.worker_name,
    company_name: item.company_name,
    user_id: item.user_id,
    project_codes: item.project_codes,
  }));

  return workerList;
  // ...
}

export interface ListItem {
  id: number;
  label: string;
};

export default async function page() {
  const p_data = await getProjects();
  const projects:ListItem[] = p_data.map((row:{id:number,code:string})=>({
    id: row.id,
    label: row.code
  }))
  
  const c_data = await getCompany();
  const companys:ListItem[] = c_data.map((row:{id:number,name:string})=>({
    id: row.id,
    label: row.name
  }))

  const data = await getData();
  return (
    <div>
      <div className="container mx-auto flex justify-end space-x-4">
        <Export_Wbutton data={data} />
        <AddWorkerDialog projects={projects} companys={companys}/>
      </div>
      <div className="container mx-auto">
        {/* フィルターを表示するかどうかを選べる */}
        <DataTable
          columns={columns}
          data={data}
          showButton={true}
          filterValue="worker_name"
          filterLabel="氏名"
        />
      </div>
    </div>
  );
}
