import{ Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const checkIsLogin = () => !!Cookies.get("token");

const PrivateRoute = ({
  component: Component, requiresLogin, ...rest 
}) => {
  const [ isLogin, setIsLogin ] = useState(false);

  useEffect(() => {
    setIsLogin(checkIsLogin());
  }, []);

  if (requiresLogin && !isLogin) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} element={<Component />} />;
}
export default PrivateRoute;
