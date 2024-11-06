'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WorkerData } from "../page";

type searchProps = {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    selectedCompany: string;
    setSelectedCompany: React.Dispatch<React.SetStateAction<string>>;
    workerListData: WorkerData[];
}

export function Toolbar({searchTerm, setSearchTerm, selectedCompany, setSelectedCompany, workerListData}:searchProps) {
  return (
    <div className="flex justify-between bg-muted/50">
      <div className="flex space-x-4 ">
        <Input
          type="text"
          placeholder="検索"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></Input>
        <Select value={selectedCompany} onValueChange={setSelectedCompany}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="会社を選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">ALL</SelectItem>
              {Array.from(
                new Set(workerListData.map((user) => user.company_name))
              ).map((company) => (
                <SelectItem key={company} value={company}>
                  {company}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex space-x-4 ">
        <Button>インポート</Button>
        <Button>追加</Button>
      </div>
    </div>
  );
}
