"use client";

import { getSessionEmail, login } from "@/app/auth";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import { useRouter } from "next/navigation";

function page() {
	const router = useRouter();

	if (!(process.env.GOOGLE_CLIENT_ID || process.env.SECRET_KEY)) {
		alert(
			"process.env.GOOGLE_CLIENT_ID or process.env.SECRET_KEY not set or not correctly setup"
		);
	}

	return (
		<main className="flex flex-col text-center min-h-screen p-8">
			<h1 className="text-bold text-3xl mb-4">Sign-In Page</h1>
			<p>Sign in with google to start shopping!</p>
			<div className="flex flex-col flex-1 justify-center">
				<div className="flex justify-center mb-8">
					<GoogleLogin
						onSuccess={(credentialResponse: CredentialResponse) =>
							login(credentialResponse)
								.then(async () => {
									console.log(await getSessionEmail());
								})
								.then(() => router.push("/"))
						}
						onError={() => {
							console.log("Login Failed");
						}}
					/>
				</div>
				<Link href="/" className="text-blue-600">
					Back to home
				</Link>
			</div>
		</main>
	);
}

export default page;
