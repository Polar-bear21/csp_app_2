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
import { Check } from "lucide-react";
import { useState } from "react";

interface Props {
  selectedReports: { id: number; status: string }[];
}

export function BatchApprovalDialogR({ selectedReports }: Props) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
    setIsDeleting(true);
      const res = await fetch("/api/update-report-status", {
        method: "PATCH", // ステータス変更には PATCH を推奨
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: selectedReports.map((row) => row.id), // 対象の日報IDを送信
          status: 'approved', // 新しいステータスを指定
        }),
      });

      if (!res.ok) {
        throw new Error("ステータス変更に失敗しました");
      }
      const result = await res.json();
      alert(`ステータス変更結果: ${result.message}`);
    } catch (error) {
      console.error("ステータス変更中にエラーが発生しました:", error);
    } finally {
        setIsDeleting(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          className="flex items-center"
          onSelect={(e) => e.preventDefault()}
        >
          <Check className="mr-2 h-4 w-4" />
          承認
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>日報の承認</DialogTitle>
          <DialogDescription>
            選択された<strong>{selectedReports.length}</strong>
            件の日報記録を承認しますか？
          </DialogDescription>
        </DialogHeader>
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
            {isDeleting ? "更新中..." : "承認"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
