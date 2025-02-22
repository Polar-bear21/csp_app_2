import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import { Report } from "../columns/report-columns";
import { getProjects } from "../../action/master-data";

interface Props {
  report: Report;
}

export function DeleteDialogR({ report }: Props) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleOpenDialog = async () => {
    setOpen(true);
    try {
      const projectData = await getProjects();
      console.log("取得したプロジェクトデータ:", projectData);
    } catch (error) {
      console.error("プロジェクトデータの取得に失敗しました:", error);
    }
  };


  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await fetch("/api/delete-report", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: [report.id] }),
      });

      if (!res.ok) {
        throw new Error("削除に失敗しました");
      }
      const result = await res.json();
      alert(`削除結果: ${result.message}`);
    } catch (error) {
      console.error("削除中にエラーが発生しました:", error);
    } finally {
      setIsDeleting(false);
      setOpen(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="text-rose-600 hover:text-rose-600 focus:text-rose-600"
          onClick={handleOpenDialog}
        >
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>日報の削除</DialogTitle>
          <DialogDescription>
            以下の日報記録を削除しますか？
            この操作は元に戻せません。
          </DialogDescription>
        </DialogHeader>
        <div className=" space-y-2 my-4 rounded-md bg-muted text-sm p-3">
          <p>ID: {report.id}</p>
          <p>日付: {report.date}</p>
          <p>作業者: {report.worker_name}</p>
          <p>工番: {report.project_name}</p>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isDeleting}
            className="w-full sm:w-24"
          >
            キャンセル
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="w-full sm:w-24"
          >
            {isDeleting ? "削除中..." : "削除"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
