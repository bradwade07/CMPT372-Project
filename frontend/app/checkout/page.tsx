import { CheckoutInfo } from "@/components/CheckoutInfo";
import Link from "next/link";

function page() {
	return (
		<>
			<Link href={"/"} className="text-blue-600 m-4">
				&lt;- Back to Home
			</Link>
			<main className="mb-16">
				<CheckoutInfo />
			</main>
		</>
	);
}

export default page;
