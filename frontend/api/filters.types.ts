export enum Categories {
  Electronics = "Electronics",
  Clothing = "Clothing",
  Kitchen = "Kitchen",
  LivingRoom = "Living Room",
}

export function getCategoryEnumVal(uri: string): Categories | undefined {
  const str = decodeURI(uri);
  return Object.values(Categories).find((item) => {
    if (item == str) {
      return item;
    }
  });
}

export type FiltersType = {
  product_name?: string;
  product_avg_rating_min?: number;
  product_avg_rating_max?: number;
  current_price_min?: number;
  current_price_max?: number;
  product_date_added_before?: number;
  product_date_added_after?: number;
  tags?: string[];
  user_email?: string;
};
