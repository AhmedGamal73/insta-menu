"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export type Table = {
  _id: string;
  tableNo: Number;
  chairsNo: Number;
  section: {
    _id: string;
    name: string;
  };
};

type DeleteTableProps = {
  tableNo: Number;
};

// Delete Table
const DeleteTable: React.FC<DeleteTableProps> = ({ tableNo }) => {
  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/table/${tableNo}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Error while deleting table");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Button className="font-thin" onClick={handleDelete} variant="ghost">
      مسح الطاولة
    </Button>
  );
};

// Route to table's page
const TableProfile: React.FC<{ tableNo: Number }> = ({ tableNo }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`http://localhost:3000/dashboard/tables/${tableNo}`);
  };

  return (
    <Button
      className="text-gray-500 font-thin"
      variant="ghost"
      onClick={handleClick}
    >
      عرض الطاولة
    </Button>
  );
};

export const columns: ColumnDef<Table>[] = [
  {
    accessorKey: "tableNo",
    header: () => <div className="text-right">رقم الطاولة</div>,
  },
  {
    accessorKey: "chairsNo",
    header: () => <div className="text-right">عدد المقاعد</div>,
  },
  {
    accessorKey: "section.name",
    header: () => <div className="text-right">القسم الخاص بالطاولة</div>,
  },
  {
    id: "actions",
    header: () => <div>المزيد</div>,
    cell: ({ row }) => {
      const table = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <Button
              className="text-gray-500 font-thin"
              variant="ghost"
              onClick={() =>
                navigator.clipboard.writeText(table.tableNo.toString())
              }
            >
              Copy user ID
            </Button>
            <DropdownMenuSeparator />
            <TableProfile tableNo={table.tableNo} />
            <DropdownMenuSeparator />
            <AlertDialog>
              <AlertDialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 font-thin text-red-500">
                مسح
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-start">
                    هل انت متأكد من الإستمرار
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-start">
                    لا يمكن التراجع عن هذا الإجراء. سيؤدي هذا إلى حذف حسابك
                    نهائيا وإزالة بياناتك من خوادمنا.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>إلغاء</AlertDialogCancel>
                  <AlertDialogAction>الإستمرار</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
