import { getPageEnumVal } from "@/api/categories.types";
import { TopNavbar } from "@/components/navbar";
import { ItemsAndFilters } from "@/components/products";

function page({ params }: { params: { categoryName: string } }) {
  const categoryNameEnumVal = getPageEnumVal(params.categoryName);

  if (categoryNameEnumVal) {
    return (
      <>
        <TopNavbar highlightLink={categoryNameEnumVal} />
        <main className="flex flex-col items-center mb-16">
          <div className="flex justify-center items-center text-center w-full h-60 border border-blue-500">
            Representative image
          </div>
          <ItemsAndFilters categoryName={categoryNameEnumVal} />
        </main>
      </>
    );
  } else {
    return (
      <>
        <TopNavbar highlightLink={categoryNameEnumVal} />
        <main className="flex flex-col items-center mb-16">
          <p>Error loading page, please return to home page.</p>
        </main>
      </>
    );
  }
}

export default page;
