import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddCar = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("user_id");
    const formData = new FormData(e.target);
    formData.append("user", parseInt(userId));

    axios
      .post("https://carrent.excellentworld.xyz/api/cars/", formData, {
        header: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          toast.success("Your car added successfully!");
          e.target.reset();
        }
      })
      .catch((error) => {
        console.log(error);
        for (const [key, value] of Object.entries(error.response.data)) {
          toast.error(String(value));
        }
      });
  };
  return (
    <>
      <div className="container">
        <form className="card w-50 p-3 mt-3 mx-auto" onSubmit={handleSubmit}>
          <p className="fw-bold text-center fs-4 mt-2 bg-dark text-white">
            -Add Your Car-
          </p>
          <div className="mb-3 mt-3">
            <label className="form-label">Car Name:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter car name"
              name="car_name"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Brand:</label>
            <input
              type="text"
              className="form-control"
              id="brand"
              placeholder="Enter brand name"
              name="car_brand"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Rent Price:</label>
            <input
              type="number"
              className="form-control"
              id="price"
              placeholder="Enter daily rent price"
              name="daily_price"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Upload Car Image:</label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="car_image"
              required
            />
          </div>
          <button type="submit" className="btn btn-info">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCar;
