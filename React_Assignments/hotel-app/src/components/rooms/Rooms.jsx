import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Rooms = () => {
  let roomItems = useSelector((state) => state.get_rooms_data);
  const [allRooms, setRooms] = useState(roomItems);

  const [priceFilterRooms, setPriceFilterRooms] = useState(0);
  const [capacityFilterRooms, setCapacityFilterRooms] = useState("");
  const [typeFilterRooms, setTypeFilterRooms] = useState("");

  const searchFilterRooms = () => {
    let tempRooms = [...roomItems];
    if (typeFilterRooms) {
      tempRooms = tempRooms.filter((roomItem) => {
        return roomItem.type === typeFilterRooms;
      });
    }

    if (capacityFilterRooms) {
      tempRooms = tempRooms.filter((roomItem) => {
        return roomItem.capacity === parseInt(capacityFilterRooms);
      });
    }
    if (priceFilterRooms) {
      tempRooms = tempRooms.filter((roomItem) => {
        return roomItem.price >= parseInt(priceFilterRooms);
      });
    }
    setRooms(tempRooms);
  };

  useEffect(() => {
    searchFilterRooms();
  }, [typeFilterRooms, capacityFilterRooms, priceFilterRooms]);

  const ShowAllRooms = () => {
    setRooms(roomItems);
    setPriceFilterRooms(0);
    setCapacityFilterRooms("");
    setTypeFilterRooms("");
  };

  return (
    <>
      <div className="container">
        <p className="fw-bold text-center fs-4 mt-2">Search Your Rooms</p>

        <label className="form-label fw-bolder fs-5">
          Room Price Range - ( {priceFilterRooms}&#2547; )
        </label>
        <input
          type="range"
          className="form-range mb-4"
          id="customRange1"
          min="0"
          max="1000"
          value={priceFilterRooms}
          onChange={(e) => setPriceFilterRooms(e.target.value)}
        ></input>

        <select
          className="form-select form-select-lg mb-3"
          aria-label=".form-select-lg example"
          value={typeFilterRooms}
          onChange={(e) => setTypeFilterRooms(e.target.value)}
        >
          <option value="">Select Room Type -</option>
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="family">Family</option>
          <option value="presidential">Presidential</option>
        </select>

        <div className="d-flex justify-content-start mb-2">
          <select
            className="form-select form-select-lg me-3"
            aria-label=".form-select-lg example"
            value={capacityFilterRooms}
            style={{ width: "88%" }}
            onChange={(e) => setCapacityFilterRooms(e.target.value)}
          >
            <option value="">Select Room Capacity -</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            <option value="4">Four</option>
            <option value="5">Five</option>
            <option value="6">Six</option>
            <option value="7">Seven</option>
            <option value="8">Eigth</option>
            <option value="9">Nine</option>
            <option value="10">Ten</option>
          </select>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={ShowAllRooms}
          >
            Show All Rooms
          </button>
        </div>
      </div>
      {/* for all rooms */}
      <div className="container">
        <p className="fw-bold text-center fs-4 mt-2">All Rooms</p>
        <div className="row mt-2">
          {allRooms.map((room) => {
            return (
              <div className="col-sm-6 col-md-4" key={room.id}>
                <div className="card p-2 mt-1" style={{ width: "23rem" }}>
                  <img
                    src={room.images[0]}
                    className="card-img-top"
                    alt="Room-1"
                  />
                  <h5 className="card-title mt-1">
                    <span style={{ textTransform: "uppercase" }}>
                      {room.name}
                    </span>{" "}
                    &nbsp;
                    <span>| Price: {room.price}&#2547;</span>
                  </h5>
                  <Link
                    className="btn btn-warning btn-sm mt-1"
                    to={`/detailsroom/${room.id}`}
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

export default Rooms;
