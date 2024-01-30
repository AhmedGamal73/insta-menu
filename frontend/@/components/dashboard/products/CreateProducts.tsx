"use client";

import Link from "next/link";
import { ArchiveRestore, ChevronDown, FileBarChart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const CreateProducts = () => {
  return (
    <div className="flex justify-start items-center">
      <Link href="/dashboard/products/create">
        <Button
          variant="destructive"
          className="rounded-l-none p-1 h-8 bg-red-800 px-4"
        >
          إضافة منتج جديد
        </Button>
      </Link>
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger className="rounded-l-sm flex items-center justify-center w-8 h-8 bg-destructive rounded-l-4 text-white">
          <ChevronDown className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <ArchiveRestore className="me-2 h-4 w-4" />
            <span>
              <Link href="/dashboard/products/create">منتج منفرد</Link>
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <FileBarChart className="me-2 h-4 w-4" />
            <span>ملف متعدد المنتجات</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CreateProducts;
