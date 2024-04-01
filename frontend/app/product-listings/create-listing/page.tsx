import { TopNavbar } from "@/components/navbar";
import { CreateListingForm } from "@/components/vendor-components";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <>
      <TopNavbar />
      <Link href={"/product-listings"} className="text-blue-600 m-4">
        &lt;- Back to Product Listings
      </Link>
      <main className="flex flex-col items-center mb-16">
        <h3 className="mt-8 mx-4 text-2xl">Create Listing</h3>
        <div className="flex justify-center w-full mb-10 mt-8">
          <CreateListingForm />
        </div>
      </main>
    </>
  );
}

export default page;
