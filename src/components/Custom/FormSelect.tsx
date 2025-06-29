import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InputProps {
  form: any;
  placeholder?: string;
  label?: string;
  name: string;
  value?: string;
  keyName?: string;
  options: any[];
  handleChange?: any;
}
const FormSelect = ({
  label,
  name,
  form,
  placeholder,
  options,
  value = "id",
  keyName = "name",
  handleChange,
}: InputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            value={field.value}
            onValueChange={(data) => {
              field.onChange(data);
              handleChange && handleChange(data);
            }}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.id} value={`${option?.[value]}`}>
                  {option?.[keyName]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSelect;
