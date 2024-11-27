"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DatePickerDemo } from "@/components/datepicker";
import { time } from "console";



export default function page() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [state, setState] = useState("pending");
  const [workerId, setWorkerId] = useState("");
  const [projectID, setprojectID] = useState("");
  const [time, setTime] = useState("08:00");
  const reportData = {
    date,
    workerId,
    projectID,
    state,
  };
  const handleTime = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setTime(e.target.value)
  }
  const handleSubmit = () => {
    console.log(reportData);
  }

  return (
    <div>
      <h3>worker</h3>
      <Label htmlFor="time">時間</Label>
      <Input id="time" type="time" value={time} onChange={handleTime}></Input>
      {time}

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
                <Label>開始時刻</Label>
                <Input
                type="time"
              />
              </div>
              <div>
                <Label>終了時刻</Label>
                <Input
                type="time"
              />
                
              </div>
              <div>
                <Label>休憩時間</Label>
                <Input
                type="time"
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
    </div>
  );
}
