import React from "react";
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";
import Home from "./pages/home";
// import Login from "./pages/login";
import Navbar from "./components/Navbar";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

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
