import { AddWorkerDialog } from "../components/add/add-worker-button";
import { columns, WorkerList } from "../components/columns/workerList-columns";
import { Export_Wbutton } from "../components/export-button";
import { DataTable } from "../components/report-table";
import { getCompany, getProjects } from "../action/master-data";
import { getAllWorkers } from "../fetchers/master-data";

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
  //データ取得
  const response  = await getAllWorkers();
  const data = await response.json()
  console.log("APIリクエスト完了");
  // データ整形
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
