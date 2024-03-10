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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CustomerSignup from "./CustomerSignup";
import CustomerLogin from "./CustomerLogin";

export function CustomerInfoModal({ onFormSubmit }) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState<string>("login");

  React.useEffect(() => {
    console.log(activeTab);
  }, [activeTab]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>الدفع</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>👋 اهلاً بكم في مطعمنا</DialogTitle>
          <DialogDescription>
            إذا لم يكن لديك حساب لدينا يمكن إختيار "حساب جديد" في الأسفل لإنشاء
            حساب جديد لدينا.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue={activeTab} className="">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup">حساب جديد</TabsTrigger>
            <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <CustomerSignup onSubmitHandler={setActiveTab} />
          </TabsContent>
          <TabsContent value="login">
            <CustomerLogin onSubmitHandler={setOpen} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
