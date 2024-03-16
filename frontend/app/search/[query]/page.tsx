import { TopNavbar } from "@/components/navbar";
import { ItemGrid } from "@/components/products";

function page({ params }: { params: { query: string } }) {
	const queryString = decodeURI(params.query);

	return (
		<>
			<TopNavbar />
			<main className="flex flex-col items-center mb-16">
				<h3 className="mt-8 mx-4 text-2xl">
					Showing Results For: {queryString}
				</h3>
				<div className="flex flex-1 w-full mb-10 mt-8">
					<div
						className="flex justify-center items-center text-center border border-blue-500 w-80"
						style={{ height: "800px" }}
					>
						Filters
					</div>
					<ItemGrid
						queryFunctionKey={"getCategoryProducts"}
						filters={["queryString"]}
					/>
				</div>
			</main>
		</>
	);
}

export default page;
