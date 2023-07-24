import api from "../config/api";
import { useHistory } from "react-router-dom";
import { setToken } from "../config/api";

export const login = async (params) => {
  const history = useHistory();
  try {
    const res = await api.post("/login", params);
    setToken(res.data.access_token);
    history.push("/");
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};
