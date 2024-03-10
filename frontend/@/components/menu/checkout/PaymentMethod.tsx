import { Banknote, CreditCard } from "lucide-react";
import { useState } from "react";

const PaymentMethod = ({ onPaymentChange }) => {
  const [selectedMethod, setSelectedMethod] = useState("cash");

  onPaymentChange(selectedMethod);
  return (
    <div dir="rtl" className="flex gap-4 card-cont">
      <div
        className={
          selectedMethod == "cash"
            ? "w-1/2 text-lg font-rubikBold text-secondary flex justify-center items-center gap-2 px-2 py border-2 border-secondary rounded"
            : "w-1/2 text-gray-500 flex justify-center items-center gap-2 px-2 border-gray-400 border rounded py-1"
        }
        onClick={() => setSelectedMethod("cash")}
      >
        <Banknote w-4 h-4 />
        <span className="text-rubikBold text-[16px]">نقدي</span>
      </div>
      <button
        className={
          selectedMethod == "credit"
            ? "w-1/2 text-lg font-rubikBold text-secondary flex justify-center items-center gap-2 px-2 py border-2 border-secondary rounded"
            : "w-1/2 text-gray-500 flex justify-center items-center gap-2 px-2 border-gray-400 border rounded py-1"
        }
        onClick={() => setSelectedMethod("credit")}
      >
        <CreditCard w-4 h-4 />
        <span className="text-xs">كريدت كارد</span>
      </button>
    </div>
  );
};

export default PaymentMethod;
