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
import { useState } from "react";

export function AddOrderDialog() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderData = {
      name,
      code
    }
    try {
      const res = await fetch("/api/addorder",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(orderData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);  // エラーメッセージをスロー
      }
      
      alert("Order added successfully!");
      // 状態のリセット
      setName("");
      setCode("");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error adding order:", error.message);
        alert("Error adding order: " + error.message);
      } else {
        console.error("Unknown error adding order:", error);
        alert("Unknown error occurred");
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="shadow-sm">
          <Plus></Plus>工番追加
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>工番を追加</DialogTitle>
          </DialogHeader>
          <div className="grid flex-2 space-y-4 py-8">
            <div>
              <Label htmlFor="ordername">工番名称</Label>
              <Input
                id="ordername"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
            </div>
            <div>
              <Label htmlFor="orderID">工番</Label>
              <Input
                id="orderID"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                type="text"
              />
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
