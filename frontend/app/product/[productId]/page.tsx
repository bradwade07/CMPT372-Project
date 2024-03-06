import TopNavbar from "@/components/TopNavbar/TopNavbar";

function page() {
	return (
		<>
			<TopNavbar />
			<main className="flex flex-col min-h-screen py-20">
				<div className="flex w-full">
					<div
						className="flex flex-col justify-center items-center text-center border border-blue-500"
						style={{ flexGrow: 0.4, minHeight: "500px" }}
					>
						<div
							className="flex justify-center items-center border border-blue-500 w-full"
							style={{ flexGrow: 0.85 }}
						>
							IMAGE
						</div>
						<div
							className="flex justify-center items-center border border-blue-500 w-full"
							style={{ flexGrow: 0.15 }}
						>
							IMAGE SELECTOR
						</div>
					</div>
					<div
						className="flex flex-col gap-y-8 items-center text-center border border-blue-500"
						style={{ flexGrow: 0.6 }}
					>
						<p className="font-bold text-xl">PRODUCT NAME</p>
						<p className="text-large">PRICE</p>
						<p className="mb-32">DESCRIPTION</p>
						<p className="mb-32">
							ADD TO CART
							<br /> ADD TO WISHLIST
						</p>
						<p className="mb-40">SPECIFICATIONS</p>
					</div>
				</div>
				<div className="flex justify-center items-center text-center border border-blue-500 h-32">
					REVIEWS
				</div>
				<div className="flex justify-center items-center text-center border border-blue-500 h-96">
					WAREHOUSE MAP
				</div>
				<div className="flex justify-center items-center text-center border border-blue-500 h-60">
					ALSO LIKE THIS PRODUCT
				</div>
			</main>
		</>
	);
}

export default page;
