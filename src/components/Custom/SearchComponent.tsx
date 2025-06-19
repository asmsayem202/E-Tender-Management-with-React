import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface SearchComponentProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  isLoading: boolean;
  className?: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  onSearch,
  placeholder,
  className,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-[200px]">
      <Input
        type="search"
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder || "Search..."}
        className={`${className || ""}`}
      />
    </div>
  );
};

export default SearchComponent;
