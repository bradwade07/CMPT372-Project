import { CheckoutInfo } from "@/components/checkout-page";
import Link from "next/link";

// This page displays various components related to checking out, such as the list of items the user is purchasing, delivery/pickup information, and total price
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
