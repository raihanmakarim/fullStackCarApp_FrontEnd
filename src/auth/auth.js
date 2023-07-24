import { useNavigate } from "react-router-dom";
import { setToken, API } from "../config/api";
import jwt_decode from "jwt-decode";

export const login = async (params) => {
  const navigate = useNavigate();
  try {
    const res = await API.post("/login", params);
    const token = res.data.access_token;
    setToken(token);
    const decoded = jwt_decode(token);
    console.log(decoded);

    const user_id = decoded.id;
    localStorage.setItem("user_id", user_id);
    navigate("/");
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};
