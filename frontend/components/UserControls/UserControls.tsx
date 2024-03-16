"use client";

import React, { useEffect, useState } from "react";
import ShoppingCartModal from "../ShoppingCartModal/ShoppingCartModal";
import {
	Avatar,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Link,
} from "@nextui-org/react";
import {
	GoogleCredentials,
	getSessionUserData,
	getSessionUserType,
	logout,
} from "@/app/auth";
import { useQuery } from "@tanstack/react-query";
import { UserTypes } from "@/api/user.type";

function UserControls() {
	const [userInfo, setUserInfo] = useState<GoogleCredentials>();
	const [userType, setUserType] = useState<UserTypes>(UserTypes.Customer);

	useEffect(() => {
		retrieveSessionData();
	}, []);

	async function retrieveSessionData() {
		const userInfo = await getSessionUserData();
		const userType = await getSessionUserType();
		if (userInfo && userType) {
			setUserInfo(userInfo);
			setUserType(userType);
		}
	}

	function getUserSpecificOptions(): JSX.Element {
		switch (userType) {
			case UserTypes.Customer:
				return (
					<DropdownItem
						key="become vendor"
						as={Link}
						href="become-vendor"
						className="text-black"
					>
						Become a Vendor
					</DropdownItem>
				);
			case UserTypes.Vendor:
				return (
					<DropdownItem
						key="listings"
						as={Link}
						href="/product-listings"
						className="text-black"
					>
						My Product Listings
					</DropdownItem>
				);
			case UserTypes.Admin:
				return (
					<DropdownItem
						key="admin dashboard"
						as={Link}
						href="/admin-dashboard"
						className="text-black"
					>
						Admin Dashboard
					</DropdownItem>
				);
			default:
				return <></>;
		}
	}

	return (
		<div className="flex items-center gap-6">
			<ShoppingCartModal />
			<Dropdown placement="bottom-end">
				<DropdownTrigger>
					<Avatar
						isBordered
						as="button"
						className="transition-transform"
						src={userInfo?.picture}
					/>
				</DropdownTrigger>
				<DropdownMenu aria-label="Profile Actions" variant="flat">
					<DropdownItem key="profile" className="h-14 gap-2">
						<p className="font-semibold">Signed in as</p>
						<p className="font-semibold">{userInfo?.email}</p>
					</DropdownItem>
					<DropdownItem key="wishlist">My Wishlist</DropdownItem>
					{getUserSpecificOptions()}
					<DropdownItem
						key="logout"
						as={Link}
						href="/"
						color="danger"
						onClick={async () => {
							await logout();
						}}
					>
						Log Out
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</div>
	);
}

export default UserControls;
