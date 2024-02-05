import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomerInfoForm from "./CustomerInfoForm";

export function CustomerInfoModal({ onFormSubmit }) {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpenChange = (value) => {
    setOpen(value);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>تأكيدالطلب</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>عميل جديد</DialogTitle>
          <DialogDescription>
            قم بإجراء تغييرات على ملفك الشخصي هنا. انقر فوق حفظ عند الانتهاء.
          </DialogDescription>
        </DialogHeader>
        <CustomerInfoForm onOpenChange={handleOpenChange} />
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
