import React from "react";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Link,
	Button,
	Input,
} from "@nextui-org/react";
import Image from "next/image";
import { Categories } from "@/app/categories";
import { getSession } from "@/app/auth";
import SigninButton from "../SigninButton/SigninButton";

type TopNavbarProps = {
	highlightLink?: Categories;
};

function TopNavbar({ highlightLink }: TopNavbarProps) {
	return (
		<Navbar isBordered shouldHideOnScroll>
			<NavbarContent justify="start">
				<NavbarBrand>
					<Link href="/" className="font-bold text-inherit">
						<Image src={"/logo.jpg"} alt={"Logo Icon"} width={50} height={50} />
						<h3 className="ml-2 text-large">NAME</h3>
					</Link>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				{Object.values(Categories).map((item) => (
					<NavbarItem key={item}>
						<Link
							color={highlightLink == item ? "primary" : "foreground"}
							href={`/category/${item}`}
							aria-current={highlightLink == item}
						>
							{item}
						</Link>
					</NavbarItem>
				))}
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem>
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
					/>
				</NavbarItem>
				<NavbarItem>
					<SigninButton />
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}

export default TopNavbar;
