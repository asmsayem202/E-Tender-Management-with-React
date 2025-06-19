import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./label";
import { Error } from "./error";
import { Controller } from "react-hook-form";

interface Props {
  form: any;
  placeholder?: string;
  label?: string;
  name: string;
  value?: string;
  keyName?: string;
  options: any[];
}

const CustomSelect = ({
  form,
  label,
  name,
  placeholder,
  options,
  value = "id",
  keyName = "name",
}: Props) => {
  return (
    <div>
      {label && <Label>{label}</Label>}

      <Controller
        control={form.control}
        name={name}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}

            // onValueChange={field.onChange}
            // defaultValue={field.value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option, i) => (
                <SelectItem key={i} value={`${option?.[value]}`}>
                  {option?.[keyName]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {form?.formState?.errors?.[name] && (
        <Error>{form.formState.errors[name]?.message}</Error>
      )}
    </div>
  );
};

export default CustomSelect;
