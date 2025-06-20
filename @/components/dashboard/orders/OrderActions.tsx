import Link from "next/link";
import { useMutation, useQueryClient } from "react-query";
import { ArrowUpRight, FileText, Pen, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { deleteOrder } from "@/hooks/use-order";
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
import { useState } from "react";

function OrderActions({ orderId }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="border rounded-md hover:bg-gray-100 py-1 px-4  font-rubikBold">
          ...
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>بيانات الطلب</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="w-full">
            <Link
              className="w-full px-2 hover:text-green-500 flex justify-between items-center"
              href={`/dashboard/orders/edit/${orderId}`}
            >
              <span className="text-xs">تعديل الطلب</span>
              <Pen className="w-3 h-3" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Alert orderId={orderId} />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              className="w-full px-2 flex justify-between items-center"
              href={`/dashboard/orders/${orderId}`}
            >
              <span className="text-xs">رؤية الطلب</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default OrderActions;

export function Alert({ orderId }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const deleteOrderMutation = useMutation((id: string) => deleteOrder(id), {
    onSuccess: () => {
      console.log("Order deleted");
      toast({
        variant: "default",
        title: "تم الحذف",
        description: "تم حذف الطلب بنجاح",
      });
      queryClient.invalidateQueries("orders");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <button
          onClick={() => setOpen(true)}
          className="w-full text-red-500 px-2 flex justify-between items-center"
        >
          <span className="text-xs">حذف الطلب</span>
          <Trash2 className="w-3 h-3" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>هل انت متأكد من حذف الطلب</AlertDialogTitle>
          <AlertDialogDescription>
            في حالة حذف الطلب لن يمكن استعادته
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            إلغاء
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.stopPropagation();
              deleteOrderMutation.mutate(orderId);
            }}
          >
            الإستمرار
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
