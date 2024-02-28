import TopNavbar, { Pages } from "@/components/TopNavbar/TopNavbar";

function RepeatElement(props: { times: number }) {
  const elements = Array.from({ length: props.times }, (_, index) => (
    <div className="border border-black h-40 w-40" key={index}>
      Item {index}
    </div>
  ));

  return <>{elements}</>;
}

function page() {
  return (
    <>
      <TopNavbar highlightLink={Pages.Electronics} />
      <main className="flex flex-col items-center">
        <div className="flex justify-center items-center text-center w-full h-60 border border-blue-500">
          Representative image
        </div>
        <div className="flex flex-1 w-full">
          <div className="flex justify-center items-center text-center border border-blue-500 w-80">
            Filters
          </div>
          <div className="grid grid-flow-row xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-y-8 flex-1 justify-items-center items-center border border-blue-500">
            <RepeatElement times={23} />
          </div>
        </div>
      </main>
    </>
  );
}

export default page;
