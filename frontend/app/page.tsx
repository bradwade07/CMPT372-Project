import ItemScrollMenu from "@/components/ItemScrollMenu/ItemScrollMenu";
import TopNavbar from "@/components/TopNavbar/TopNavbar";

const getItems = () =>
  Array(20)
    .fill(0)
    .map((_, index) => ({ id: index.toString() }));

function Home() {
  return (
    <>
      <TopNavbar />
      <main className="flex flex-col items-center text-center min-h-screen min-w-full p-4">
        <div className="flex justify-center items-center w-full mb-10">
          <ItemScrollMenu header={"SALES"} contents={getItems()} />
        </div>
        <div className="flex justify-center items-center w-full mb-10">
          <ItemScrollMenu header={"NEW ITEMS"} contents={getItems()} />
        </div>
      </main>
    </>
  );
}

export default Home;
