"use client";
import { TopNavbar } from "@/components/navbar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { getSessionUserEmail } from "@/app/auth";
import { getFilteredProducts } from "@/api/product";
import { Product } from "@/api/product.types";

async function fetchProducts() {
  const user_email = await getSessionUserEmail();
  if (user_email) {
    console.log(getFilteredProducts({ user_email: user_email }));
    return await getFilteredProducts({ user_email: user_email });
  } else {
    console.error("Could not retrieve vendor's products");
    return [];
  }
}

function page() {
  const [list, setList] = useState<Product[] | undefined>();

  useEffect(() => {
    fetchProducts().then(setList);
  }, []);

  return (
    <>
      <TopNavbar />
      <main className="flex flex-col items-center mb-16">
        <h3 className="mt-8 mx-4 text-2xl">My Product Listings</h3>
        <div className="flex flex-col flex-1 text-center w-full mb-10 mt-8">
          <Link
            href={"/product-listings/create-listing"}
            className="text-blue-500"
          >
            <Button className="bg-blue-500 hover:bg-blue-700 text-white">
              {" "}
              CREATE NEW LISTING{" "}
            </Button>
          </Link>
        </div>
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
          {list?.map((item, index) => (
            <Card
              shadow="sm"
              key={index}
              isPressable
              onPress={() => console.log("item pressed")}
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width={192}
                  alt={item.product_name}
                  className="w-full object-cover h-[140px]"
                  src={`data:image/jpeg;base64, ${item?.product_main_img}`}
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{item.product_name}</b>
                <p className="text-default-500">
                  ${item.current_price.toFixed(2)}
                </p>
                <p className="text-default-200">
                  ${item.base_price.toFixed(2)}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}

export default page;
