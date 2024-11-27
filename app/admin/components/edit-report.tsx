import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Report } from "./columns/report-columns";
import { Input } from "@/components/ui/input";

export function EditDialogW({report}: { report: Report }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Test
        </DropdownMenuItem>
      </DialogTrigger>
      
      <DialogContent>
        This is a modal.
        <div>{report.id}</div>
      </DialogContent>
    </Dialog>
  );
}
