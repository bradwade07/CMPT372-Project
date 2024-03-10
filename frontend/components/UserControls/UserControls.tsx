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
import { GoogleCredentials, getSessionUserData, logout } from "@/app/auth";

function UserControls() {
	const [userInfo, setUserInfo] = useState<GoogleCredentials>();

	useEffect(() => {
		retrieveSessionData();
	}, []);

	async function retrieveSessionData() {
		const info = await getSessionUserData();
		setUserInfo(info);
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
					<DropdownItem
						as={Link}
						key="logout"
						color="danger"
						href="/"
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
