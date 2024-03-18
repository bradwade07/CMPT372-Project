"use client"; // FIXME: shouldn't really be making a "page" component a client component, somehow refactor things later into client components so that this page doesn't have to have "use client"

import { getProduct } from "@/api/product";
import addToShoppingCart from "@/api/shoppingCart";
import { addToWishlist } from "@/api/wishlist";
import { TopNavbar } from "@/components/navbar";
import { Button } from "@nextui-org/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

function page({ params }: { params: { product_id: number } }) {
  const router = useRouter();

  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const { isLoading, error, data } = useQuery({
    queryKey: ["Product", params.product_id],
    queryFn: () => getProduct(params.product_id),
  });

  // queryClient and query invalidation used to force shopping cart and wishlist to refetch the updated contents
  const queryClient = useQueryClient();

  async function addItemToShoppingCart() {
    try {
      await addToShoppingCart(params.product_id, selectedQuantity);
      queryClient.invalidateQueries({ queryKey: ["Shopping Cart"] });
    } catch (error) {
      router.push("/signin");
      console.error("Could not add item to shopping cart");
    }
  }

  async function addItemToWishlist() {
    try {
      await addToWishlist(params.product_id, selectedQuantity);
      queryClient.invalidateQueries({ queryKey: ["Wishlist"] });
    } catch (error) {
      router.push("/signin");
      console.error("Could not add item to shopping cart");
    }
  }

  return (
    <>
      <TopNavbar />
      <main className="flex flex-col min-h-screen py-20">
        <div className="flex w-full">
          <div
            className="flex flex-col justify-center items-center text-center border border-blue-500"
            style={{ flexGrow: 0.4, minHeight: "500px" }}
          >
            <div
              className="relative flex justify-center items-center border border-blue-500 w-full object-contain"
              style={{ flexGrow: 0.85 }}
            >
              <img
                src={"/images/grey.jpg"} // TODO: properly display image
                alt="Product Image"
              />
            </div>
            <div
              className="flex justify-center items-center border border-blue-500 w-full"
              style={{ flexGrow: 0.15 }}
            >
              IMAGE SELECTOR
            </div>
          </div>
          <div
            className="flex flex-col gap-y-8 items-center text-center border border-blue-500"
            style={{ flexGrow: 0.6 }}
          >
            <p className="font-bold text-xl">{data?.product_name}</p>
            <p className="text-large">${data?.base_price}</p>
            <p className="mb-32">{data?.product_description}</p>
            <div className="flex flex-col mb-32 gap-4">
              <Button color="primary" onClick={addItemToShoppingCart}>
                ADD TO CART
              </Button>
              <Button color="secondary" onClick={addItemToWishlist}>
                ADD TO WISHLIST
              </Button>
              <p>Quantity: 1</p>
            </div>
            <p className="mb-40">SPECIFICATIONS</p>
          </div>
        </div>
        <div className="flex justify-center items-center text-center border border-blue-500 h-32">
          REVIEWS
        </div>
        <div className="flex justify-center items-center text-center border border-blue-500 h-96">
          WAREHOUSE MAP
        </div>
        <div className="flex justify-center items-center text-center border border-blue-500 h-60">
          ALSO LIKE THIS PRODUCT
        </div>
      </main>
    </>
  );
}

export default page;
