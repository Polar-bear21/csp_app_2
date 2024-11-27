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

import { Plus } from "lucide-react";

export function AddOrderDialog() {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="shadow-sm">
          <Plus></Plus>工番追加
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form>
          <DialogHeader>
            <DialogTitle>工番を追加</DialogTitle>
          </DialogHeader>
          <div className="grid flex-2 space-y-4 py-8">
            
            <div>
              <Label htmlFor="orderID">工番</Label>
              <Input id="orderID" type="text" />
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

