import React from "react";
import { Switch,Route } from "react-router-dom";
import PrivateRoutes from "../utils/PrivateRoutes";
import Home from "../pages/home.jsx";


const Routes = () => (
  <Switch>
    <PrivateRoutes.UserLogin exact path="/" component={Home} />
    {/* <PrivateRoutes.UserLogin exact path="/" component={Home} />
      <PrivateRoutes.UserNotLogin path="/login" component={Login} /> */}
    {/* <PrivateRoutes.UserNotLogin path="/" component={Home} /> */}
    {/* <Route path="/" component={<div>asdasdasdasdas</div>} /> */}

    {/* <Route component={NotFound} /> */}
  </Switch>
);

export default Routes;
