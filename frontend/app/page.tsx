import TopNavbar from "@/components/TopNavbar/TopNavbar";

function Home() {
  return (
    <>
      <TopNavbar />
      <main
        className="flex flex-col items-center text-center min-h-screen min-w-full p-4"
        style={{ height: 2000 }}
      >
        <p>Home page</p>
      </main>
    </>
  );
}

export default Home;