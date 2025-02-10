// ファイルの先頭に以下を追加
export const dynamic = "force-dynamic"
export const revalidate = 0

import { AddOrderDialog } from "../components/add/add-order-button";
import { columns, ProjectList } from "../components/columns/orderList-columns";
import { Export_Pbutton } from "../components/export-button";
import { DataTable } from "../components/report-table";
import { getAllProjects } from "../fetchers/master-data";

// テーブルに表示するデータ
async function getData(): Promise<ProjectList[]> {
  //データ取得
    const response  = await getAllProjects();
    const data = await response.json()

    // データ整形
  const projectList: ProjectList[] = data.map(
    (item: {project_id: number; project_name: string; project_code: string; worker_names: string }) => ({
      id: item.project_id,
      project_names: item.project_name,
      project_code: item.project_code,
      workers: item.worker_names,
    })
  );

  return projectList;
  // ...
}

export default async function page() {
  const data = await getData();
  return (
    <div>
      <div className="container mx-auto flex justify-end space-x-4">
        <Export_Pbutton data={data}></Export_Pbutton>
        <AddOrderDialog></AddOrderDialog>
      </div>
      <div className="container mx-auto p-0">
        {/* フィルターを表示するかどうかを選べる */}
        <DataTable
          columns={columns}
          data={data}
          showButton={true}
          filterValue="project_names"
          filterLabel="工番名称"
        />
      </div>
    </div>
  );
}
