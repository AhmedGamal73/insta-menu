"use client";

import { ColumnDef } from "@tanstack/react-table";
import ShowQrcode from "./ShowQrcode";
import { ScanLine } from "lucide-react";

type Table = {
  tableNo: string;
  tableStatus: string;
  chairs: number;
  qrCode: string;
};

export const columns: ColumnDef<Table>[] = [
  {
    accessorKey: "tableNo",
    header: ({ column }) => {
      return <span className="text-xs">رقم الطاولة</span>;
    },
    cell: ({ row }) => {
      return (
        <span className="text-xs text-text">{row.getValue("tableNo")}</span>
      );
    },
  },
  {
    accessorKey: "chairsNo",
    header: ({ column }) => {
      return <span className="text-xs">عدد المقاعد</span>;
    },
  },
  {
    accessorKey: "sectionId.name",
    header: ({ column }) => {
      return <span className="text-xs">قسم الطاولة</span>;
    },
  },
  {
    accessorKey: "waiterId.name",
    header: ({ column }) => {
      return <span className="text-xs">الكابتن المسئول</span>;
    },
    cell: ({ row }) => {
      const waiterName = row.getValue("waiterId.name");
      return waiterName ? (
        <span className="text-xs text-text">
          {row.getValue("waiterId.name")}
        </span>
      ) : (
        <span className="text-xs">لا يوجد</span>
      );
    },
  },
  {
    header: ({ column }) => {
      return <ScanLine />;
    },
    accessorKey: "qrCode",
    cell: ({ row }) => {
      const qrcode = row.getValue("qrCode");
      return <ShowQrcode qrcode={qrcode} />;
    },
  },
];
