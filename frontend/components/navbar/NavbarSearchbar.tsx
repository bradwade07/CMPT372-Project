"use client";

import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";

// Displays a searchbar that the user can use to search up rpoducts by name
export function NavbarSearchbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // searches for an item when the user presses "enter"
  const handleKeyPress = (event: { key: string }) => {
    if (event.key === "Enter" && searchQuery != "") {
      router.push(`/search?query=${searchQuery}`);
    }
  };

  // updates the state that stores what the user typed
  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Input
      classNames={{
        base: "min-w-[10rem] max-w-[20rem] h-10",
        mainWrapper: "h-full",
        input: "text-small",
        inputWrapper:
          "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
      }}
      placeholder="Type to search..."
      size="sm"
      type="search"
      startContent={<SearchIcon className="mt-1" />}
      value={searchQuery}
      onChange={handleChange}
      onKeyDown={handleKeyPress}
    />
  );
}
