"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./components/report-table";


// データテーブルProps群
// データの型を定義
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};
// accessorKeyはPayment型のプロパティと一致する必要がある
export const columns: ColumnDef<Payment>[] = [
  { accessorKey: "status", header: "Status" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "amount", header: "Amount" },
];
// テーブルに表示するデータ
async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  const user: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ];
  for (let i = 1; i < 55; i++) {
    user.push({ ...user[0], amount: user[0].amount+i }); // idにインデックスを加える
  }
  return user;
    // ...
}



export default async function page() {
  const data = await getData();
  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
