import axios from "axios";

export const httpClientV1 = axios.create({
  baseURL: `${process.env.API_URL}/v1`,
});
