import axios, { AxiosInstance } from "axios";
import { ACCESS_TOKEN, BASEURL } from "../constants";



export const apiService: AxiosInstance = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type":"application/json"
  },
});

apiService.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem(ACCESS_TOKEN);
      return Promise.reject(new Error("You are not authorized to access this portal!"));
    }
  }
)