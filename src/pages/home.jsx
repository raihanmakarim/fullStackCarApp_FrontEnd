import React,{ useState,useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import HeroSlider from "../components/HeroSlider";
import { getCars } from "../api/carAction";
import CarCard from "../components/CarCard";
// import {
//   Container, Row, Col 
// } from "reactstrap";

const Home = () => {
  const [ cars, setCars ] = useState([]);
  const [ searchValues, setSearchValues ] = useState({
    page: 1,
    pageSize: 10,
    search: "",
    minPrice: 0,
    maxPrice: 100000000000,

  });

  const fetchCars = async () => {
    try {
      const page = searchValues.page;
      const pageSize = searchValues.pageSize;
      const search = searchValues.search;
      const minPrice = searchValues.minPrice;
      const maxPrice = searchValues.maxPrice;

      const data = await getCars(page, pageSize, search, minPrice, maxPrice);
      setCars(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handlePriceChange = (value) => {
    setSearchValues((prevValues) => ({
      ...prevValues,
      minPrice: value[0],
      maxPrice: value[1],
    }));
  };








  useEffect(() => {
    fetchCars();
  }, [ ]);

  const handleSearch = async () => {
    try {
      const data = await getCars(
        searchValues.page,
        searchValues.pageSize,
        searchValues.search,
        searchValues.minPrice,
        searchValues.maxPrice
      );
      setCars(data);
    } catch (error) {
      console.error(error);
    }
  };



  return(
    <div className="-mt-8 mb-24">

      <HeroSlider />
      <div className=' px-16 py-8 h-max w-1/2 m-auto shadow-md bg-white my-8'>

        <div className="bg-secondary rounded p-4">
          <div className="mb-4">
            <label htmlFor="search" className="block  mb-2">
              Search:
            </label>
            <input
              type="text"
              id="search"
              name="search"
              value={searchValues.search}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded bg-gray-200 text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block  mb-2">Price Range:</label>
            <Slider
              range
              min={0}
              max={1000000000}
              value={[ searchValues.minPrice, searchValues.maxPrice ]}
              onChange={handlePriceChange}
            />
            <div className="flex justify-between">
              <span className="text-red-500">{searchValues.minPrice}</span>
              <span className="text-red-500">{searchValues.maxPrice}</span>
            </div>
          </div>
          <button
            className="bg-tertiary text-red-500 px-4 py-2 rounded"
            onClick={handleSearch}
          >
            Search Cars
          </button>
        </div>
      </div>
      <div className="flex justify-center w-full ">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
          {cars.length > 0 && cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>

      {/* <div className="hero__form">
        <Container>
          <Row className="form__row">
            <Col lg="4" md="4">
              <div className="find__cars-left">
                <h2>Find your best car here</h2>
              </div>
            </Col>

            <Col lg="8" md="8" sm="12">
              <FindCarForm />
            </Col>
          </Row>
        </Container>
      </div> */}
   

    </div>
  )};

export default Home;
