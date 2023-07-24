import { API } from "../config/api";
import { setupAuthInterceptor } from "../config/api";
export const getCars = async (page, pageSize, search, minPrice, maxPrice) => {
  try {
    const response = await API.get("/cars", {
      params: {
        page,
        pageSize,
        search,
        minPrice,
        maxPrice,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching cars");
  }
};

export const createCar = async (carData) => {
  try {
    const response = await API.post("/cars/create", carData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create car");
  }
};

export const updateCar = async (id, carData) => {
  try {
    const response = await API.patch(`/cars/update/${id}`, carData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update car");
  }
};

export const getCarById = async (id) => {
  try {
    const response = await API.get(`/cars/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching car");
  }
};

export const deleteCar = async (id) => {
  try {
    const response = await API.delete(`/cars/delete/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete car");
  }
};

export const getPromoCars = async () => {
  try {
    const response = await API.get("/cars/promo");
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching promo cars");
  }
};
