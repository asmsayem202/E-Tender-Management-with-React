import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagSuggestionProps {
  showSuggestion: boolean;
  loading?: boolean;
  data?: any;
  setShowSuggestion: (value: boolean) => void;
  obj_name?: keyof any;
  children: ReactNode;
  suggestionClick: (item: any, index: number) => void;
  field?: any;
}

const SelectSuggestion = <T,>({
  showSuggestion,
  data = [],
  setShowSuggestion,
  obj_name = "id" as keyof T,
  children,
  suggestionClick,
  field,
}: TagSuggestionProps) => {
  const suggestionRef = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState("");
  const filteredOptions = data.filter((option: any) =>
    String(option?.[obj_name] ?? "")
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    const handlerClose = (e: MouseEvent) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(e.target as Node)
      ) {
        setShowSuggestion(false);
      }
    };
    document.addEventListener("mousedown", handlerClose);
    return () => {
      document.removeEventListener("mousedown", handlerClose);
    };
  }, [setShowSuggestion]);

  return (
    <div className="flex-1" ref={suggestionRef}>
      <div className="flex gap-3">
        <div className="relative flex-1">
          {children}
          <div
            className={`w-full max-h-40 bg-background dark:bg-[#1c1c1c] absolute left-0 mt-2 rounded-md overflow-hidden shadow-lg overflow-y-scroll-auto custom_scroll z-20 border border-input ${
              showSuggestion ? "block" : "hidden"
            }`}
          >
            <div className="flex h-10 items-center gap-2 border-b px-3">
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
              filteredOptions.map((item: any, index: any) => (
                <p
                  key={index}
                  onClick={() => {
                    suggestionClick(item, index);
                    setShowSuggestion(false);
                  }}
                  className="px-4 py-2 hover:bg-secondary cursor-pointer flex"
                >
                  {item?.[obj_name] ? String(item[obj_name]) : "Unknown"}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      item?.id === field.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </p>
              ))
            ) : (
              <div className="flex justify-center items-center h-14">
                <p>No Data found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectSuggestion;
