import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import { Categories } from "@/api/filters.types";
import { SigninButton } from "./SigninButton";
import { NavbarSearchbar } from "./NavbarSearchbar";

type TopNavbarProps = {
  highlightLink?: Categories;
};

export function TopNavbar({ highlightLink }: TopNavbarProps) {
  return (
    <Navbar isBordered shouldHideOnScroll maxWidth="full">
      <NavbarContent justify="start">
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit">
            <img src={"/logo.jpg"} alt={"Logo Icon"} width={50} height={50} />
            <h3 className="ml-2 text-large">NAME</h3>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {Object.values(Categories).map((item) => (
          <NavbarItem key={item}>
            <Link
              color={highlightLink == item ? "primary" : "foreground"}
              href={`/category?categoryName=${item}`}
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
