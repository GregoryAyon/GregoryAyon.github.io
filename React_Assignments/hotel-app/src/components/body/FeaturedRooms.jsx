import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const FeaturedRooms = () => {
  const rooms = useSelector((state) => state.get_rooms_data);
  let featuredRooms = rooms.filter((room) => room.featured === true);

  return (
    <>
      <div className="container">
        <p className="fw-bold text-center fs-4 mt-2">Featured Rooms</p>
        <div className="row mt-2">
          {featuredRooms.map((froom) => {
            return (
              <div className="col-sm-6 col-md-4" key={froom.id}>
                <div className="card p-2" style={{ width: "23rem" }}>
                  <img
                    src={froom.images[0]}
                    className="card-img-top"
                    alt="Room-1"
                  />
                  <h5 className="card-title mt-1">
                    <span>Name: {froom.name}</span> | &nbsp;
                    <span>Price: {froom.price} BDT</span>
                  </h5>
                  <Link
                    className="btn btn-warning btn-sm mt-1"
                    to={`/detailsroom/${froom.id}`}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default FeaturedRooms;
