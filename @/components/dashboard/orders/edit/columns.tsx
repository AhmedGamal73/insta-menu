"use client";

import LoadingScreen from "@/components/ui/loadingScreen";
import variables from "@/config/variables";
import { useAddon } from "@/hooks/use-addon";
import { ColumnDef } from "@tanstack/react-table";
import { Minus, Pen, Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";

type Table = {
  tableNo: string;
  tableStatus: string;
  chairs: number;
  qrCode: string;
};

type IAddon = {
  name: string;
  price: number;
};

export const columns: ColumnDef<any>[] = [
  {
    header: ({ column }) => {
      return <span className="text-xs align-middle">الاسم</span>;
    },
    accessorKey: "product.name",
    cell: ({ row }) => {
      return <span className="text-xs">{row.original.product.name}</span>;
    },
  },
  {
    header: ({ column }) => {
      return <span className="text-xs align-middle">السعر</span>;
    },
    accessorKey: "priceAtTheTime",
    cell: ({ row }) => {
      const price = row.original.product.price;
      const salePrice = row.original.product.salePrice;
      return salePrice ? (
        <div>
          <div>
            <span className="text-xs text-text line-through">
              {price + " "}
            </span>
            <span className="text-text text-[12px]">
              {variables.curancy.egp}
            </span>
          </div>

          <div>
            <span className="text-xs">{salePrice + " "}</span>
            <span className=" text-[12px]">{variables.curancy.egp}</span>
          </div>
        </div>
      ) : (
        <div>
          <span className="text-xs line-through">{price + " "}</span>
          <span className="text-text text-[12px]">{variables.curancy.egp}</span>
        </div>
      );
    },
  },
  {
    header: ({ column }) => {
      return (
        <div className="flex justify-center items-center">
          <span className="text-xs align-middle">الكمية</span>
        </div>
      );
    },
    accessorKey: "quantity",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 justify-center items-center">
          <span className="text-xs">
            <Minus className="w-5 h-5 px-1 rounded-full bg-secondary text-white" />
          </span>
          <span className="text-xs px-2">{row.getValue("quantity")}</span>
          <span className="text-text text-[12px]">
            <Plus className="w-5 h-5 px-1 rounded-full bg-secondary text-white" />
          </span>
        </div>
      );
    },
  },
  {
    header: ({ column }) => {
      return (
        <div className="flex justify-center items-center">
          <span className="text-xs align-middle">الإضافات</span>
        </div>
      );
    },
    accessorKey: "addons",
    cell: ({ row }) => {
      const addons = row.original.addons;
      addons.map((addon: string) => {
        const { data: addonData, isLoading } = useAddon(addon);
        if (!addonData || isLoading) {
          return null;
        }
        return isLoading ? (
          <LoadingScreen />
        ) : (
          <div className="flex gap-2 justify-center items-center">
            <span>{addonData.name}</span>
            <span>{addonData.price}</span>;
          </div>
        );
      });
    },
  },

  {
    header: ({ column }) => {
      return (
        <div className="flex justify-center items-center">
          <span className="text-xs align-middle">الإختيار</span>
        </div>
      );
    },
    accessorKey: "variations",
    cell: ({ row }) => {
      const variant = row.original.variations;
      return (
        <div className="flex gap-2 justify-center items-center">
          {variant ? <span>{variant.name}</span> : <span>---</span>}
        </div>
      );
    },
  },
  {
    header: "",
    accessorKey: "addons",
    cell: ({ row }) => {
      return (
        <div className="flex gap-6 justify-center items-center">
          <button className="">
            <Pen className="w-5 h-5 px-1 rounded-full bg-green-500 text-white" />
          </button>
          <button className="">
            <Trash2 className="w-5 h-5 px-1 rounded-full bg-red-500 text-white" />
          </button>
        </div>
      );
    },
  },
];
function usseEffect(arg0: () => void, arg1: undefined[]) {
  throw new Error("Function not implemented.");
}
