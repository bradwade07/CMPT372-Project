import assert from "assert";
import Axios from "axios";

assert(
	process.env.BACKEND_SERVER_BASE_URL,
	"env variable not set: BACKEND_SERVER_BASE_URL"
);

export const axios = Axios.create({
	baseURL: process.env.BACKEND_SERVER_BASE_URL,
});
