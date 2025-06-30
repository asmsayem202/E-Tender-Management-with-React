import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

interface InputProps {
  form: any;
  placeholder?: string;
  label?: string;
  name: string;
}

const FormFileInput = ({ label, name, form, placeholder }: InputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder ?? `Enter ${label}`}
              type="file"
              multiple
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFileInput;
