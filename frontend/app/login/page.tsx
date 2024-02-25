import Link from "next/link";

function page() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <p className="mb-4">Login page</p>
      <Link href="/" className="text-blue-600">Back to home</Link>
    </main>
  );
}

export default page;