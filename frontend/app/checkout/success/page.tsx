"use client";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect } from "react";

// This page is displayed when the user successfully checks out and pays for their order
function page() {
  // TODO: implement

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["Shopping Cart"] });
  }, []);

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
