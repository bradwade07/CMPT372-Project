import { TopNavbar } from "@/components/navbar";
import React from "react";

function page() {
  // TODO: implement
  return (
    <>
      <TopNavbar />
      <main className="flex flex-col items-center mb-16">
        <h3 className="mt-8 mx-4 text-2xl">Admin Dashboard</h3>
        <div className="flex flex-1 justify-center w-full mb-10 mt-8">
          <p>Admin dashboard</p>
        </div>
      </main>
    </>
  );
}

export default page;
