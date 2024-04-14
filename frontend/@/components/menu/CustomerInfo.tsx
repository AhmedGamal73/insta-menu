import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CustomerSignupDialog from "./CustomerSignup";
import CustomerLoginDialog from "./CustomerLogin";

export function CustomerInfoModal({ isSignedIn }) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState<string>("login");

  React.useEffect(() => {
    setActiveTab(isSignedIn ? "login" : "signup");
  }, [activeTab]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>تقدم للطلب</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>👋 اهلاً بكم في مطعمنا</DialogTitle>
          <DialogDescription>
            إذا لم يكن لديك حساب لدينا يمكن إختيار "حساب جديد" في الأسفل لإنشاء
            حساب جديد لدينا.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue={activeTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup">حساب جديد</TabsTrigger>
            <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <CustomerSignupDialog onSubmitHandler={() => setActiveTab("")} />
          </TabsContent>
          <TabsContent value="login">
            <CustomerLoginDialog wideButton={false} onSubmitHandler={setOpen} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
