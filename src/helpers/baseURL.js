import axios from "axios";
import { getLocalStorage } from "./frontendHelper";
export const API = axios.create({
  baseURL: "https://develop.api.posapt.au/api",
});
export const API2 = axios.create({
  baseURL: "https://develop.posapt.au/api",
});

API2.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    const storeId =
      getLocalStorage("storeDetailsUser") &&
      getLocalStorage("storeDetailsUser")[0].id
        ? getLocalStorage("storeDetailsUser")[0]?.id
        : getLocalStorage("storeDetailsUser")[0]?.storeId;
    const userId = getLocalStorage("userDetails")?.userId;

    config.headers = Object.assign(
      {
        Authorization: `Bearer ${token}`,
        storeId,
        userId,
      },
      config.headers
    );
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
