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
import UserForm from "./UserForm";

function CreateUser() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>إضافة مستخدم جديد</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>إضافة مستخدم</DialogTitle>
          <DialogDescription> قم بإضافة مستخدم جديد للمطعم</DialogDescription>
        </DialogHeader>
        <UserForm />
      </DialogContent>
    </Dialog>
  );
}

export default CreateUser;
