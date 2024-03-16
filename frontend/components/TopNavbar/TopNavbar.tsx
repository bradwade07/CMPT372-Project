import React from "react";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Link,
} from "@nextui-org/react";
import Image from "next/image";
import { Categories } from "@/app/categories";
import SigninButton from "../SigninButton/SigninButton";
import NavbarSearchbar from "../NavbarSearchbar/NavbarSearchbar";

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
					<NavbarSearchbar />
				</NavbarItem>
				<NavbarItem>
					<SigninButton />
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}

export default TopNavbar;
