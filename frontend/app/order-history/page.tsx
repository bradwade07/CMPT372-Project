import { TopNavbar } from "@/components/navbar";
import { PastOrders } from "@/components/order-history-page";

function page() {
  return (
    <>
      <TopNavbar />
      <main className="mb-16">
        <PastOrders />
      </main>
    </>
  );
}

export default page;
