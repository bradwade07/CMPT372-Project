import { getProduct } from "@/api/product";
import { Product } from "@/api/product.types";
import { useQuery } from "@tanstack/react-query";

// TODO: decide whether each individual itemcard is fetching its own stuff or if it is going to be passed an object from its parent
export function useGetProduct(productId: number) {
  return useQuery<Product, Error>({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
  });
}
