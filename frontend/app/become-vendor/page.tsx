import TopNavbar from "@/components/TopNavbar/TopNavbar";
import React from "react";

function page() {
	return (
		<>
			<TopNavbar />
			<main className="flex flex-col items-center mb-16">
				<h3 className="mt-8 mx-4 text-2xl">Become a Vendor</h3>
				<div className="flex flex-1 justify-center w-full mb-10 mt-8">
					<p>TODO: become a vendor</p>
				</div>
			</main>
		</>
	);
}

export default page;
