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
import { Check, ChevronsUpDown, Plus, Search, X } from "lucide-react";
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

type Item = {
  id: string;
  label: string;
};
const items: Item[] = [
  { id: "1", label: "P001" },
  { id: "2", label: "P002" },
  { id: "3", label: "P003" },
  { id: "4", label: "P004" },
  { id: "5", label: "P005" },
  { id: "6", label: "P006" },
  { id: "7", label: "P007" },
  { id: "8", label: "P008" },
  { id: "9", label: "P009" },
  { id: "10", label: "P0010" },
];

export function AddWorkerDialog() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const handleCheckboxChange = (id: string) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(id)) {
        // 既に選択されている場合は削除
        return prevSelected.filter((itemId) => itemId !== id);
      } else {
        // 選択されていない場合は追加
        return [...prevSelected, id];
      }
    });
  };
  const handleCheckboxClere = () => {
    setSelectedItems([]);
  };

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
              <Input id="new_password" type="password"/>
              <p className="text-xs text-gray-500">ログイン用password</p>
            </div>
            <div>
              <Label htmlFor="project">可能工番</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {selectedItems.length > 0
                      ? `${selectedItems.length} selected`
                      : "工番選択"}
                    <ChevronsUpDown className=" opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 h-100 p-0" align="end">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="w-full"
                    />
                    <CommandList>
                      <CommandEmpty>Not found.</CommandEmpty>

                      <CommandGroup className="space-y-1">
                        {items.map((item) => (
                          <CommandItem
                            key={item.id}
                            value={item.label}
                            onSelect={() => handleCheckboxChange(item.id)}
                          >
                            <div
                              className={cn(
                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                selectedItems.includes(item.id)
                                  ? "bg-primary text-primary-foreground"
                                  : "opacity-50 [&_svg]:invisible"
                              )}
                            >
                              <Check />
                            </div>
                            {item.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                    {selectedItems.length > 0 && (
                      <div>
                        <CommandSeparator />
                        <CommandGroup>
                          <CommandItem
                            className="justify-center text-center"
                            onSelect={() => handleCheckboxClere()}
                          >
                            Clear
                          </CommandItem>
                        </CommandGroup>
                      </div>
                    )}
                  </Command>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedItems.map((itemId) => {
                  const item = items.find((i) => i.id === itemId);
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
                          onClick={() => handleCheckboxChange(itemId)}
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
      </DialogContent>
    </Dialog>
  );
}

//*
