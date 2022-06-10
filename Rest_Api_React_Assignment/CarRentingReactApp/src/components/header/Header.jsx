import React, { useState, useEffect } from "react";
import Logo from "../../images/car-rent-logo-2.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [user, setUser] = useState("");
  const access = localStorage.getItem("access_token");
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();

  const handleSignout = () => {
    if (access && userId) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_id");

      navigate("/signin");
    } else navigate("/signin");
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
    getAuthUser();
  }, []);

  // console.log(user);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src={Logo}
              alt="hotel-logo"
              style={{ width: "100px", height: "32px", marginTop: "-10px" }}
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
                  to="/cars"
                >
                  Rent Cars
                </Link>
              </li>
              <li className="nav-item">
                {user.user_type === "owner" ? (
                  <Link className="nav-link" aria-current="page" to="/addcar">
                    Add Car
                  </Link>
                ) : (
                  ""
                )}
              </li>
            </ul>

            {user ? (
              <p className="text-muted me-2 mt-2">
                Hello, {user.email} - ({user.user_type})
              </p>
            ) : (
              ""
            )}

            {access && userId ? (
              <div className="d-flex">
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
