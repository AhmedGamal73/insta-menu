"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

import { User } from "@/types/user";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <span className="text-xs">اسم الكابتن</span>;
    },
    cell: ({ row }) => {
      return <span className="text-xs text-text">{row.getValue("name")}</span>;
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return <span className="text-xs">اسم المستخدم</span>;
    },
    cell: ({ row }) => {
      return (
        <span className="text-xs text-text">{row.getValue("username")}</span>
      );
    },
  },
  {
    accessorKey: "age",
    header: ({ column }) => {
      return <span className="text-xs">العمر</span>;
    },
    cell: ({ row }) => {
      return <span className="text-xs text-text">{row.getValue("age")}</span>;
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return <span className="text-xs">العنوان</span>;
    },
    cell: ({ row }) => {
      return (
        <span className="text-xs text-text">{row.getValue("address")}</span>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return <span className="text-xs">رقم الهاتف</span>;
    },
    cell: ({ row }) => {
      return <span className="text-xs text-text">{row.getValue("phone")}</span>;
    },
  },
  // {
  //   accessorKey: "section",
  //   header: ({ column }) => {
  //     return <span className="text-xs">الجزء المسئول عنه</span>;
  //   },
  //   cell: ({ row }) => {
  //     return (
  //       <span className="text-xs text-text">{row.original.sectionId.name}</span>
  //     );
  //   },
  // },
  {
    accessorKey: "tablesNo",
    header: ({ column }) => {
      return <span className="text-xs">عدد الطاولات المسئول عنها</span>;
    },
    cell: ({ row }) => {
      return (
        <span className="text-xs text-text">{row.original.tables.length}</span>
      );
    },
  },
  {
    accessorKey: "shiftType",
    header: ({ column }) => {
      return <span className="text-xs">الشيفت</span>;
    },

    cell: ({ row }) => {
      const shiftName = row.getValue("shiftType");
      const [shift, setShift] = useState(
        shiftName === "Evening"
          ? "مسائي"
          : shiftName === "Morning"
          ? "صباحي"
          : shiftName === "All"
          ? "صباحي ومسائي"
          : "غير محدد"
      );

      return <span className="text-xs text-text">{shift}</span>;
    },
  },
];
