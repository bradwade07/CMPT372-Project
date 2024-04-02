export enum Categories {
  Electronics = "Electronics",
  Fashion = "Fashion",
  Kitchen = "Kitchen",
  Home = "Home",
  Garden = "Garden",
  Toys = "Toys",
}

let categoryImgSrcMap = new Map<Categories, string>();
categoryImgSrcMap.set(Categories.Electronics, "/images/electronics.png");
categoryImgSrcMap.set(Categories.Fashion, "/images/fashion.jpg");
categoryImgSrcMap.set(Categories.Kitchen, "/images/kitchen.jpg");
categoryImgSrcMap.set(Categories.Home, "/images/home.jpeg");
categoryImgSrcMap.set(Categories.Garden, "/images/gardening.jpg");
categoryImgSrcMap.set(Categories.Toys, "/images/toys.jpg");
/*
img sources:
https://www.pngall.com/electronic-png/download/24921
https://www.peakpx.com/474334/assorted-clothing
https://www.flickr.com/photos/tim_ellis/37292864641
https://www.pexels.com/photo/cozy-living-room-with-sofa-5825527/
https://www.flickr.com/photos/andrea_44/2922876304/in/photolist-AUh7cY-bz8dKB-RWLPrK-LbSPUj-LbSHzq-M9d1k2-LbSRrh-5shvi3-BRm7sA-5Qkw27-bz8dA4-bmdkUY-bmdkYJ-adBwz-CvAVHn-KhGa6i-LbSQkE-M9d1Rn-M9d1Pt-M9d1zv-LbSR4U-LbSPs7-LbSP8Q-LbSNVq-LbSNCS-LbSMQu-LbSMnf-LbSKMG-LbSNjq-LbSN3d-LbSMBU-LbSM2A-LbSLNE-LbSLBC-LbSLfW-LbSKt5-LbSKfE-LbSJUu-LbSJxs-LbSJcN-LbSHRs-LbSHnw-LbSH3y-LbSGwo-LbSG1J-LbSFpJ-LbSEZA-LbSECo-LYpuRq-bz8e8P
https://www.flickr.com/photos/garryknight/6459495571/
*/

export function getCategoryEnumVal(uri: string): Categories | undefined {
  const str = decodeURI(uri);
  return Object.values(Categories).find((item) => {
    if (item == str) {
      return item;
    }
  });
}

export function getCategoryImg(category: Categories): string {
  let result = categoryImgSrcMap.get(category);
  return result ? result : "/images/grey.jpg";
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

export function filtersToQueryString(filters: FiltersType): string {
  const queryStringParams: string[] = [];

  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        queryStringParams.push(`${key}=${value.join(",")}`);
      } else {
        queryStringParams.push(`${key}=${value}`);
      }
    }
  }

  return queryStringParams.join("&");
}
