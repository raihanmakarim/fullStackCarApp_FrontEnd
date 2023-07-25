import React,{ useState,useEffect } from "react";
import "rc-slider/assets/index.css";
import { getCarByUserId } from "../api/carAction";
import EditableCarCard from "../components/EditableCarCard ";
import "../styles/user-car-page.css"
import { getUserId } from "../config/api";

const ScreenWidth = window.innerWidth;

const isMobile = ScreenWidth <= 500;

const UserCar = () => {
  const [ cars, setCars ] = useState([]);
  
  const userId = getUserId();

  const fetchCars = async () => {
    try {
      

      const data = await getCarByUserId(userId);
      setCars(data);
    } catch (error) {
      console.error(error);
    }
  };




  useEffect(() => {
    fetchCars();
  }, [ ]);

  



  return(
    <div className={` ${isMobile ? "" : " mt-8 mb-24 py-20"} user-car-page`}>

      <div >
        <h1 className='text-4xl font-bold'>Add New Car</h1>

        <EditableCarCard fetchCars={fetchCars} />
      </div>

      <div >
        <h1 className='text-4xl font-bold'>Your Cars</h1>
        <div className="flex flex-col justify-center w-full ">
          {cars.length > 0 && cars.map((car) => (
            <EditableCarCard key={car.id} car={car} fetchCars={fetchCars} />
          ))}
        </div>
      </div>
     

     
   

    </div>
  )};

export default UserCar;
