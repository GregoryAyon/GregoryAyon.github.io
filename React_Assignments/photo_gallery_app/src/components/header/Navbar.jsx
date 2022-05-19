import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Auth/firebase-config";

const Navbar = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => {
    return state.getUser;
  });

  const signout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container">
          <Link className="navbar-brand fw-bold text-white" to="/">
            Photo-Gallery-App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav btn-hover">
              <Link
                className="nav-link active text-white"
                aria-current="page"
                to="/gallery"
              >
                Gallery
              </Link>
            </div>
          </div>

          <div className=" d-flex">
            {user ? (
              <button className="btn btn-outline-success" onClick={signout}>
                Sign Out
              </button>
            ) : (
              <Link className="btn btn-outline-success" to="/signin">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
