import Axios from "axios";

if (!process.env.BACKEND_SERVER_BASE_URL) {
  console.error("env variable not set: BACKEND_SERVER_BASE_URL");
}

export const axios = Axios.create({
  baseURL: process.env.BACKEND_SERVER_BASE_URL,
});
