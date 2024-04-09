"use client";

import { ColumnDef } from "@tanstack/react-table";

type Table = {
  tableNo: string;
  tableStatus: string;
  chairs: number;
  qrCode: string;
};

export const columns: ColumnDef<Table>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <span className="text-xs">عدد المقاعد</span>;
    },
  },
];
