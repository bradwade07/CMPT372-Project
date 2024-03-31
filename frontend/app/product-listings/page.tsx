"use client";
import { TopNavbar } from "@/components/navbar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { getSessionUserEmail } from "@/app/auth";
import { getFilteredProducts } from "@/api/product";
import { Product } from "@/api/product.types";

async function fetchProducts() {
  const user_email = await getSessionUserEmail();
  if (user_email) {
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
          <p>My Product Listings</p>
          <Link
            href={"/product-listings/create-listing"}
            className="text-blue-500"
          >
            CREATE NEW LISTING
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
                  width="100%"
                  alt={item.product_name}
                  className="w-full object-cover h-[140px]"
                  src={item.main_product_img}
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{item.product_name}</b>
                <p className="text-default-500">{item.current_price}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}

export default page;
