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
    setupAuthInterceptor();

    const response = await API.post("/cars/create", carData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(`Error fetching car ${error.msg}`);
  }
};

export const updateCar = async (id, carData) => {
  try {
    setupAuthInterceptor();

    const response = await API.patch(`/cars/update/${id}`, carData);

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(`Error fetching car ${error.msg}`);
  }
};

export const getCarById = async (id) => {
  try {
    const response = await API.get(`/cars/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(`Error fetching car ${error.msg}`);
  }
};

export const getCarByUserId = async (id) => {
  try {
    setupAuthInterceptor();

    const response = await API.get(`/cars/user/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(`Error fetching car ${error.msg}`);
  }
};

export const deleteCar = async (id) => {
  try {
    const response = await API.delete(`/cars/delete/${id}`);
    setupAuthInterceptor();
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(`Error fetching car ${error.msg}`);
  }
};

export const getPromoCars = async () => {
  try {
    const response = await API.get("/cars/promo");
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(`Error fetching car ${error.msg}`);
  }
};
