"use client";

import { getSession, logout } from "@/app/auth";
import { Button, Link } from "@nextui-org/react";
import React, { useState, useEffect } from "react";

const SigninButton = () => {
	const [validSession, setValidSession] = useState(false);

	useEffect(() => {
		checkForSession();
	}, []);

	async function checkForSession() {
		const session = await getSession();
		if (session) {
			setValidSession(true);
		} else {
			setValidSession(false);
		}
	}

	return (
		<>
			{validSession ? (
				<Button
					as={Link}
					color="secondary"
					href="/"
					variant="flat"
					onClick={async () => {
						await logout();
					}}
				>
					Sign Out
				</Button>
			) : (
				<Button as={Link} color="primary" href="/signin" variant="flat">
					Sign In
				</Button>
			)}
		</>
	);
};

export default SigninButton;
