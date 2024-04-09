"use client";

import { ColumnDef } from "@tanstack/react-table";

type Table = {
  tableNo: string;
  tableStatus: string;
  chairs: number;
  qrCode: string;
};

export const sectionColumns: ColumnDef<Table>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <span className="text-xs">اسم السكشن</span>;
    },
    cell: ({ row }) => {
      return <span className="text-xs text-text">{row.getValue("name")}</span>;
    },
  },
];
