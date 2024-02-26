import TopNavbar, { Pages } from "@/components/TopNavbar/TopNavbar";

function page() {
  return (
    <>
      <TopNavbar highlightLink={Pages.Electronics} />
      <main className="flex flex-col items-center p-4" style={{ height: 2000 }}>
        <p>Electronics page</p>
      </main>
    </>
  );
}

export default page;
