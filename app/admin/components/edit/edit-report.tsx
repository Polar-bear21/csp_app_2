import { DatePickerDemo } from "@/components/datepicker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, ChevronsUpDown, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { getCompany, getProjects } from "../../action/master-data";
import { ListItem } from "../../page";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

type Report = {
  id: number;
  date: string;
  worker_name: string; // number から string に修正
  project_name: string; // number から string に修正
  start_time: string;
  end_time: string;
  break_time: string;
  duration: string;
  status: "pending" | "approved" | "rejected";
  approver_id: number | null;
};

export function EditDialogP({ report }: { report: Report }) {
  // 選択された初期値
  const defaultValues: Report = {
    id: report.id,
    date: report.date,
    worker_name: report.worker_name,
    project_name: report.project_name,
    start_time: report.start_time,
    end_time: report.end_time,
    break_time: report.break_time,
    duration: report.duration,
    status: report.status,
    approver_id: report.approver_id,
  };

  // 入力変数
  const [date, setDate] = useState<Date | undefined>(
    defaultValues.date ? new Date(defaultValues.date) : undefined
  ); // 文字列からDate型に変換
  const [selectedProject, setSelectedProject] = useState<ListItem | null>(null);
  const [status, setStatus] = useState<Report["status"]>(defaultValues.status);
  const [start_time, setStart_time] = useState(defaultValues.start_time);
  const [end_time, setEnd_time] = useState(defaultValues.end_time);
  const [break_time, setBreak_time] = useState(defaultValues.break_time);

  // 工番リスト取得
  const [projects, setProjects] = useState<ListItem[]>([]);
  useEffect(() => {
    async function fetchProjects() {
      const data = await getProjects();
      const transformedData: ListItem[] = data.map((item) => ({
        id: item.id,
        label: item.code, // name を label に変換
      }));
      setProjects(transformedData);

      // 初期値の工番に一致する物を探す
      const foundProject = transformedData.find((project) => project.label === defaultValues.project_name) || null;
      setSelectedProject(foundProject);
    }
    fetchProjects();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Pencil />
          Edit
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent>
        {/* <form onSubmit={handleSubmit}> */}
        <form>
          <DialogHeader>
            <DialogTitle>新しい日報を追加</DialogTitle>
          </DialogHeader>
          <div className="grid flex-2 space-y-4 py-8">
            <div>
              <Label>作業日</Label>
              <DatePickerDemo date={date} setDate={setDate}></DatePickerDemo>
            </div>
            <div>
              <Label htmlFor="worker">作業者</Label>
              <Input
                id="worker"
                disabled
                className="bg-muted"
                value={defaultValues.worker_name}
              />
            </div>
            <div>
              <Label htmlFor="project">工番</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                    id="project"
                  >
                    {selectedProject ? selectedProject.label : "工番選択"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 h-100 p-0" align="end">
                  <Command>
                    <CommandInput placeholder="工番検索" className="w-full" />
                    <CommandList>
                      <CommandEmpty>not found</CommandEmpty>
                      <CommandGroup>
                        {projects.map((projects) => (
                          <CommandItem
                            key={projects.id}
                            onSelect={() => setSelectedProject(projects)}
                          >
                            <div
                              className={cn(
                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                selectedProject?.id === projects.id
                                  ? "bg-primary text-primary-foreground"
                                  : "opacity-50 [&_svg]:invisible"
                              )}
                            >
                              <Check className={cn("h-4 w-4")} />
                            </div>
                            <span className="flex-1">{projects.label}</span>
                            <span className="text-muted-foreground">
                              ID: {projects.id}
                            </span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="start_time">開始時刻</Label>
                <Input
                  id="start_time"
                  type="time"
                  value={start_time}
                  onChange={(e) => setStart_time(e.target.value)}
                ></Input>
              </div>
              <div>
                <Label htmlFor="end_time">終了時刻</Label>
                <Input
                  id="end_time"
                  type="time"
                  value={end_time}
                  onChange={(e) => setEnd_time(e.target.value)}
                ></Input>
              </div>
              <div>
                <Label htmlFor="break_time">休憩時間</Label>
                <Input
                  id="break_time"
                  type="time"
                  value={break_time}
                  onChange={(e) => setBreak_time(e.target.value)}
                ></Input>
              </div>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                defaultValue={status}
                onValueChange={(value: Report["status"]) => setStatus(value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">pending</SelectItem>
                  <SelectItem value="approved">approved</SelectItem>
                  <SelectItem value="rejected">rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-24"
              >
                閉じる
              </Button>
            </DialogClose>
            <Button type="submit" className="w-full sm:w-24">
              更新
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/////
