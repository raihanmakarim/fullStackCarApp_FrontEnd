import React from "react";
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import CarPage from "./pages/CarPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/car/:id" element={<CarPage />} />


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
