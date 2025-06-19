import { useRef } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Controller } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "./label";

interface Props {
  form: any;
  placeholder?: string;
  label?: string;
  name: string;
}

export function DatePicker({ form, label, name, placeholder }: Props) {
  const triggerRef = useRef<HTMLButtonElement>(null); // ref to toggle trigger

  return (
    <div>
      {label && <Label>{label}</Label>}
      <Controller
        control={form.control}
        name={name}
        render={({ field }) => {
          const date = field.value;

          return (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  ref={triggerRef}
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date ? (
                    format(new Date(date), "PPP")
                  ) : (
                    <span>{placeholder ?? "Pick a date"}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    field.onChange(selectedDate);
                    triggerRef.current?.click();
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          );
        }}
      />
    </div>
  );
}
