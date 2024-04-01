"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Banknote } from "lucide-react";

import { useAddressById } from "@/hooks/use-location";
import { Button } from "@/components/ui/button";
import { useGetCustomerById } from "@/hooks/use-customer";
import { useRouter } from "next/router";
import Link from "next/link";

type Order = {
  orderNo: string;
  customerId: string;
  address: string;
  orderStatus: string;
  orderName: string;
  total: number;
  paymentMethod: string;
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "orderNo",
    header: ({ column }) => {
      return <span className="text-xs">رقم الطلب</span>;
    },
    cell: ({ row }) => {
      return (
        <span className="text-xs text-text">{row.getValue("orderNo")}</span>
      );
    },
  },
  {
    accessorKey: "customerId",
    header: ({ column }) => {
      return <span className="text-xs">معلومات العميل</span>;
    },
    cell: ({ row }) => {
      const customerId = row.getValue("customerId") as string;
      const { data: customer, isLoading } = useGetCustomerById(customerId);
      if (isLoading) return "...";
      if (customer) {
        return (
          <div className="flex flex-col">
            <span className="text-xs">{customer.name}</span>
            <span className="text-[12px] text-text">{customer.phone}</span>
          </div>
        );
      }
    },
  },
  {
    accessorKey: "addressId",
    header: "العنوان",
    cell: ({ row }) => {
      const address = row.original.address;
      if (!!address) return <span>...</span>;
      const addressId = row.getValue("addressId") as string;
      const { data: customerAddress, isLoading } = useAddressById(addressId);
      if (isLoading) return "...";
      if (customerAddress) {
        return (
          <div className="flex flex-col">
            <span className="text-xs">{customerAddress.cityId.name}</span>
            <span className="text-xs text-text">
              {customerAddress.districtId.name}
            </span>
            <span className="text-xs text-text">{customerAddress.street}</span>
          </div>
        );
      }
      return "---";
    },
  },
  {
    accessorKey: "orderStatus",
    cell: ({ row }) => {
      let orderStatus;
      const status = row.getValue("orderStatus") as string;
      status == "Pending"
        ? (orderStatus = "بإنتظار الموافقة")
        : status == "Delivered"
        ? (orderStatus = "تم التوصيل")
        : status == "Processing"
        ? (orderStatus = "يتم العمل")
        : (orderStatus = "تم الإلغاء");
      return (
        <span className="px-2 py-1 bg-gray-200 text-center rounded-full text-[12px]">
          {orderStatus}
        </span>
      );
    },
    header: ({ column }) => {
      return (
        <Button
          className="text-start text-xs px-2 flex gap-2"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p>حالة الطلب</p>
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return <span className="text-xs">السعر</span>;
    },
    cell: ({ row }) => {
      const total = row.getValue("total") as number;
      let paymentMethodString;
      const paymentMethod = row.original.paymentMethod;
      paymentMethod == "Card"
        ? (paymentMethodString = "بطاقة ائتمانية")
        : (paymentMethodString = "نقداً عند الاستلام");
      return (
        <div className="flex items-center gap-2">
          <Banknote className="w-7 h-7 text-green-500 bg-white px-1 rounded-sm border" />
          <div className="flex flex-col">
            <span className="text-xs">{total} ر.س</span>
            <span className="text-xs text-text">{paymentMethodString}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "تاريخ الطلب",
    cell: ({ row }) => {
      const orderDate = row.getValue("createdAt") as string;
      const date = new Date(orderDate);
      const dateString = date.toLocaleDateString("ar-EG", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });

      const timeString = date.toLocaleTimeString("ar-EG", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      return (
        <div className="flex flex-col">
          <span className="text-xs">{dateString}</span>
          <span className="text-text text-xs">{timeString}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => {
      const router = useRouter();
      return (
        <Button
          variant="ghost"
          className="text-lg py-2 pt-0 font-rubikBold z-50"
        >
          <Link href={`/dashboard/orders/${row.original._id}`}>...</Link>
        </Button>
      );
    },
  },
];
