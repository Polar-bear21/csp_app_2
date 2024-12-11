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
import { Plus } from "lucide-react";

export function AddReportDialog() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [workerId, setWorkerId] = useState("");
  const [projectID, setprojectID] = useState("");
  const [start_time, setStart_time] = useState("");
  const [end_time, setEnd_time] = useState("");
  const [break_time, setBreak_time] = useState("");
  const [state, setState] = useState("pending");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // フォームのデフォルトの送信を防ぐ

    const reportData = {
      date,
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
      setWorkerId("");
      setprojectID("");
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
        <Button className="shadow-sm"><Plus></Plus>日報追加</Button>
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
              <Label htmlFor="workerId">作業者ID</Label>
              <Input
                id="workerId"
                defaultValue="作業者ID"
                value={workerId}
                onChange={(e) => setWorkerId(e.target.value)}
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
                value={projectID}
                onChange={(e) => setprojectID(e.target.value)}
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
