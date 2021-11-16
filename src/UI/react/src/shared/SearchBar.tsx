import { Input } from "antd";
import React from "react";
import { SearchIcon } from "../icons/icons";
import { debounce } from "./debounce";
import { useStringEventHanlder as useStringEventHandler } from "./useEventListener";

export const SearchBar: React.FC<{
  onSearch: (item: string) => void;
}> = ({ onSearch }) => {
  const handleSearch = useStringEventHandler(debounce(onSearch));
  return (
    <Input
      placeholder="Search.."
      addonBefore={<SearchIcon />}
      onChange={handleSearch}
    />
  );
};
