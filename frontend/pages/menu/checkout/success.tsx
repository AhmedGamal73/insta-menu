import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

const success = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setOpenDrawer(true);
    }, 2000);
  }, []);
  return (
    <div className="w-full h-screen bg-success">
      <DrawerDemo open={openDrawer} />
    </div>
  );
};

export function DrawerDemo({ open }) {
  return (
    <Drawer open={open} onOpenChange={() => open === false}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>تم استلام الطلب بنجاح</DrawerTitle>
            <DrawerDescription>
              تم اسلام طلبك بنجاح، ونقوم الأن بتحضيره
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>رؤية الطلب</Button>
            <Button variant="outline" onClick={() => router.push("/")}>
              الرئيسية
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default success;
