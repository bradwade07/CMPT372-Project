"use client"; // FIXME: shouldn't really be making a "page" component a client component, somehow refactor things later into client components so that this page doesn't have to have "use client"

import { getProduct } from "@/api/product";
import addToShoppingCart from "@/api/shoppingCart";
import { addToWishlist } from "@/api/wishlist";
import { TopNavbar } from "@/components/navbar";
import { Button } from "@nextui-org/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SearchParams = {
  product_id: number;
};

function page({ searchParams }: { searchParams: SearchParams }) {
  const router = useRouter();

  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const { isLoading, error, data } = useQuery({
    queryKey: ["Product", searchParams.product_id],
    queryFn: () => getProduct(searchParams.product_id),
  });

  // queryClient and query invalidation used to force shopping cart and wishlist to refetch the updated contents
  const queryClient = useQueryClient();

  async function addItemToShoppingCart() {
    try {
      await addToShoppingCart(searchParams.product_id, selectedQuantity);
      queryClient.invalidateQueries({ queryKey: ["Shopping Cart"] });
    } catch (error) {
      router.push("/signin");
      console.error("Could not add item to shopping cart");
    }
  }

  async function addItemToWishlist() {
    try {
      await addToWishlist(searchParams.product_id, selectedQuantity);
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
  <div className="container mx-auto flex flex-col md:flex-row">
    <div className="flex flex-col justify-center items-center text-center md:w-2/5">
      <div className="relative w-full h-96">
        <img
          src={"/images/grey.jpg"} // TODO: properly display image
          alt="Product Image"
          className="object-contain w-full h-full"
        />
      </div>
      <div className="w-full mt-4">IMAGE SELECTOR</div>
    </div>
    <div className="flex flex-col justify-center items-center text-center md:w-3/5">
      <p className="font-bold text-xl">{data?.product_name}</p>
      <p className="text-lg">${data?.base_price}</p>
      <p className="mb-8">{data?.product_description}</p>
      <div className="flex flex-col gap-4 mb-8">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addItemToShoppingCart}>
          ADD TO CART
        </button>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={addItemToWishlist}>
          ADD TO WISHLIST
        </button>
        <p>Quantity: 1</p>
      </div>
      <p className="mb-8">SPECIFICATIONS</p>
    </div>
  </div>
  <div className="flex justify-center items-center text-center mt-8">
    REVIEWS
  </div>
  <div className="flex justify-center items-center text-center mt-8">
    WAREHOUSE MAP
  </div>
  <div className="flex justify-center items-center text-center mt-8">
    ALSO LIKE THIS PRODUCT
  </div>
</main>

    </>
  );
}

export default page;
