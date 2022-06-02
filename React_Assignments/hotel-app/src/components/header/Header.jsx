import React from "react";
import Logo from "../../images/hotel-logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../auth/firebase-config";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => {
    return state.getUser;
  });

  // console.log(user);

  const handleSignout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src={Logo}
              alt="hotel-logo"
              style={{ width: "100px", height: "30px" }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/rooms">
                  Rooms
                </Link>
              </li>
            </ul>

            {user ? (
              <div className="d-flex">
                <p className="text-muted me-2 mt-2">Hello, {user.email} </p>
                <button
                  className="btn btn-outline-danger"
                  onClick={handleSignout}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link className="btn btn-outline-info" to="/signin">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
