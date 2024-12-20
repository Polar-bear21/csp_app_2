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
import { Check, ChevronsUpDown, Plus, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListItem } from "../../workers/page";

interface Props {
  projects: ListItem[];
  companys: ListItem[];
}

export function AddWorkerDialog({ projects, companys }: Props) {
  const [worker_name, setWorker_name] = useState("");
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<ListItem | null>(null);

  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);
  const handleProjectToggle = (projectId: number) => {
    setSelectedProjects((prev) => {
      const newSelection = prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId];
      return newSelection;
    });
  };
  const clearSelection = () => {
    setSelectedProjects([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const company_id = selectedCompany?.id;
    const workerData = {
      worker_name,
      userID,
      password,
      company_id,
      selectedProjects,
    };

    try {
      const res = await fetch("/api/addworker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workerData),
      });

      if (!res.ok) {
        const errorData = await res.json(); // エラーメッセージを取得
        throw new Error(errorData.message); // エラーメッセージをスロー
      }

      alert("Worker added successfully!");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error adding Worker:", error.message);
        alert("Error adding Worker: " + error.message);
      } else {
        console.error("Unknown error adding Worker:", error);
        alert("Unknown error occurred");
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="shadow-sm">
          <Plus></Plus>作業者追加
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>作業者を追加</DialogTitle>
          </DialogHeader>
          <div className="grid flex-2 space-y-4 py-8">
            <div>
              <Label htmlFor="worker_name">氏名</Label>
              <Input
                id="worker_name"
                type="text"
                value={worker_name}
                onChange={(e) => setWorker_name(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="company">会社名</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    {selectedCompany ? selectedCompany.label : "会社選択"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 h-100 p-0" align="end">
                  <Command>
                    <CommandInput placeholder="会社検索" className="w-full" />
                    <CommandList>
                      <CommandEmpty>not found</CommandEmpty>
                      <CommandGroup>
                        {companys.map((company) => (
                          <CommandItem
                            key={company.id}
                            onSelect={() => setSelectedCompany(company)}
                          >
                            <div
                              className={cn(
                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                selectedCompany?.id === company.id
                                  ? "bg-primary text-primary-foreground"
                                  : "opacity-50 [&_svg]:invisible"
                              )}
                            >
                              <Check className={cn("h-4 w-4")} />
                            </div>
                            {company.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <Label htmlFor="userID">User ID</Label>
              <Input
                id="userID"
                type="text"
                value={userID}
                onChange={(e) => setUserID(e.target.value)}
              />
              <p className="text-xs text-gray-500">ログイン用ID</p>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-xs text-gray-500">ログイン用password</p>
            </div>
            <div>
              <Label htmlFor="project">可能工番</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    {selectedProjects.length > 0
                      ? `${selectedProjects.length} 工番選択済み`
                      : "工番選択"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 h-100 p-0" align="end">
                  <Command>
                    <CommandInput placeholder="工番検索" className="w-full" />
                    <CommandList>
                      <CommandEmpty>工番が見つかりません。</CommandEmpty>
                      <CommandGroup>
                        {projects.map((project) => (
                          <CommandItem
                            key={project.id}
                            onSelect={() => handleProjectToggle(project.id)}
                          >
                            <div
                              className={cn(
                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                selectedProjects.includes(project.id)
                                  ? "bg-primary text-primary-foreground"
                                  : "opacity-50 [&_svg]:invisible"
                              )}
                            >
                              <Check className={cn("h-4 w-4")} />
                            </div>
                            {project.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                    {selectedProjects.length > 0 && (
                      <div>
                        <CommandSeparator />
                        <CommandGroup>
                          <CommandItem
                            onSelect={clearSelection}
                            className="justify-center text-center"
                          >
                            選択をクリア
                          </CommandItem>
                        </CommandGroup>
                      </div>
                    )}
                  </Command>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedProjects.map((itemId) => {
                  const item = projects.find((i) => i.id === itemId);
                  return (
                    <div key={itemId}>
                      <Badge
                        key={itemId}
                        variant="secondary"
                        className="py-1 px-2"
                      >
                        {item?.label}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-auto p-0"
                          onClick={() => handleProjectToggle(itemId)}
                        >
                          <X className="h-3 w-3"></X>
                        </Button>
                      </Badge>
                    </div>
                  );
                })}
              </div>
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
        <div>
          {worker_name}
          {userID}
          {password}
        </div>
      </DialogContent>
    </Dialog>
  );
}

//*
