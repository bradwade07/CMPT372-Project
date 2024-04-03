"use client"
import { getProduct } from "@/api/product"
import addToShoppingCart from "@/api/shoppingCart"
import { addToWishlist } from "@/api/wishlist"
import ImageSelector from "@/components/ImageSelector/ImageSelector"
import { TopNavbar } from "@/components/navbar"
import { Button, RadioGroup, Radio } from "@nextui-org/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { getInStockWarehouses } from "@/api/warehouse"

type SearchParams = {
  product_id: number
}
export type Warehouse = {
  warehouse_id: number;
  lat: number;
  long: number;
};


function page({ searchParams }: { searchParams: SearchParams }) {

  const router = useRouter()
  const [selectedQuantity, setSelectedQuantity] = useState(1)

  const { isLoading, error, data } = useQuery({
    queryKey: ["Product", searchParams.product_id],
    queryFn: () => getProduct(searchParams.product_id),
  })

  const queryClient = useQueryClient()

  // TODO: check if valid session, otherwise router.push("/signin")
  async function addItemToShoppingCart() {
    try {
      // TODO: provide actual "delivery" and "warehouse_id" values
      await addToShoppingCart(
        searchParams.product_id,
        selectedQuantity,
        false,
        1,
      )
      queryClient.invalidateQueries({ queryKey: ["Shopping Cart"] })
    } catch (error) {
      router.push("/signin")
      console.error("Could not add item to shopping cart")
    }
  }

  // TODO: check if valid session, otherwise router.push("/signin")
  async function addItemToWishlist() {
    try {
      await addToWishlist(searchParams.product_id, selectedQuantity)
      queryClient.invalidateQueries({ queryKey: ["Wishlist"] })
    } catch (error) {
      router.push("/signin")
      console.error("Could not add item to shopping cart")
    }
  }

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (/^\d*$/.test(value)) {
      setSelectedQuantity(parseInt(value))
    }
  }

  const [selectedDilvery, setSelectedDilvery] = useState('true')
  const [hasFetched, setHasFetched] = useState(true)

  const handleSelectedDilvery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDilvery(event.target.value)
    setHasFetched(false);
    
  }

   
  
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState();


    useEffect(()=>{
      (async () =>{
        if( selectedDilvery === 'false' && data && !hasFetched){
          const fetchedWarehouses = await getInStockWarehouses(data?.product_id, selectedQuantity); 
          if(fetchedWarehouses){
            setWarehouses(fetchedWarehouses);
          }
          console.log(warehouses);
          console.log("product id: " +data.product_id, "quantity: " + selectedQuantity);
          setHasFetched(true);
        } 
      })();
    });
  
    const handleWarehouseChange = (event: any) => {
      setSelectedWarehouse(event.target.value);
    }
  
  

  return (
    <>
      <TopNavbar />
      <main className="flex flex-col min-h-screen py-20">
        <div className="container mx-auto flex flex-col md:flex-row">
          <div className="flex flex-col justify-center items-center text-center md:w-2/5">
            <div className="relative w-full h-96">
              <img
                src={`data:image/jpeg;base64, ${data?.product_main_img}`}
                alt="Product Image"
                className="object-contain w-full h-full"
              />
            </div>
            <div className="w-full mt-4">
              <ImageSelector />
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
            {selectedDilvery === 'false' && (
              <div>
              {warehouses.map((warehouse) => (
                <div key={warehouse.warehouse_id}>
                  <input
                    type="radio"
                    id={`warehouse-${warehouse.warehouse_id}`}
                    name="warehouse"
                    value={warehouse.warehouse_id}
                    checked={selectedWarehouse === warehouse.warehouse_id}
                    onChange={handleWarehouseChange}
                  />
                  <label htmlFor={`warehouse-${warehouse.warehouse_id}`}>{warehouse.warehouse_id}</label>
                </div>
              ))}
            </div>
            )}
            <div className="flex flex-col gap-4 mb-8 py-5">
              <Button
                className="bg-blue-500 hover:bg-blue-700 text-white"
                onClick={addItemToShoppingCart}
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
                  value={selectedQuantity}
                  onChange={handleQuantityChange}
                />
              </div>
            </div>
            <p className="mb-8">Description</p>
            <p className="mb-8">{data?.product_description}</p>
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
  )
}

export default page
