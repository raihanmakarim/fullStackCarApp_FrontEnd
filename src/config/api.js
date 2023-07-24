import axios from "axios";
import process from "process";
import jwt_decode from "jwt-decode";

// export const URL = process.env.REACT_APP_BASE_BACKEND_URL;
export const URL = "http://localhost:3001/";

export const getToken = () => localStorage.getItem("token");

export const getUserId = () => localStorage.getItem("user_id");

export const setToken = (token) => localStorage.setItem("token", token);

export const clearToken = () => localStorage.removeItem("token");

export const API = axios.create({ baseURL: `${URL}` });
API.defaults.headers.common["Content-Type"] = "multipart/form-data";
API.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export const setupAuthInterceptor = async () => {
  const refreshToken = async () => {
    try {
      const res = await API.get("/refresh_token");
      const newToken = res.data.accessToken;
      setToken(newToken);
      return newToken;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const currentDate = new Date();
  const token = getToken();

  if (token) {
    const decoded = jwt_decode(token);
    if (decoded.exp * 1000 < currentDate.getTime()) {
      try {
        const newToken = await refreshToken();
        API.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      } catch (error) {
        console.log(error);
        clearToken();
      }
    } else {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }
};
