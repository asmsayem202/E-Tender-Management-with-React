import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";

interface InputProps {
  form: any;
  placeholder?: string;
  label?: string;
  name: string;
  value?: string;
  keyName?: string;
  options: any[];
}

const SearchDropdown = ({
  label,
  name,
  form,
  placeholder,
  options,
  value = "id",
  keyName = "name",
}: InputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? options.find(
                        (option) => `${option?.[value]}` === `${field.value}`
                      )?.[keyName]
                    : placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[332px]">
              <Command>
                <CommandInput placeholder="Search ..." />
                <CommandList>
                  <CommandEmpty>No result found.</CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => (
                      <CommandItem
                        value={`${option?.[keyName]}`}
                        key={`${option?.[value]}`}
                        onSelect={() => {
                          form.setValue(name, `${option?.[value]}`);
                        }}
                      >
                        {option?.[keyName]}
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            `${option?.[value]}` === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default SearchDropdown;
