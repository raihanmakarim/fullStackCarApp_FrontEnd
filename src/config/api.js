import axios from "axios";
import process from "process";

// export const URL = process.env.REACT_APP_BASE_BACKEND_URL;
export const URL = "http://localhost:3001/";

export const API = axios.create({ baseURL: `${URL}` });
API.defaults.headers.common["Content-Type"] = "multipart/form-data";
API.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
const TOKEN_KEY = "access_token";

export const getToken = () => Cookies.get(TOKEN_KEY);

export const setToken = (token) => {
  document.cookie = `${TOKEN_KEY}=${token}; path=/; Secure; HttpOnly; SameSite=Strict`;
};

export const clearToken = () => {
  document.cookie = `${TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; HttpOnly; SameSite=Strict`;
};

export const setAuthHeaders = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    API.defaults.headers.common["Content-Type"] = "multipart/form-data";
    API.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  } else {
    delete API.defaults.headers.common["Authorization"];
    delete API.defaults.headers.common["Content-Type"];
    delete API.defaults.headers.common["Access-Control-Allow-Origin"];
  }
};
