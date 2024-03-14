import Link from "next/link";

function page() {
	// TODO: implement
	return (
		<main className="flex flex-col min-h-screen justify-center align-middle text-center">
			<p className="mb-4">Payment Successful</p>
			<Link href={"/"} className="text-blue-500">
				Back to Home
			</Link>
		</main>
	);
}

export default page;
