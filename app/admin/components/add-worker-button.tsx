"use client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronsUpDown, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect} from "react";
import { ProjectList } from "./columns/orderList-columns";

export function AddWorkerDialog() {
  async function getData(): Promise<ProjectList[]> {
    // Fetch data from your API here.
    const res = await fetch("http://localhost:3000/api/project-data", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    const projectList: ProjectList[] = data.map(
      (item: { project_id: number; project_name: string }) => ({
        id: item.project_id,
        project_names: item.project_name,
      })
    );
    return projectList;
  }
  useEffect(() => {
    const data = getData();
    console.log(data);
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="shadow-sm">
          <Plus></Plus>作業者追加
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form>
          <DialogHeader>
            <DialogTitle>作業者を追加</DialogTitle>
          </DialogHeader>
          <div className="grid flex-2 space-y-4 py-8">
            <div>
              <Label htmlFor="worker_name">氏名</Label>
              <Input id="worker_name" type="text" />
            </div>
            <div>
              <Label htmlFor="company">会社名</Label>
              <Select>
                <SelectTrigger id="company">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Company A">Company A</SelectItem>
                  <SelectItem value="Company B">Company B</SelectItem>
                  <SelectItem value="Company C">Company C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="userID">User ID</Label>
              <Input id="userID" type="text" />
              <p className="text-xs text-gray-500">ログイン用ID</p>
            </div>
            <div>
              <Label htmlFor="new_password">Password</Label>
              <Input id="new_password" />
              <p className="text-xs text-gray-500">ログイン用password</p>
            </div>
            <div>
              <Label htmlFor="project">可能工番</Label>
              <DropdownMenu>
                <DropdownMenuTrigger id="project" asChild>
                  <Button className="w-full justify-between" variant="outline">
                    Open
                    <ChevronsUpDown className=" opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="">
                  <DropdownMenuLabel>工番</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem >
                    Status Bar
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    Activity Bar
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Panel</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
