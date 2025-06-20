import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useController } from "react-hook-form";

const CustomInputFormField = ({
  control,
  name,
  label,
  placeholder,
  errors,
}) => {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder={placeholder}
              {...field}
              ref={ref}
            />
          </FormControl>
          {errors && errors[name] && (
            <FormMessage>{errors[name].message}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};

export default CustomInputFormField;
