"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product, deleteProduct } from "@/hooks/use-product";
import { Pencil, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "@/components/ui/use-toast";
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
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "منتج",
    cell: ({ row }) => (
      <div className="flex gap-2 justify-start items-center">
        <img
          src="https://picsum.photos/200"
          alt={row.getValue("name")}
          className="h-10 w-10 rounded-sm"
        />
        <span>{row.getValue("name")}</span>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "الوصف",
    cell: ({ row }) => {
      const desc = row.getValue("description") as string;
      const limit = 35;
      return <p>{desc.length > limit ? desc.slice(0, limit) + "..." : desc}</p>;
    },
  },
  {
    accessorKey: "category.name",
    header: "التصنيف",
  },
  {
    accessorKey: "price",
    header: "السعر",
    cell: ({ row }) => {
      const salePrice = row.original.salePrice;
      return !salePrice ? (
        <div className="flex gap-1">
          <span>{row.getValue("price")}</span>
          <span>ج.م</span>
        </div>
      ) : (
        <div className="flex flex-col">
          <span className="line-through text-gray-500">
            {row.getValue("price")}
          </span>
          <span className="">{salePrice}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      const queryClient = useQueryClient();
      const mutation = useMutation(deleteProduct, {
        onSuccess: () => {
          queryClient.invalidateQueries("products");
          toast({
            variant: "default",
            className: "bg-green-500 text-white",
            title: "تم حذف المنتج بنجاح",
            description: `لقد قمت بحذق المنتج: ${row.original.name}`,
          });
        },
      });

      const handleDelte = async () => {
        await mutation.mutateAsync(row.original._id);
      };

      return (
        <>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button>
                <Trash2 className="h-4 w-4 text-red-500" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="align-right">
              <AlertDialogHeader>
                <AlertDialogTitle dir="rtl" className="text-right">
                  هل انت متأكد من حذق هذا المنتج
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelte}>
                  إستمرار
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {mutation.isLoading && <p>يتم التحميل...</p>}
        </>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      return (
        <button className="text-gray-500 font-thin">
          <Pencil className="h-4 w-4 text-green-500" />
        </button>
      );
    },
  },
];
