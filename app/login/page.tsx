"use client";

import { GoogleLogin } from "@react-oauth/google";
import Link from "next/link";

function page() {
  if (!process.env.CLIENT_ID) {
    alert("process.env.CLIENT_ID not set or not correctly setup");
  }

  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <div className="mb-8">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
      <Link href="/" className="text-blue-600">
        Back to home
      </Link>
    </main>
  );
}

export default page;
