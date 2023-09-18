import { Cross2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import IconButton from "../IconButton";

export default function SearchInput() {
  // !! now search input not working, for now just focus on the UI. In the future, we may use the search input to filter the list of channels.
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleClear = () => {
    setValue("");
  };

  return (
    <div className="relative flex-1 text-gray-12 dark:text-graydark-12">
      <input
        className="h-10 w-full rounded-lg bg-graya-3 px-11 placeholder-gray-11 dark:bg-graydarka-3 dark:placeholder-graydark-11"
        type="text"
        placeholder="Search"
        autoComplete="off"
        value={value}
        onChange={handleChange}
      />
      <div className="pointer-events-none absolute left-0 top-0 flex h-full w-10 items-center justify-center text-gray-12 transition-colors dark:text-graydark-12">
        <MagnifyingGlassIcon width={20} height={20} />
      </div>
      <IconButton
        className={`${
          value && "opacity-100"
        } absolute right-0 top-0 bg-transparent opacity-0 transition-opacity dark:bg-transparent`}
        icon={<Cross2Icon width={20} height={20} />}
        onClick={handleClear}
      />
    </div>
  );
}
