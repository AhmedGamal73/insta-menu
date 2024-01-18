import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();
  const [back, setBack] = useState(false);
  if (back) {
    router.back();
  }
  return (
    <Button
      variant="default"
      className="self-end w-10 h-10 bg bg-white/50 backdrop-blur rounded-lg"
      size="icon"
      onClick={() => setBack(!back)}
    >
      <ArrowLeft className="text-[#eeee] h-6 w-6" />
    </Button>
  );
};

export default BackButton;
