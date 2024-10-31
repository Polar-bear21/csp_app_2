import { columns, ProjectList } from "../components/columns/orderList-columns";
import { DataTable } from "../components/report-table";

// テーブルに表示するデータ
async function getData(): Promise<ProjectList[]> {
  // Fetch data from your API here.
  const res = await fetch(
    "http://localhost:3000/api/project-data",
    { cache: 'no-store' }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  console.log('APIリクエスト完了');
  const projectList: ProjectList[] = data.map((item: any) => ({
    id: item.project_id,
    project_names: item.project_name,
    workers: item.worker_names,
  }));

  return projectList;
  // ...
}


export default async function page() {
  const data = await getData();
  return (
    <div className="container mx-auto">
      {/* フィルターを表示するかどうかを選べる */}
      <DataTable columns={columns} data={data} showButton={true} filterValue="project_names"/>
    </div>
  );
}
