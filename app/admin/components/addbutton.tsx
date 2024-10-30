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
import DualNumericInput from "@/components/dual-input";

export default function AddReportDialog() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [state, setState] = useState("pending");
  const [workerId, setWorkerId] = useState("");
  const [projectID, setprojectID] = useState("");
  // スタート時刻状態
  const [startHour, setStartHour] = useState("");
  const [startMinute, setStartMinute] = useState("");
  const handleStartTimeChange = (newHours: string, newMinutes: string) => {
    setStartHour(newHours);
    setStartMinute(newMinutes);
  };
  //終了時刻状態
  const [endHour, setEndHour] = useState("");
  const [endMinute, setEndMinute] = useState("");
  const handleEndTimeChange = (newHours: string, newMinutes: string) => {
    setEndHour(newHours);
    setEndMinute(newMinutes);
  };
  // 休憩時間状態
  const [breakHour, setBreakHour] = useState("");
  const [breakMinute, setBreakMinute] = useState("");
  const handleBreakTimeChange = (newHours: string, newMinutes: string) => {
    setBreakHour(newHours);
    setBreakMinute(newMinutes);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // フォームのデフォルトの送信を防ぐ

    const reportData = {
      date,
      workerId,
      projectID,
      startHour,
      startMinute,
      endHour,
      endMinute,
      breakHour,
      breakMinute,
      state,
    };
    try {
      const res = await fetch("/api/addreport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportData),
      });

      if (!res.ok) {
        throw new Error("Failed to add report");
      }

      alert("Report added successfully!"); // 成功メッセージを表示
      // 必要に応じて、ダイアログを閉じたり、状態をリセットするロジックを追加することができる
      // 状態のリセットだけ
      setDate(undefined);
      setWorkerId("");
      setprojectID("");
      setStartHour("");
      setStartMinute("");
      setEndHour("");
      setEndMinute("");
      setBreakHour("");
      setBreakMinute("");
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
      <DialogTrigger>Open</DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>新しい日報を追加</DialogTitle>
          </DialogHeader>
          <div className="grid flex-2 space-y-4 mb-4">
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
              />
            </div>
            <div>
              <Label htmlFor="projectID">工事ID</Label>
              <Input
                id="projectID"
                defaultValue="工事ID"
                value={projectID}
                onChange={(e) => setprojectID(e.target.value)}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label>開始時刻</Label>
                <DualNumericInput
                  hours={startHour}
                  minutes={startMinute}
                  onTimeChange={handleStartTimeChange}
                />
              </div>
              <div>
                <Label>終了時刻</Label>
                <DualNumericInput
                  hours={endHour}
                  minutes={endMinute}
                  onTimeChange={handleEndTimeChange}
                />
              </div>
              <div>
                <Label>休憩時間</Label>
                <DualNumericInput
                  hours={breakHour}
                  minutes={breakMinute}
                  onTimeChange={handleBreakTimeChange}
                />
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
