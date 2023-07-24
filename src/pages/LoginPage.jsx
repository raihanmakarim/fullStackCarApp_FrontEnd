import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/background-car.css";
import { setToken, API } from "../config/api";
import jwt_decode from "jwt-decode";



const LoginPage = () => {


  const [ formData, setFormData ] = useState({
    phone: "",
    password: "",
    confPassword: "",
  });

 

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  //  const [ register, setRegister ] = useState({
  //     name: "",
  //     phone: "",
  //     password: "",
  //     confPassword: "",
  //   });
  //   const handleChangeRegister = (e) => {
  //     const { name, value } = e.target;
  //     setRegister({
  //       ...formData,
  //       [name]: value,
  //     });
  //   };

  const login = async (params) => {
    try {
      const res = await API.post("/users/login", params);
      const token = res.data.accessToken;
      setToken(token);
      const decoded = jwt_decode(token);
      console.log(decoded);

      const user_id = decoded.userId;
      localStorage.setItem("user_id", user_id);
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData);
      if (res) {
        navigate("/");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2  flex justify-center items-center h-screen">
        <div className="bg-gray-100 p-6 rounded shadow-md" >
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Phone
            </label>
            <input
              type="phone"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Log In
          </button>
        </div>
      </div>
      <div className="car-container">
        <div className='bg-car'>
          
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
