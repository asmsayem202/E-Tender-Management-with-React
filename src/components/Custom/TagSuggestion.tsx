import { useEffect, useRef, type ReactNode } from "react";
import SuggestionShimmer from "./SuggestionShimmer";

interface TagSuggestionProps<T> {
  showSuggestion: boolean;
  loading?: boolean;
  data?: T[];
  setShowSuggestion: (value: boolean) => void;
  obj_name?: keyof T;
  children: ReactNode;
  suggestionClick: (item: T, index: number) => void;
  isExist?: (item: T) => boolean;
}

const TagSuggestion = <T,>({
  showSuggestion,
  loading,
  data = [],
  setShowSuggestion,
  obj_name = "id" as keyof T,
  children,
  suggestionClick,
  isExist,
}: TagSuggestionProps<T>) => {
  const suggestionRef = useRef<HTMLDivElement>(null);

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
            className={`w-full max-h-40 bg-background dark:bg-[#1c1c1c] absolute left-0 mt-2 rounded-md shadow-lg overflow-y-auto custom_scroll z-20 border border-input ${
              showSuggestion ? "block" : "hidden"
            }`}
          >
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <SuggestionShimmer />
              </div>
            ) : data.length > 0 ? (
              data.filter((item) => !isExist || !isExist(item)).length > 0 ? (
                data.map((item, index) =>
                  !isExist || !isExist(item) ? (
                    <p
                      key={index}
                      onClick={() => {
                        suggestionClick(item, index);
                        setShowSuggestion(false);
                      }}
                      className="px-4 py-2 hover:bg-secondary cursor-pointer"
                    >
                      {item?.[obj_name] ? String(item[obj_name]) : "Unknown"}
                    </p>
                  ) : null
                )
              ) : (
                <div className="flex justify-center items-center h-10 ">
                  <p>All has bee Selected.</p>
                </div>
              )
            ) : (
              <div className="flex justify-center items-center h-10">
                <p>No Data found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagSuggestion;
