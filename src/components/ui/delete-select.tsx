import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

interface Props {
  placeholder?: string;
  label?: string;
  name: string;
  value?: string;
  keyName?: string;
  options: any[];
}

export function SelectForm({
  label,
  name,
  placeholder,
  options,
  value = "id",
  keyName = "name",
}: Props) {
  const { control } = useFormContext(); // ✅ requires FormProvider above in the tree

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options?.map((option, i) => (
                <SelectItem key={i} value={option?.[value]}>
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
}
