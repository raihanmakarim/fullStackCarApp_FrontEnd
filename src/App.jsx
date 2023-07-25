import React from "react";
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import CarPage from "./pages/CarPage";
import UserCar from "./pages/userCar";
function App() {
  const checkIsLogin = !!localStorage.getItem("token");

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/car/:id" element={<CarPage />} />
        { checkIsLogin && <Route path="/user/car/:id" element={<UserCar />} /> }



        {/* <PrivateRoute
          path="/dashboard"
          element={<Dashboard />}
          requiresLogin
        /> */}

        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
