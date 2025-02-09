"use client";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DatePickerDemo } from "@/components/datepicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ListItem } from "../../page";

interface Props {
  projects: ListItem[];
  workers: ListItem[];
}

export function AddReportDialog({ projects, workers }: Props) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [start_time, setStart_time] = useState("");
  const [end_time, setEnd_time] = useState("");
  const [break_time, setBreak_time] = useState("");
  const [state, setState] = useState("pending");

  const [selectedProject, setSelectedProject] = useState<ListItem | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<ListItem | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // フォームのデフォルトの送信を防ぐ
    const workerId = selectedWorker?.id;
    const projectID = selectedProject?.id;

    const reportData = {
      date: new Date(date || new Date).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\//g, '-'),
      workerId,
      projectID,
      start_time,
      end_time,
      break_time,
      state,
    };
    try {
      const res = await fetch("/api/addreport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportData),
      });

      if (!res.ok) {
        const errorData = await res.json(); // エラーメッセージを取得
        throw new Error(errorData.message); // エラーメッセージをスロー
      }

      alert("Report added successfully!"); // 成功メッセージを表示
      // 必要に応じて、ダイアログを閉じたり、状態をリセットするロジックを追加することができる
      // 状態のリセットだけ
      setDate(undefined);
      setSelectedWorker(null);
      setSelectedProject(null);
      setStart_time("");
      setEnd_time("");
      setBreak_time("");
      setState("pending");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error adding report:", error.message);
        alert("Error adding report: " + error.message);
      } else {
        console.error("Unknown error adding report:", error);
        alert("Unknown error occurred");
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="shadow-sm">
          <Plus></Plus>日報追加
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>新しい日報を追加</DialogTitle>
          </DialogHeader>
          <div className="grid flex-2 space-y-4 py-8">
            <div>
              <Label>作業日</Label>
              <DatePickerDemo date={date} setDate={setDate}></DatePickerDemo>
            </div>
            <div>
              <Label htmlFor="workerId">作業者</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                    id="workerId"
                  >
                    {selectedWorker ? selectedWorker.label : "作業者選択"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 h-100 p-0" align="end">
                  <Command>
                    <CommandInput placeholder="検索" className="w-full" />
                    <CommandList>
                      <CommandEmpty>not found</CommandEmpty>
                      <CommandGroup>
                        {workers.map((worker) => (
                          <CommandItem
                            key={worker.id}
                            onSelect={() => setSelectedWorker(worker)}
                            value={`${worker.id}-${worker.label}`} // ユニークな値を設定
                          >
                            <div
                              className={cn(
                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                selectedWorker?.id === worker.id
                                  ? "bg-primary text-primary-foreground"
                                  : "opacity-50 [&_svg]:invisible"
                              )}
                            >
                              <Check className={cn("h-4 w-4")} />
                            </div>
                            <span className="flex-1">{worker.label}</span>
                            <span className="text-muted-foreground">
                              ID: {worker.id}
                            </span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </DropdownMenuContent>
              </DropdownMenu>
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
                <Label>終了時刻</Label>
                <Input
                  id="end_time"
                  type="time"
                  value={end_time}
                  onChange={(e) => setEnd_time(e.target.value)}
                ></Input>
              </div>
              <div>
                <Label>休憩時間</Label>
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
                defaultValue="pending"
                onValueChange={(value) => setState(value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">保留中</SelectItem>
                  <SelectItem value="approved">承認済み</SelectItem>
                  <SelectItem value="rejected">却下</SelectItem>
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
              追加
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
