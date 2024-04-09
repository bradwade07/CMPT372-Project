"use client";
import { TopNavbar } from "@/components/navbar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { getSessionUserEmail } from "@/app/auth";
import { getFilteredProducts } from "@/api/product";
import { Product } from "@/api/product.types";
import { DeleteModal } from "@/components/vendor-components";
import { EditModal } from "@/components/vendor-components";
import { useRouter } from "next/navigation";

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
  //const for router
  const router = useRouter();
  //data used for cards
  const [list, setList] = useState<Product[] | undefined>();
  //functions used for opening and closing delete modal along with setting what item to be deleted
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number>(0);
  //function call for opening editing/closing editing modal along with price/and id
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);
  const [editBase, setEditBase] = useState<number>(0);
  const [editCurrent, setEditCurrent] = useState<number>(0);
  //functions for closing modal
  function onDeleteClose() {
    setDeleteOpen(false);
  }

  function onEditClose() {
    setEditOpen(false);
  }

  useEffect(() => {
    fetchProducts().then(setList);
  }, []);
  //update the page when the modals are closed
  useEffect(() => {
    fetchProducts().then(setList);
  }, [onDeleteClose, onEditClose]);
  //handle edit function craeted for readablity
  const handleEdit = (pid: number, pbp: number, pcp: number) => {
    setEditOpen(true);
    setEditId(pid); //sets product id
    setEditBase(pbp); //sets base price
    setEditCurrent(pcp); //sets curent price
  };

  return (
    <>
      <TopNavbar />
      <main className="flex flex-col items-center mb-16">
        <DeleteModal
          open={deleteOpen}
          onDeleteClose={onDeleteClose}
          productId={deleteId}
        />
        <EditModal
          open={editOpen}
          onEditClose={onEditClose}
          productId={editId}
          basePrice={editBase}
          currentPrice={editCurrent}
        />
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
              key={index}
              isPressable
              onClick={() => {
                  router.push(`/product?product_id=${item.product_id}`);
                }
              }
            >
              <CardBody className="overflow-visible p-4">
                <div className="flex justify-center gap-4 items-center">
                  <Image
                    radius="lg"
                    alt={item.product_name}
                    className="object-contain h-[140px] w-[140px]"
                    src={`data:image/jpeg;base64, ${item?.product_main_img}`}
                  />
                  <div className="inline-grid grid-cols-1 grid-rows-2">
                    <Button
                      color="warning"
                      className="my-2"
                      aria-label="Change price of listing"
                      onClick={() => {
                        handleEdit(
                          item.product_id,
                          item.base_price,
                          item.current_price,
                        );
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      color="danger"
                      className="my-2"
                      aria-label="Delete listing"
                      onClick={() => {
                        setDeleteOpen(true);
                        setDeleteId(item.product_id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
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
