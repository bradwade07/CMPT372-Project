import { BecomeVendorButton } from "@/components/become-vendor-page";
import { TopNavbar } from "@/components/navbar";
import React from "react";

// A customer can use this page to apply to become a vendor
function page() {
  return (
    <>
      <TopNavbar />
      <main className="flex flex-col items-center mb-16">
        <h3 className="mt-8 mx-4 text-2xl">Become a Vendor</h3>
        <div className="flex flex-col align-middle text-center w-full mb-10 mt-8">
          <p className="mb-4">
            By becoming a vendor, you will be able to put up your own product
            postings for our customers to view and purchase.
          </p>
          <p className="mb-4">
            To apply, simply click the button below and we will approve your
            request in due time.
          </p>
          <p className="mb-4">
            Once approved, you may need log out and log in again for the account
            changes to take effect.
          </p>
          <BecomeVendorButton />
        </div>
      </main>
    </>
  );
}

export default page;
