"use client";
import { getProduct } from "@/api/product";
import addToShoppingCart from "@/api/shoppingCart";
import { addToWishlist } from "@/api/wishlist";
import ImageSelector from "@/components/product-page/ImageSelector";
import { TopNavbar } from "@/components/navbar";
import { Button, RadioGroup, Radio } from "@nextui-org/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getInStockWarehouses } from "@/api/warehouse";
import { WarehouseWithStock } from "@/api/warehouse.types";
import { InStockWarehouseMap } from "@/components/product-page";
import { getSession } from "../auth";

type SearchParams = {
  product_id: number;
};

// This page displays all of the information on a certain product
// From here, the user can add items to their cart or wishlist
function page({ searchParams }: { searchParams: SearchParams }) {
  const router = useRouter();
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const { isLoading, error, data } = useQuery({
    queryKey: ["Product", searchParams.product_id],
    queryFn: () => getProduct(searchParams.product_id),
  });

  // query client used to invalidate queries and force a refetch of shopping cart or wishlist
  const queryClient = useQueryClient();

  // if the user is logged in, adds an item to their shopping cart, otherwise redirects them to log in
  async function addItemToShoppingCart() {
    if (selectedQuantity > 0) {
      const session = await getSession();
      if (session) {
        if((selectedDelivery || (!selectedDelivery && selectedWarehouse != -1 && warehouses.length > 0))){
          try {
            await addToShoppingCart(
              searchParams.product_id,
              selectedQuantity,
              selectedDelivery,
              selectedWarehouse,
            );
            queryClient.invalidateQueries({ queryKey: ["Shopping Cart"] });
          } catch (error) {
            console.error("Could not add item to shopping cart");
          }
        } else {
          console.error("Could not add item to shopping cart");
        }
      } else {
        router.push("/signin");
      }
    }
  }

  // if the user is logged in, adds an item to their wishlist, otherwise redirects them to log in
  async function addItemToWishlist() {
    if (selectedQuantity > 0) {
      const session = await getSession();
      if (session) {
        try {
          await addToWishlist(searchParams.product_id, selectedQuantity);
          queryClient.invalidateQueries({ queryKey: ["Wishlist"] });
        } catch (error) {
          console.error("Could not add item to shopping cart");
        }
      } else {
        router.push("/signin");
      }
    }
  }
  //checks the quantity being changed and keeps it a whole number
  // TODO: handle case where user selects a warehouse, but then increases the quantity beyond the warehouses' stock. currently they can still add to cart in this case
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setSelectedQuantity(parseInt(value));
    } else {
      setSelectedQuantity(0);
    }
  };

  const [selectedDelivery, setSelectedDelivery] = useState(true);
  //handles delivery option
  const handleSelectedDilvery = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.value === "false") {
      setSelectedDelivery(false);
    } else {
      setSelectedDelivery(true);
    }
  };

  const [warehouses, setWarehouses] = useState<WarehouseWithStock[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(-1);

  //used to get list of warehouses with the available quantity for the item
  useEffect(() => {
    (async () => {
      if (Number(selectedQuantity)) {
        const fetchedWarehouses = await getInStockWarehouses(
          searchParams.product_id,
          selectedQuantity,
        );
        if (fetchedWarehouses) {
          setWarehouses(fetchedWarehouses);
        }
      }
    })();
  }, [selectedQuantity, searchParams]);

  const handleWarehouseChange = (event: any) => {
    let num = +event.target.value;
    setSelectedWarehouse(num);
  };

  return (
    <>
      <TopNavbar />
      <main className="flex flex-col min-h-screen py-10">
        <div className="container mx-auto flex flex-col md:flex-row">
          <div className="flex flex-col justify-center items-center text-center md:w-2/5">
            <div className="w-full mt-[1rem]">
              {data ? (
                <ImageSelector
                  product_main_img={data.product_main_img}
                  additional_img={data.additional_img}
                />
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center text-center md:w-3/5">
            <p className="font-bold text-xl">{data?.product_name}</p>
            <p className="text-lg">${data?.base_price.toFixed(2)}</p>
            <div className="flex gap-4">
              <RadioGroup
                defaultValue="true"
                orientation="horizontal"
                onChangeCapture={handleSelectedDilvery}
              >
                <Radio value="true" defaultChecked>
                  Delivery
                </Radio>
                <Radio value="false">Pick Up</Radio>
              </RadioGroup>
            </div>
            {selectedDelivery === false && (
              <div className="my-2">
                <RadioGroup label="select pickup location">
                  {warehouses.map((warehouse) => (
                    <div key={warehouse.warehouse_id}>
                      <Radio
                        id={`warehouse-${warehouse.warehouse_id}`}
                        name="warehouse"
                        value={warehouse.warehouse_id.toString()}
                        checked={selectedWarehouse === warehouse.warehouse_id}
                        onChange={handleWarehouseChange}
                      >
                        {" "}
                        Warehouse ID: {warehouse.warehouse_id} has{" "}
                        {warehouse.quantity} in stock.
                      </Radio>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            <div className="flex flex-col gap-4 mb-8 py-5">
              <Button
                className="bg-blue-500 hover:bg-blue-700 text-white"
                onClick={addItemToShoppingCart}
                disabled={!selectedDelivery && selectedWarehouse == -1}
              >
                ADD TO CART
              </Button>
              <Button onClick={addItemToWishlist}>ADD TO WISHLIST</Button>
              <div className="grid grid-cols-2 gap-3 place-items-center h-10">
                <p>Quantity: </p>
                <input
                  className="rounded-md max-w-10 bg-slate-100 ring-2 ring-blue-500"
                  type="number"
                  min="0"
                  step="1"
                  value={
                    selectedQuantity === 0 ? "0" : selectedQuantity.toString()
                  }
                  onChange={handleQuantityChange}
                />
              </div>
            </div>
            <p className="mb-8">Description</p>
            <p className="mb-8">{data?.product_description}</p>
          </div>
        </div>
        <div className="mx-auto mt-20 w-1/2 lg:w-2/3 h-96">
          <InStockWarehouseMap data={warehouses} />
        </div>
        <div className="flex justify-center items-center text-center mt-8">
          REVIEWS
        </div>
        <div className="flex justify-center items-center text-center mt-8">
          ALSO LIKE THIS PRODUCT
        </div>
      </main>
    </>
  );
}

export default page;
