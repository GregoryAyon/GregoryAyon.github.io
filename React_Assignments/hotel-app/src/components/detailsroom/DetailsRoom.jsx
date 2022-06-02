import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import EmptyList from "../emptylist";
import { useSelector } from "react-redux";
import { db } from "../auth/firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import Modal from "bootstrap/js/dist/modal";

const DetailsRoom = () => {
  const { id } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomInfo, setRoomInfo] = useState(0);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const userRoomBookTable = collection(db, "roomBookTable");

  let rooms = useSelector((state) => state.get_rooms_data);

  const user = useSelector((state) => {
    return state.getUser;
  });

  const handleRoomBookSubmit = (e) => {
    e.preventDefault();
    console.log("bvhjcwbhb");
    addDoc(userRoomBookTable, {
      roomID: id,
      name: name,
      phone: phone,
      address: address,
      city: city,
    });
    var bookedModal = new Modal(document.getElementById("roomBookedModal"));
    bookedModal.show();
    setName("");
    setPhone("");
    setAddress("");
    setCity("");
    roomBookedInfo();
  };

  // Rooms Booked Info
  const roomBookedInfo = async () => {
    const roomData = await getDocs(userRoomBookTable);
    const getRoomBookedInfo = roomData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const getBookedRoomData = getRoomBookedInfo.filter((item) => {
      return item.roomID === id;
    });
    let roomBookedNumber = getBookedRoomData.length;
    setRoomInfo(roomBookedNumber);
  };

  useEffect(() => {
    let roomItemDetails = rooms.find((room) => {
      return room.id === id;
    });
    if (roomItemDetails) {
      setRoomDetails(roomItemDetails);
    }
    roomBookedInfo();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <Link className="my-1 btn btn-dark btn-sm" to="/">
          <span> &#8592;</span> <span>Go Back</span>
        </Link>
        {roomDetails ? (
          <div className="row">
            <div className="col-sm-7 col-md-7">
              <div
                className="card p-2 shadow-lg"
                style={{ height: "100vh", overflow: "scroll" }}
              >
                <div
                  id="carouselExampleIndicators"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    {roomDetails.images.map((image, index) => {
                      if (index === 0) {
                        const active = (
                          <div
                            className="carousel-item active"
                            key={Math.random()}
                          >
                            <img
                              src={image}
                              className="d-block w-100"
                              alt="ROOMIMAGE"
                            />
                          </div>
                        );
                        return active;
                      } else {
                        const nonactive = (
                          <div className="carousel-item" key={Math.random()}>
                            <img
                              src={image}
                              className="d-block w-100"
                              alt="ROOMIMAGE"
                            />
                          </div>
                        );
                        return nonactive;
                      }
                    })}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>

                <div className="card-body">
                  <h5 className="card-title">Name: {roomDetails.name}</h5>{" "}
                  <hr />
                  <h6 className="card-subtitle mb-2 text-muted border border-secondary rounded">
                    <ul className="list-group list-group-horizontal">
                      <li className="list-group-item">
                        Room Type: {roomDetails.type}
                      </li>
                      <li className="list-group-item">
                        Price: {roomDetails.price}
                      </li>
                      <li className="list-group-item">
                        Size: {roomDetails.size}
                      </li>
                      <li className="list-group-item">
                        capacity: {roomDetails.capacity}
                      </li>
                    </ul>
                  </h6>
                  <p className="card-text">{roomDetails.description}</p> <hr />
                  -Notice:
                  <div className="alert alert-warning" role="alert">
                    {roomDetails.pets === false ? (
                      <p>Pets are not allowed!</p>
                    ) : (
                      <p>Pets are allowed!</p>
                    )}
                  </div>
                  <div className="alert alert-warning" role="alert">
                    {roomDetails.breakfast === false ? (
                      <p>Breakfast is not free!</p>
                    ) : (
                      <p>Breakfast is free!</p>
                    )}
                  </div>
                  <hr />
                  <h6 className="card-subtitle mb-2 text-muted ">
                    Extra Info:{" "}
                  </h6>
                  <ul className="list-group">
                    {roomDetails.extras.map((eItem) => {
                      return (
                        <li
                          className="list-group-item disabled"
                          aria-disabled="true"
                          key={Math.random()}
                        >
                          {eItem}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-sm-5 col-md-5 border p-2">
              <div className="alert alert-info mb-2 fw-bold" role="alert">
                Total Rooms: 5 | Available Rooms: {5 - roomInfo} | Booked:{" "}
                {roomInfo}
              </div>
              {user ? (
                roomInfo >= 5 ? (
                  <>
                    <div className="alert alert-warning" role="alert">
                      Currently no room available at this moment! Please find
                      another{" "}
                      <Link className="link-info me-2" to="/rooms">
                        Rooms
                      </Link>{" "}
                      or try again later.
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="bg-secondary p-2 rounded text-white text-center">
                      Room Booking
                    </h2>
                    <form
                      className="row g-3 mt-2"
                      onSubmit={(e) => handleRoomBookSubmit(e)}
                    >
                      <div className="col-md-6">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputEmail4"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Phone</label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputPassword4"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputAddress"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">City / Town</label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputCity"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-info">
                          Book Now
                        </button>
                      </div>
                    </form>
                  </>
                )
              ) : (
                <div className="alert alert-warning" role="alert">
                  If you want to book your room please
                  <Link className="link-info me-2" to="/signin">
                    Sign In
                  </Link>
                  or
                  <Link className="link-info ms-2" to="/signup">
                    Sign up
                  </Link>
                  !
                </div>
              )}
            </div>

            <div className="modal" id="roomBookedModal">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      - Room Booking Confirmation -
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p className="fw-bold">Your room booked successfully!</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <EmptyList />
        )}
      </div>
    </>
  );
};

export default DetailsRoom;
