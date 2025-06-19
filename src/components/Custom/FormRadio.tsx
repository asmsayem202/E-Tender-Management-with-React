import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  placeholder?: string;
  form: any;
  options: any[];
  handleChange: any;
}

const FormRadio = ({
  label,
  name,
  form,
  options = [],
  handleChange,
}: InputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={(data) => {
                field.onChange(data);
                if (handleChange) {
                  handleChange(data);
                }
              }}
              defaultValue={field.value}
              className="flex flex-wrap"
            >
              {options.map((option) => (
                <FormItem
                  key={option.value}
                  className="flex items-center gap-2"
                >
                  <FormControl>
                    <RadioGroupItem value={option.value} />
                  </FormControl>
                  <FormLabel className="font-normal mt-2">
                    {option.name}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormRadio;
