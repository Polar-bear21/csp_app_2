'use client'
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Trash2 } from "lucide-react";
import { useState } from "react";
//import { deleteReport } from "../../action/delete-tada";

interface Props {
  report_id: number
}

export function DeleteDialogR({report_id}:Props) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  
  // const handleDelete = async () => {
  //   try {
  //     setIsDeleting(true)
  //     const result = await deleteReport(report_id)
  //     if (result.success) {
  //       setOpen(false)
  //       alert("記録が正常に削除されました")
  //     } else {
  //       console.error(result.message)
  //     }
  //   } catch (error) {
  //     console.error("削除中にエラーが発生しました:", error)
  //   } finally {
  //     setIsDeleting(false)
  //   }
  // }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="text-rose-600 hover:text-rose-600 focus:text-rose-600"
        >
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
      <DialogHeader>
          <DialogTitle>記録の削除</DialogTitle>
          <DialogDescription>
            この作業記録を削除してもよろしいですか？
            この操作は取り消すことができません。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isDeleting}
          >
            キャンセル
          </Button>
          <Button
            variant="destructive"
            //onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "削除中..." : "削除"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
