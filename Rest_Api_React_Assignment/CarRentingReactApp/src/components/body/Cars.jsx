import React, { useState, useEffect } from "react";
import axios from "axios";
import EmptyList from "../emptylist/index";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Cars = () => {
  const [carsData, setCarsData] = useState("");
  const [searchData, setSearchData] = useState("");

  const getCarsResponse = () => {
    axios
      .get(`https://carrent.excellentworld.xyz/api/cars/`)
      .then((res) => {
        const cars = res.data;
        setCarsData(cars);
      })
      .catch((e) => {
        console.log(e);
        toast.error("API Bad Request!");
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get(`https://carrent.excellentworld.xyz/api/cars/?search=${searchData}`)
      .then((res) => {
        const cars = res.data;
        setCarsData(cars);
      })
      .catch((e) => {
        console.log(e);
        toast.error("API Bad Request!");
      });
  };

  useEffect(() => {
    getCarsResponse();
  }, []);

  // console.log(carsData);

  return (
    <div>
      <div className="container mb-4">
        <p className="fw-bold text-center fs-4 mt-2">-All Cars-</p>
        <form className="d-flex" onSubmit={handleSearch}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search cars by name, brand, price"
            aria-label="Search"
            onChange={(e) => setSearchData(e.target.value)}
          />
          <button className="btn btn-outline-info" type="submit">
            Search
          </button>
        </form>
        <div className="row mt-2 ">
          {/* start  */}
          {carsData ? (
            carsData.map((car) => {
              return (
                <div className="col-md-3 col-sm-6 mb-2" key={Math.random()}>
                  <div className="card h-100">
                    <img
                      className="mx-auto img-thumbnail"
                      src={car.car_image}
                      style={{
                        width: "auto",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="card-body text-center mx-auto">
                      <div className="cvp">
                        <h5 className="card-title font-weight-bold">
                          {car.car_name}
                        </h5>
                        <p className="card-text">
                          Rent: {car.daily_price} &#2547;
                        </p>
                        <Link
                          to={`/detailscar/${car.id}`}
                          className="btn btn-dark text-white details px-auto"
                        >
                          view details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <EmptyList />
          )}
          {/* end  */}
        </div>
      </div>
    </div>
  );
};

export default Cars;
