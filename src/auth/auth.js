import { useNavigate } from "react-router-dom";
import { setToken, API } from "../config/api";

export const login = async (params) => {
  const navigate = useNavigate();
  try {
    const res = await API.post("/login", params);
    setToken(res.data.access_token);
    navigate("/");
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};
