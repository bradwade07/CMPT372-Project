import { GoogleLoginButton } from "@/components/signin-page";
import Link from "next/link";

function page() {
  return (
    <main className="flex flex-col text-center min-h-screen p-8">
      <h1 className="text-bold text-3xl mb-4">Sign-In Page</h1>
      <p>Sign in with google to start shopping!</p>
      <div className="flex flex-col flex-1 justify-center">
        <div className="flex justify-center mb-8">
          <GoogleLoginButton />
        </div>
        <Link href="/" className="text-blue-600">
          Back to home
        </Link>
      </div>
    </main>
  );
}

export default page;
