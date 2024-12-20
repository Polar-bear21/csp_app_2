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
import { Trash2, TriangleAlert } from "lucide-react";
import { useState } from "react";

interface Props {
  selectedReports: { id: number; status: string }[];
}

export function BatchDeleteDialogR({ selectedReports }: Props) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await fetch("/api/delete-report", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedReports.map((row) => row.id) }),
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
          className="flex items-center text-red-600 focus:text-red-600 focus:bg-red-50"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          削除
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>日報の削除</DialogTitle>
          <DialogDescription>
            選択された<strong>{selectedReports.length}</strong>
            件の日報記録を削除しますか？ この操作は元に戻せません。
          </DialogDescription>
        </DialogHeader>
        {selectedReports.filter((row) => row.status === "approved").length>0 &&
          <div className=" space-y-2 my-4 rounded-md bg-muted/50 text-sm p-3">
            <div className="flex items-center mb-2">
              <TriangleAlert className="mr-2 h-4 w-4 text-yellow-600 flex-shrink-0 " />
              警告
            </div>
            <strong>
              {
                selectedReports.filter((row) => row.status === "approved")
                  .length
              }
            </strong>
            件の承認済みアイテムがあります。削除すると承認済みアイテムも削除されます。
          </div>
        }
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
