"use client";

import { useState } from "react";
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
import { Button } from "@/components/ui/button";

export default function AddReportDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [reportData, setReportData] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });

  //   const handleSubmit = async () => {
  //     try {
  //       const res = await fetch('/api/addreport', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify(reportData),
  //       });
  //       if (!res.ok) throw new Error('Failed to add report');
  //       alert('Report added successfully!');
  //       setIsOpen(false); // Close dialog on success
  //     } catch (error) {
  //       console.error('Error adding report:', error);
  //     }
  //   };  handleSubmit();

  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <></>
      </DialogContent>
    </Dialog>

    // <>
    //   <button onClick={() => setIsOpen(true)}>Add Report</button>
    //   {isOpen && (
    //     <dialog open>
    //       <form onSubmit={(e) => { e.preventDefault();  }}>
    //         {/* Input fields */}
    //         <input
    //           type="text"
    //           placeholder="Date"
    //           value={reportData.date}
    //           onChange={(e) => setReportData({ ...reportData, date: e.target.value })}
    //         />
    //         <input
    //           type="text"
    //           placeholder="Start Time"
    //           value={reportData.startTime}
    //           onChange={(e) => setReportData({ ...reportData, startTime: e.target.value })}
    //         />
    //         <input
    //           type="text"
    //           placeholder="End Time"
    //           value={reportData.endTime}
    //           onChange={(e) => setReportData({ ...reportData, endTime: e.target.value })}
    //         />
    //         <button type="submit">Submit</button>
    //       </form>
    //     </dialog>
    //   )}
    // </>
  );
}
