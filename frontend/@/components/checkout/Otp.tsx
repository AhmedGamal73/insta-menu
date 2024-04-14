import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useMutation } from "react-query";
import { generateOtp, verifyOtp } from "@/hooks/use-order";
import { useCart } from "@/context/CartContext";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "يجب أن تتكون كلمة المرور لمرة واحدة من 6 أحرف.",
  }),
});
export default function Otp({ openOtp, onClose, phoneNumber }) {
  const [open, setOpen] = useState(false);
  const [activationCodeSent, setActivationCodeSent] = useState(false);
  const [counter, setCounter] = useState(60);
  const { setCart, setSubtotal, setVat, setQuantity } = useCart();

  const router = useRouter();

  // Generate OTP mutation
  const generateOtpMutation = useMutation(generateOtp, {
    onSuccess: (data) => {
      window.open(data.data.otpLink, "_blank");
    },
    onError: (error: any) => {
      if (error?.response && error?.response.status === 400) {
        toast({
          variant: "destructive",
          description: "كود التفعيل غير صحيح",
          style: {
            justifyContent: "center",
          },
        });
      }
    },
  });

  // Verify OTP mutation
  const verifyOtpMutation = useMutation(verifyOtp, {
    onSuccess: (data) => {
      router.push("/menu/checkout/success");
      setCart([]);
      setSubtotal(0);
      setVat(0);
      setQuantity(0);

      onClose(false);
      toast({
        variant: "default",
        description: "تم إرسال كود التفعيل بنجاح",
        style: {
          justifyContent: "center",
          border: "0px",
          backgroundColor: "green",
          color: "white",
        },
      });
    },
    onError: (error: any) => {
      if (error?.response && error?.response.status === 400) {
        toast({
          variant: "destructive",
          description: "كود التفعيل غير صحيح",
          style: {
            justifyContent: "center",
          },
        });
      }
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    console.log("Clicked from inside the onSubmit function");

    const { data } = await verifyOtpMutation.mutateAsync({
      phoneNumber: phoneNumber,
      otp: formData.otp,
    });
  }

  // Generate OTP handler
  function generateOtpHandler() {
    setActivationCodeSent(true);
    generateOtpMutation.mutate();
  }

  useEffect(() => {
    if (openOtp) {
      setOpen(true);
    }
  }, [open]);

  useEffect(() => {
    if (activationCodeSent && counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer); // This will clear Timeout when component unmount like in willComponentUnmount
    } else if (!activationCodeSent) {
      setCounter(60); // Reset counter to 60 when activation code is not sent
    }
    if (counter === 0) {
      setActivationCodeSent(false);
    }
  }, [activationCodeSent, counter]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>كود التفعيل</DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الرقم السري من ستة ارقام </FormLabel>
                    <FormControl>
                      <InputOTP
                        className="flex justify-center w-full gap-2"
                        maxLength={6}
                        render={({ slots }) => (
                          <>
                            <InputOTPGroup>
                              {slots.slice(0, 3).map((slot, index) => (
                                <InputOTPSlot key={index} {...slot} />
                              ))}{" "}
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                              {slots.slice(3).map((slot, index) => (
                                <InputOTPSlot key={index + 3} {...slot} />
                              ))}
                            </InputOTPGroup>
                          </>
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      الرجاء إدخال كلمة المرور لمرة واحدة المرسلة إلى هاتفك، من
                      اليسار إلي اليمين
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="flex gap-2" dir="rtl">
                <Button type="submit">تأكيد</Button>
                <Button
                  onClick={generateOtpHandler}
                  variant="outline"
                  disabled={activationCodeSent}
                >
                  {activationCodeSent
                    ? `إعادة إرسال بعد ${counter} ثانية`
                    : "إرسال رمز تحقق"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogHeader>

        <DialogFooter className="flex gap-2" dir="rtl"></DialogFooter>
        <button
          onClick={() => {
            !activationCodeSent && onClose(false);
          }}
          className="absolute z-10 w-4 h-4 top-4 left-4 cursor-pointer"
        >
          <Cross1Icon className="w-4 h-4" />
        </button>
      </DialogContent>
    </Dialog>
  );
}
