import ItemScrollMenu from "@/components/ItemScrollMenu/ItemScrollMenu";
import TopNavbar from "@/components/TopNavbar/TopNavbar";

function Home() {
  return (
    <>
      <TopNavbar />
      <main className="flex flex-col items-center text-center min-h-screen min-w-full">
        <div className="flex justify-center items-center text-center min-h-screen w-full border border-blue-500 mb-10">
          Insert some kind of representative image here
        </div>
        <div className="p-4 w-full">
          <div className="flex justify-center items-center mb-10">
            {/* TODO: pass a function or something to ItemScrollMenu that it uses to get its content */}
            <ItemScrollMenu header={"SALES"} />
          </div>
          <div className="flex justify-center items-center mb-10">
            <ItemScrollMenu header={"NEW ITEMS"} />
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
