import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/background-car.css";
import { setToken, API } from "../config/api";
import jwt_decode from "jwt-decode";



const LoginPage = () => {
  const handleRefresh = () => {
    window.location.reload();
  };
  const checkIsLogin = !!localStorage.getItem("token");
  const [ isRegister, setIsRegister ] = useState(false);


  const [ formData, setFormData ] = useState({
    phone: "",
    password: "",
    confPassword: "",
  });

  const [ registerData, setRegisterData ] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confPassword: "",
  });


 

 

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (isRegister) {
      setRegisterData({
        ...registerData,
        [name]: value,
      });
    }else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    
  };
 

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

  const Register = async (params) => {
    try {
      const res = await API.post("/users/register", params);
      
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    handleRefresh();
    // try{
    //   const res= await API.post("/users/logout");
    //   console.log(res);
    // }catch(error){
    //   console.log(error);
    
    // }
  };





  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData);
      if (res) {
        navigate("/");
        handleRefresh();

      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Register(registerData);
      if (res) {
        setIsRegister(false);
      } else {
        console.log("Register failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2  flex justify-center items-center h-screen">
        
        <div className="bg-gray-100 p-6 rounded shadow-md" >

          { checkIsLogin && (
            <div className="w-full flex justify-center">
              <button
                onClick={logout}
                className="w-20 bg-red-500 hover:bg-red-700 text-white font-bold py-2   rounded focus:outline-none focus:shadow-outline"
              >
                Log Out
              </button>
            </div>
          )}

          {isRegister && (
            <div className="">
              <label htmlFor="name" className="block text-gray-700 font-bold ">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={registerData.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          )}
          <div className="">
            <label htmlFor="email" className="block text-gray-700 font-bold ">
              Phone
            </label>
            <input
              type="phone"
              id="phone"
              name="phone"
              value={isRegister ? registerData.phone :formData.phone}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="">
            <label htmlFor="password" className="block text-gray-700 font-bold ">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={isRegister ? registerData.password :formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {isRegister && (
            <div className="">
              <label htmlFor="confPassword" className="block text-gray-700 font-bold ">
                Confirm Password
              </label>
              <input
                type="password"
                id="confPassword"
                name="confPassword"
                value={registerData.confPassword}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          )}
          <div className="flex justify-between items-end">
            <button
              onClick={isRegister ? handleRegisterSubmit : handleSubmit}
              className="w-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  rounded focus:outline-none focus:shadow-outline"
            >
              {!isRegister ? "Login" : "Register"}
            </button>
            <div className="flex flex-col items-center">
              <label className="text-sm">{isRegister ? "have an account?" : "no account?"}</label>
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="bg-orange-500 w-20 hover:bg-orange-700 text-white font-bold py-2  rounded focus:outline-none focus:shadow-outline"
              >
                {isRegister ? "Login" : "Register"}
              </button>
            </div>

          </div>
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
