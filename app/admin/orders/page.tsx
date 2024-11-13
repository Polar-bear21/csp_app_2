import { columns, ProjectList } from "../components/columns/orderList-columns";
import { Export_Pbutton } from "../components/export-button";
import { DataTable } from "../components/report-table";

// テーブルに表示するデータ
async function getData(): Promise<ProjectList[]> {
  // Fetch data from your API here.
  
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${baseUrl}/api/project-data`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  const projectList: ProjectList[] = data.map(
    (item: {project_id: number; project_name: string; worker_names: string }) => ({
      id: item.project_id,
      project_names: item.project_name,
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
      </div>
      <div className="container mx-auto p-0">
        {/* フィルターを表示するかどうかを選べる */}
        <DataTable
          columns={columns}
          data={data}
          showButton={true}
          filterValue="project_names"
          filterLabel="工番"
        />
      </div>
    </div>
  );
}
