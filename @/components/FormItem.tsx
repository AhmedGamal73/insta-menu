import { FormControl, FormItem, FormLabel } from "./ui/form";
import { RadioGroupItem } from "./ui/radio-group";

export default function FormItemComponent({
  value,
  children,
  orderType,
  setOrderType,
}) {
  return (
    <FormItem className="pb-0">
      <FormControl>
        <RadioGroupItem value={value} />
      </FormControl>
      <FormLabel
        onClick={() => setOrderType(value)}
        className={
          orderType === value
            ? "font-normal text-white bg-secondary py-2 px-4 rounded-lg"
            : "p-2 py-2 px-4"
        }
      >
        {children}
      </FormLabel>
    </FormItem>
  );
}
