/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		SECRET_KEY: process.env.SECRET_KEY,
	},
};

export default nextConfig;
