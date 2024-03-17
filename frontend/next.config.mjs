/** @type {import('next').NextConfig} */
// note: any env variable defined here is available on the client browser too
const nextConfig = {
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    BACKEND_SERVER_BASE_URL: process.env.BACKEND_SERVER_BASE_URL,
  },
};

export default nextConfig;
