import axios from "axios";
import { apiURL } from "../utils/api-url";

export interface ApiResponse<T> {
  data: T;
  message: string;
}

export const handleError = (error) => {
  throw error;
};

const defaultOptions = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const get = <T>(url: string, options?: { [key: string]: any }) =>
  axios
    .get<T>(apiURL(url), { ...defaultOptions, ...options })
    .catch(handleError);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const post = <T>(url: string, data: any, options?: { [key: string]: any }) => {
  return axios
    .post<T>(apiURL(url), data, { ...defaultOptions, ...options })
    .catch(handleError);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const remove = <T>(url: string, options?: { [key: string]: any }) => {
  return axios
    .delete<T>(apiURL(url), { ...defaultOptions, ...options })
    .catch(handleError);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const patch = <T>(url: string, data: any, options?: { [key: string]: any }) => {
  return axios
    .patch<T>(apiURL(url), data, { ...defaultOptions, ...options })
    .catch(handleError);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const put = <T>(url: string, data: any, options?: { [key: string]: any }) => {
  return axios
    .put<T>(apiURL(url), data, { ...defaultOptions, ...options })
    .catch(handleError);
};

export const apiService = { get, post, put, patch, delete: remove };
