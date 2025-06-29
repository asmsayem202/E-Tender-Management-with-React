import { useState } from "react";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import SelectSuggestion from "./SelectSuggestion";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface InputProps {
  form: any;
  placeholder?: string;
  label?: string;
  name: string;
  options: any;
  keyName?: string;
  defaultValue?: any;
}

const FormSearchSelect = ({
  label,
  name,
  form,
  placeholder = "Select an option",
  options,
  keyName = "name",
}: InputProps) => {
  const [showSuggestion, setShowSuggestion] = useState(false);
  const selectedOption = options.find(
    (option: any) => `${option.id}` === `${form.getValues(name)}`
  );

  const displayValue = selectedOption
    ? (selectedOption as any)[keyName]
    : placeholder;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="w-full">
            <SelectSuggestion
              obj_name={keyName as any}
              data={options}
              field={field}
              showSuggestion={showSuggestion}
              setShowSuggestion={setShowSuggestion}
              suggestionClick={(value: any) => {
                field.onChange(`${value?.id}`);
              }}
            >
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-full justify-between py-2 min-h-10",
                  !field.value && "text-muted-foreground"
                )}
                onClick={() => setShowSuggestion(!showSuggestion)}
              >
                {displayValue}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </SelectSuggestion>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSearchSelect;

{
  /* <div
    className={`w-full outline-none px-2 py-2 min-h-9 border border-input rounded-md flex-1  text-foreground bg-transparent dark:bg-[#1c1c1c] ${
      form && "border-destructive"
    } ${!field.value && "text-muted-foreground"}`}
    onClick={() => setShowSuggestion(!showSuggestion)}
  >
    {field.value ? field.value : placeholder}
    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
  </div> */
}

{
  /* <Select value={field.value} onValueChange={field.onChange}>
      <FormControl>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <div className="flex h-9 items-center gap-2 border-b px-3">
          <SearchIcon className="size-4 shrink-0 opacity-50" />
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm placeholder:text-muted-foreground disabled:opacity-50 focus:outline-none border-none"
          />
        </div>

        {filteredOptions.length > 0 ? (
          filteredOptions.map((option) => (
            <SelectItem key={option.id} value={`${option?.[value]}`}>
              {option?.[keyName]}
            </SelectItem>
          ))
        ) : (
          <div className="p-2 text-center text-sm text-muted-foreground">
            No results found.
          </div>
        )}
      </SelectContent>
    </Select> */
}
