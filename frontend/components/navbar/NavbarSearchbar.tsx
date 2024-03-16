"use client";

import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";

export function NavbarSearchbar() {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState("");

	const handleKeyPress = (event: { key: string }) => {
		if (event.key === "Enter") {
			router.push(`/search/${searchQuery}`);
		}
	};

	const handleChange = (event: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setSearchQuery(event.target.value);
	};

	return (
		<Input
			classNames={{
				base: "max-w-full sm:max-w-[10rem] h-10",
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
