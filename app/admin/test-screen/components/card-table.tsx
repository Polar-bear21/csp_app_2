'use client'
import { useMemo, useState } from "react";
import { WorkerData } from "../page";
import { WorkerCard } from "./worker-list-card";
import { Toolbar } from "./tool-bar";

interface Props {
    workerdata: WorkerData[]; // 複数のWorkerDataを受け取る
}

export default function CardTable({workerdata}: Props) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCompany, setSelectedCompany] = useState<string>("all");
  
    const filteredUsers:WorkerData[] = useMemo(() => {
      return workerdata.filter(
        (user) =>
          (selectedCompany === "all" || user.company_name === selectedCompany) &&
          (user.worker_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.user_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.project_names?.some((project) =>
              project.toLowerCase().includes(searchTerm.toLowerCase())
            ))
      );
    }, [searchTerm, selectedCompany, workerdata]);
    return (
      <div className="flex flex-col gap-8">
        <Toolbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
          workerListData={workerdata}
        />
        <div className="grid auto-rows-min gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user) => (
            <div key={user.id}>
              <WorkerCard
                id={user.id}
                worker_name={user.worker_name}
                company_name={user.company_name}
                user_id={user.user_id}
                project_names={user.project_names}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  