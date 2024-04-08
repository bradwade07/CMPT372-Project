import { getCategoryEnumVal, getCategoryImg } from "@/api/filters.types";
import { TopNavbar } from "@/components/navbar";
import { ItemsAndFilters } from "@/components/products";

type SearchParams = {
  categoryName: string;
};

// This page lists all of the products that are in a certain category
// User can further filter down the products displays by things like price, rating, other tags
function page({ searchParams }: { searchParams: SearchParams }) {
  const categoryNameEnumVal = getCategoryEnumVal(searchParams.categoryName);

  if (categoryNameEnumVal) {
    return (
      <>
        <TopNavbar highlightLink={categoryNameEnumVal} />
        <main className="flex flex-col items-center mb-16">
          <div className="flex justify-center items-center text-center w-full h-60 overflow-hidden">
            <img
              className="w-full"
              src={getCategoryImg(categoryNameEnumVal)}
              alt="Representative Image"
            />
          </div>
          <ItemsAndFilters categoryName={categoryNameEnumVal} />
        </main>
      </>
    );
  } else {
    return (
      <>
        <TopNavbar />
        <main className="flex flex-col items-center mb-16">
          <p className="mt-8">
            Error loading page, please return to home page.
          </p>
        </main>
      </>
    );
  }
}

export default page;
