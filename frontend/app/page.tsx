import ItemCard from "@/components/ItemCard/ItemCard";
import TopNavbar from "@/components/TopNavbar/TopNavbar";
import Link from "next/link";

function Home() {
  return (
    <>
      <TopNavbar />
      <main className="flex flex-col items-center text-center min-h-screen min-w-full p-4">
        <h3 className="text-large font-bold uppercase">SALES</h3>
        <div className="flex justify-center items-center w-full border border-blue-500 mb-10 gap-8">
          <ItemCard />
          <ItemCard />
          <ItemCard />
        </div>
        <h3 className="text-large font-bold uppercase">NEW ITEMS</h3>
        <div className="flex justify-center items-center w-full border border-blue-500 mb-10 gap-8">
          <ItemCard />
          <ItemCard />
          <ItemCard />
        </div>
        <Link className="flex justify-center text-blue-400 mt-4" href={"/scrolltest"}>Click for horizontal card scroll sample</Link>
      </main>
    </>
  );
}

export default Home;
