import { useEffect, useState } from "react";
import { XCircle } from "lucide-react";
import TagSuggestion from "./TagSuggestion";

interface Option {
  id: number;
  name: string;
}

interface Props {
  options: any;
  onValuesChange?: any;
  placeholder?: string;
  label: string;
  error?: string;
  defaultValue?: any;
}

const MultiSelectDropdown = ({
  label,
  error,
  options,
  placeholder,
  defaultValue,
  onValuesChange,
}: Props) => {
  const [search, setSearch] = useState("");
  const [tagList, setTagList] = useState<Option[]>([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [dropDownList, setDropDownList] = useState<Option[]>([]);

  useEffect(() => {
    setDropDownList(options);
  }, [options]);

  useEffect(() => {
    if (defaultValue) {
      const modify = defaultValue.map((item: any) => ({
        id: item.roleId,
        name: item.roleName,
      }));
      setTagList(modify);
    }
  }, [defaultValue]);

  const handleDeleteTag = (index: number) => {
    setTagList((prev) => {
      const updatedList = prev.filter((_, i) => i !== index);
      onValuesChange?.(updatedList.map((item) => item.id));
      return updatedList;
    });
  };

  const handleSearch = (query: string) => {
    setSearch(query);
    if (query.trim()) {
      setDropDownList(
        options.filter((item: any) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setDropDownList(options);
    }
  };

  const handleSelectTag = (data: Option) => {
    if (!tagList.some((tag) => tag.id === data.id)) {
      setTagList((prev) => {
        const updatedList = [...prev, data];
        onValuesChange?.(updatedList.map((value) => value.id));
        return updatedList;
      });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={label}
          className={`font-semibold text-sm ${
            error ? "text-destructive" : "text-foreground"
          }`}
        >
          {label}
        </label>
      )}

      <div className="w-full">
        <TagSuggestion
          obj_name="name"
          data={dropDownList}
          showSuggestion={showSuggestion}
          isExist={(tag) => tagList.some((item) => item.id === tag.id)}
          setShowSuggestion={setShowSuggestion}
          suggestionClick={handleSelectTag}
        >
          <div
            className={`w-full outline-none px-2 py-2 min-h-9 border border-input rounded-md flex-1  text-foreground bg-transparent dark:bg-[#1c1c1c] ${
              error && "border-destructive"
            }`}
            onClick={() => setShowSuggestion(!showSuggestion)}
          >
            <div className="flex gap-2 flex-wrap w-full min-h-5">
              {tagList.map((data, i) => (
                <p
                  key={data.id}
                  className="border border-muted bg-muted px-1.5 py-1 flex items-center justify-center gap-1 rounded-[4px] font-semibold text-foreground"
                >
                  {data.name}
                  <span className="text-red-600 dark:text-red-500 cursor-pointer">
                    <XCircle size="13" onClick={() => handleDeleteTag(i)} />
                  </span>
                </p>
              ))}
              {dropDownList?.length !== tagList?.length && (
                <input
                  type="text"
                  value={search}
                  placeholder={placeholder}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="text-sm font-normal outline-none bg-transparent px-2 placeholder:text-muted-foreground text-foreground"
                />
              )}
            </div>
          </div>
        </TagSuggestion>
      </div>

      {error && (
        <p className="text-destructive text-sm font-semibold">{error}</p>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
