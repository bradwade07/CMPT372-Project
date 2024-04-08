import Axios from "axios";
import https from "https";

if (!process.env.BACKEND_SERVER_BASE_URL) {
  console.error("env variable not set: BACKEND_SERVER_BASE_URL");
}

// creating axios object for all backend api calls to use
export const axios = Axios.create({
  baseURL: process.env.BACKEND_SERVER_BASE_URL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});
