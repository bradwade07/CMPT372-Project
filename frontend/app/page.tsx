import { TopNavbar } from "@/components/navbar";
import { ItemScrollMenu } from "@/components/products";

function Home() {
  return (
    <>
      <TopNavbar />
      <main className="flex flex-col items-center text-center min-h-screen min-w-full">
        <div className="p-4 w-full">
          <div className="flex justify-center items-center mb-10">
            <ItemScrollMenu
              header={"SALES"}
              queryFunctionKey={"getSaleProducts"}
            />
          </div>
          <div className="flex justify-center items-center mb-10">
            <ItemScrollMenu
              header={"NEW ITEMS"}
              queryFunctionKey={"getNewProducts"}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
