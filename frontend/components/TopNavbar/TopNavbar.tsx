import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import Image from "next/image";

export enum Pages {
  Electronics = "Electronics",
  Clothing = "Clothing",
  Kitchen = "Kitchen",
}

type TopNavbarProps = {
  highlightLink?: Pages;
};

function TopNavbar({ highlightLink }: TopNavbarProps) {
  return (
    <Navbar isBordered shouldHideOnScroll>
      <NavbarBrand>
        <Link href="/" className="font-bold text-inherit">
          <Image src={"/logo.jpg"} alt={"Logo Icon"} width={50} height={50} />
          <h3 className="ml-2 text-large">NAME</h3>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {Object.values(Pages).map((item) => (
          <NavbarItem key={item}>
            <Link
              color={highlightLink == item ? "primary" : "foreground"}
              href={item.toLocaleLowerCase()}
              aria-current={highlightLink == item}
            >
              {item}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/signup" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default TopNavbar;
