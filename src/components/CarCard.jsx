import React from "react";

const CarCard = ({ car }) => (
  <div className="relative w-48 h-64 rounded-md overflow-hidden shadow-lg transition-transform hover:scale-105 hover:h-80 ease-in-out  ">
    <div
      className="w-full h-36 bg-cover bg-center"
      style={{ backgroundImage: `url(${car?.car_picture})` }}
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">{car.car_name}</h3>
     
      <p className="h-12 overflow-hidden text-sm">{car.description}</p>
      
    </div>
    <p>
      <span className="font-semibold">Mileage:</span> {car.mileage}
    </p>
    <p>
      <span className="font-semibold">Price:</span> {car.price}
    </p>
  </div>
);

export default CarCard;
