'use client'
import { TopNavbar } from "@/components/navbar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import { getSessionUserEmail } from "@/app/auth";
import { axios } from "@/api/axios";
import { isAxiosError } from "axios";
import { getProduct } from "@/api/product"


type ItemType = {
  productId : number, 
  name : string, 
  imgSrc: string, 
  description:  string,
  addedOn : Date, 
  basePrice : number, 
  currentPrice : number
}


async function getProductsByEmail(){
  const user_email = await getSessionUserEmail();
  if (user_email) {
    try {
      let response = await axios.get(
        `/getProductIdByUserEmail/${user_email}`,
      );

      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error.response?.data || error.response || error);
      } else {
        console.error(error);
      }

      return [];
    }
  } else {
    console.error("Could not retrieve vendor's products");
    return [];
  }
}

async function fetchProducts(){
  const items = await getProductsByEmail();
  
  const productList = items.map((productId: number) => getProduct(productId));
  return productList;
}

function page() {
  // TODO: implement

  const [list, setList] = useState<ItemType[] | undefined>()

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
        <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.name}
              className="w-full object-cover h-[140px]"
              src={item.imgSrc}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.name}</b>
            <p className="text-default-500">{item.currentPrice}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
      </main>
    </>
  );
}

export default page;
