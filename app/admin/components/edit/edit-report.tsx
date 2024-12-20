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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil } from "lucide-react";
import { useState } from "react";

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

  // 文字列からDate型に変換
  const [date, setDate] = useState<Date | undefined>(
    defaultValues.date ? new Date(defaultValues.date) : undefined
  );
  const [status, setStatus] = useState<Report["status"]>(defaultValues.status);
  const [start_time, setStart_time] = useState(defaultValues.start_time);
  const [end_time, setEnd_time] = useState(defaultValues.end_time);
  const [break_time, setBreak_time] = useState(defaultValues.break_time);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Pencil/>
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
              <Label htmlFor="workerId">作業者ID</Label>
              <Input
                id="workerId"
                defaultValue="作業者ID"
                // value={workerId}
                // onChange={(e) => setWorkerId(e.target.value)}
                type="number"
                min={0}
              />
              <p className="text-xs text-gray-500">半角英数字</p>
            </div>
            <div>
              <Label htmlFor="projectID">工事ID</Label>
              <Input
                id="projectID"
                defaultValue="工事ID"
                // value={projectID}
                // onChange={(e) => setprojectID(e.target.value)}
                type="number"
                min={0}
              />
              <p className="text-xs text-gray-500">半角英数字</p>
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
              追加
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
