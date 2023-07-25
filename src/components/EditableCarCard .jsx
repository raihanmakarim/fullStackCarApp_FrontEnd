import React, { useEffect, useState } from 'react';
import {
  createCar, deleteCar, updateCar 
} from '../api/carAction';
import { getUserId } from '../config/api';
import Swal from 'sweetalert2';

const ScreenWidth = window.innerWidth;

const isMobile = ScreenWidth <= 500;

const EditableCarCard = ({ car, fetchCars }) => {
  const userId = getUserId();
 
  const [ previewImage, setPreviewImage ] = useState(null);
  const [ carData, setCarData ] = useState({
    user_id: userId,
    address: '',
    car_name: '',
    car_picture: null ,
    description: '',
    mileage: '',
    price: '',
    promotion_end_date: '',
  });

  useEffect(() => {
    if (car) {
      setCarData(car);
      setPreviewImage(car.car_picture);
      setCarData((prevData) => ({ ...prevData, user_id: userId }));
      setCarData((prevData) => ({ ...prevData, car_picture: null }));

    }
  }, [ ]);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setCarData((prevData) => ({ ...prevData, [name]: value }));
    
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCarData((prevData) => ({ ...prevData, car_picture: file }));
    setPreviewImage(URL.createObjectURL(file));
  }

  const handleEditSave = async () => {
    const requiredFields = {
      car_name: 'Car Name',
      description: 'Description',
      mileage: 'Mileage',
      price: 'Price',
      promotion_end_date: 'Promotion End Date',
    };

    const missingField = Object.keys(requiredFields).find(
      (field) => !carData[field]
    );

    if (missingField) {
      const missingFieldName = requiredFields[missingField];
      Swal.fire('Error', `Please fill in the required field: ${missingFieldName}`, 'error');
      return;
    }

    const formData = new FormData();
    for (const key in carData) {
      formData.append(key, carData[key]);
    }

    try {
      if (car) {
        await updateCar(car.id, formData);
        Swal.fire('Success', 'Car updated successfully', 'success');
        fetchCars();
      } else {
        await createCar(formData);
        Swal.fire('Success', 'Car created successfully', 'success');
        setCarData({
          user_id: userId,
          address: '',
          car_name: '',
          car_picture: null,
          description: '',
          mileage: '',
          price: '',
          promotion_end_date: '',
        });
        setPreviewImage(null);
        fetchCars();

      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', `Failed to save car ${error.msg}`, 'error');
    }
  };


  const handleDelete = async (id) => {
    try {
      await deleteCar(id);
      Swal.fire('Success', 'Car deleted successfully', 'success');
      fetchCars();

    } catch (error) {
      Swal.fire('Error', `Failed to delete car ${error}` , 'error');
    }
  };

   

 

  return (
    <div
      className={`relative h-max  ${isMobile ? "w-max px-4 flex-col my-8  " : "w-max m-4   "}  rounded-md  shadow-lg transition-transform flex   justify-end  bg-white`}
    >
      <div className={`relative w-40 ${isMobile ? "h-40  " : " "}    cursor-pointer`}>
        { previewImage &&(
          <div className="absolute opacity-80 h-20 w-20 flex items-center  text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-500 rounded-full py-2 px-4 text-white font-bold">
            Change Image
          </div>    
        )}
           
        <input
          type="file"
          name="car_picture"
          id="car_picture"
          accept="image/*"
          className="object-cover absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleImageChange}
        />
        {previewImage ? (
          <img
            src={previewImage ? previewImage : carData.car_picture}
            alt="Car"
            className="object-cover w-full h-full"
          />
        ) : (
          <p className="text-gray-600 text-center w-full h-full flex items-center justify-center">
            Click to Upload Image
          </p>
        )}
      </div>  

      <div className={` ${isMobile ? "w-52 flex-col  " : " "} p-2 w-96   h-max`}>
        <div >
          <div className='flex flex-col'>
            <div className='flex flex-col'>
              <label>Name</label>
              <input
                className="bg-gray-100 rounded-sm px-2 text-lg font-semibold mb-2 border-b focus:outline-none"
                type="text"
                name="car_name"
                value={carData.car_name}
                onChange={handleInputChange}
              />
            </div>

            <div className='flex flex-col'>
              <label>Description</label>
              <textarea
                className="bg-gray-100 rounded-sm px-2 h-20 overflow-hidden text-sm resize-none mb-2 border-b focus:outline-none"
                name="description"
                value={carData.description}
                onChange={handleInputChange}
              />
            </div>
          </div>


          <div className={` ${isMobile ? "w-52 flex-col  " : " "} w-full flex gap-4`}>
            <div className=' w-full flex flex-col'>
              <label> Mileage</label>
              <input
                className=" w-full font-semibold bg-gray-100 rounded-sm px-2 focus:outline-none"
                type="text"
                name="mileage"
                value={carData.mileage}
                onChange={handleInputChange}
              />
            </div>

            <div className='w-full flex flex-col '>
              <label> Price</label>
              <input
                className=" w-full font-semibold bg-gray-100 rounded-sm px-2 focus:outline-none"
                type="text"
                name="price"
                value={carData.price}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className={` ${isMobile ? "w-52 flex-col  " : " "} w-full flex gap-4`}>
            <div className="w-full">
              <label >Promotion End Date</label>
              <input
                type="date"
                name="promotion_end_date"
                value={carData.promotion_end_date}
                onChange={handleInputChange}
                className="w-full font-semibold bg-gray-100 rounded-sm px-2 focus:outline-none"
              />
            </div>
            <div className="w-full">
              <label >Address</label>
              <input
                type="text"
                name="address"
                value={carData.address}
                onChange={handleInputChange}
                className="w-full font-semibold bg-gray-100 rounded-sm px-2 focus:outline-none"
              />
            </div>
          </div>
        
        </div>
      
        {!car ? (
          <div className="flex justify-end  mt-2">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
              onClick={handleEditSave}
            >
              Add Car
            </button>
          </div>

        ): (
          <div className="flex justify-end  mt-2">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
              onClick={handleEditSave}
            >
              Save Edit
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md"
              onClick={() =>handleDelete(car.id)}
            >
              Delete
            </button>
          </div>
        )}
      
      </div>
    </div>
  );
};

export default EditableCarCard;
