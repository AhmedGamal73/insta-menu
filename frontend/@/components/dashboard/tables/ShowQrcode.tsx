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

function ShowQrcode({ qrcode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>الماسح الضوئي</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>الماسح الضوئي</DialogTitle>
          <DialogDescription>
            من خلال خذ الماسح الضوئي يمكنك الذهاب إلي قائمة الطعام وطلب ما تريد
            باسم الطالة الخاصة بك
          </DialogDescription>
        </DialogHeader>
        <div className="w-full flex justify-center items-center py-8">
          {!qrcode ? (
            <h5 className="align-middle">لا يوجد ماسح ضوئي</h5>
          ) : (
            <div className="w-full flex justify-center items-center">
              <img src={qrcode} alt="" />
            </div>
          )}
        </div>
        <DialogFooter className="flex justify-center items-center">
          <div className="w-full flex justify-center items-center">
            <Button type="submit">تحميل</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default ShowQrcode;
