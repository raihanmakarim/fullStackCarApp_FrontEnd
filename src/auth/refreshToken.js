import axios from "axios";
import jwt_decode from "jwt-decode";
import { getToken, setToken, clearToken, API } from "../config/API";

const refreshToken = async () => {
  try {
    const res = await API.get("/refresh_token");
    const newToken = res.data.access_token;
    setToken(newToken);
    return newToken;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const setupAuthInterceptor = () => {
  axios.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    const token = getToken();
    if (token) {
      const decoded = jwt_decode(token);
      if (decoded.exp * 1000 < currentDate.getTime()) {
        try {
          const newToken = await refreshToken();
          config.headers["Authorization"] = `Bearer ${newToken}`;
        } catch (error) {
          console.log(error);
          clearToken();
        }
      } else {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  });
};
