"use client";

import { getSession } from "@/app/auth";
import { Button, Link } from "@nextui-org/react";
import React from "react";
import UserControls from "../UserControls/UserControls";
import { useQuery } from "@tanstack/react-query";

const SigninButton = () => {
	const { isLoading, data: session } = useQuery({
		queryKey: ["session"],
		queryFn: checkForSession,
	});

	async function checkForSession() {
		const session = await getSession();
		return session;
	}

	return (
		<>
			{!isLoading &&
				(session ? (
					<UserControls />
				) : (
					<Button as={Link} color="primary" href="/signin" variant="flat">
						Sign In
					</Button>
				))}
		</>
	);
};

export default SigninButton;
