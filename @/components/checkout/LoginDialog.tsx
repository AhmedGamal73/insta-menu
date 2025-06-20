import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomerLogin from "../menu/CustomerLogin";

function LoginDialog({ openDialog, onClose }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (openDialog) {
      setOpen(true);
    }
  }, [open]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent dir="rtl">
        <DrawerHeader className="text-start">
          <DrawerTitle>إعادة تسجيل دخول</DrawerTitle>
          <DrawerDescription>
            لقد انتهت صلاحية الجلسة الخاصة بك، للمتابعة في الطلب الرجاء تسجيل
            الدخول
          </DrawerDescription>
        </DrawerHeader>
        <CustomerLogin wideButton={true} onClose={() => setOpen(false)} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button onClick={() => onClose(true)} variant="outline">
              إلغاء
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default LoginDialog;
