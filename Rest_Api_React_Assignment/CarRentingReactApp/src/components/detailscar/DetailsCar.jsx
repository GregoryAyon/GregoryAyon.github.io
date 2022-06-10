import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import EmptyList from "../emptylist/index";
import moment from "moment";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const DetailsCar = () => {
  const { id } = useParams();
  const [carDetails, setCardetails] = useState("");
  const [date, setDate] = useState("");
  const [user, setUser] = useState("");
  // console.log(typeof id);

  const getCarDetails = () => {
    axios
      .get(`https://carrent.excellentworld.xyz/api/cars/${parseInt(id)}`)
      .then((res) => {
        const cars = res.data;
        setCardetails(cars);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getAuthUser = async () => {
    const token = localStorage.getItem("access_token");
    const userId = localStorage.getItem("user_id");
    const authHeader = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    if (token && userId) {
      await axios
        .get(
          `https://carrent.excellentworld.xyz/api/user/${userId}`,
          authHeader
        )
        .then((response) => {
          setUser(response.data);
        });
    }
  };

  useEffect(() => {
    getCarDetails();
    getAuthUser();
  }, []);

  // console.log(carDetails);
  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("user_id");
    const currentDate = moment().startOf("day");
    const rentedDate = moment(date);

    var diffDays = moment.duration(rentedDate.diff(currentDate)).asDays();
    if (diffDays > 0) {
      const formData = new FormData(e.target);
      formData.append("car", parseInt(id));
      formData.append("user", parseInt(userId));
      axios
        .post("https://carrent.excellentworld.xyz/api/book/", formData, {
          header: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            toast.success("Your car booked is successful!");
            e.target.reset();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      toast.error("Can not book a car on the same or previous date!");
    }
  };

  return (
    <>
      <div className="container mb-5">
        <p className="fw-bold text-center fs-4 mt-2 bg-dark text-white rounded">
          -Car Details-
        </p>
        <div className="row">
          <div className="col-6">
            {carDetails ? (
              <div className="card">
                <img
                  src={carDetails.car_image}
                  className="card-img-top"
                  alt="car-image"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    Car Name: {carDetails.car_name}
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Brand: {carDetails.car_brand} &nbsp;|&nbsp; Daily Rent
                    Price: {carDetails.daily_price}&#2547;
                  </h6>
                </div>
              </div>
            ) : (
              <EmptyList />
            )}
          </div>
          <div className="col-6">
            {user ? (
              user.user_type === "client" ? (
                <form className="card w-100 p-3" onSubmit={handleSubmit}>
                  <p className="fw-bold text-center fs-4 bg-dark text-white">
                    -Rent Car Booking-
                  </p>
                  <div className="mb-3 mt-3">
                    <label className="form-label">Email:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Enter email"
                      name="b_email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      placeholder="Enter phone number"
                      name="phone"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Renting Date:</label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      placeholder="Enter date"
                      name="book_date"
                      required
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-info">
                    Book Now
                  </button>
                </form>
              ) : (
                <div class="alert alert-warning" role="alert">
                  Owner can not book a car! If you want to book a car please
                  create client accout.
                </div>
              )
            ) : (
              <div class="alert alert-warning" role="alert">
                Whithout account you can't rent a car. Please{" "}
                <Link to="/signin">Signin</Link> or{" "}
                <Link to="/signup">Signup</Link>!
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsCar;
