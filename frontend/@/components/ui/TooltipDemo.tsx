import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <p>حالة الطلب</p>
        </TooltipTrigger>
        <TooltipContent>
          {/* <p>يتم تغغيره من قبل الكاشيير</p> */}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
