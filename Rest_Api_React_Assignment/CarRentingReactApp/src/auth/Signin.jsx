import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

const Signin = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const navigate = useNavigate();

  const authData = {
    email: loginEmail,
    password: loginPassword,
  };

  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let carurl = "https://carrent.excellentworld.xyz/api/token";
    axios
      .post(carurl, authData, header)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          const token = response.data.access;
          const authDecoded = jwtDecode(token);
          localStorage.setItem("access_token", token);
          localStorage.setItem("user_id", authDecoded.user_id);
          navigate("/");
        }
      })
      .catch((error) => {
        // console.log(error.response.data);
        for (const [key, value] of Object.entries(error.response.data)) {
          toast.error(String(value));
        }
      });
  };

  return (
    <div className="p-4 bg-info" style={{ height: "100vh" }}>
      <div className="row mt-5">
        <div className="col-12 col-sm-8 col-md-4 mx-auto card">
          <h1 className="text-center fw-bold mb-2">Sign In</h1>
          <form
            className="m-2 border border-secondary rounded p-2"
            onSubmit={handleLogin}
          >
            <div className="form-outline mb-4">
              <input
                type="email"
                id="form2Example1"
                className="form-control"
                required
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <label className="form-label">Email address</label>
            </div>
            <div className="form-outline mb-2">
              <input
                type="password"
                id="form2Example2"
                className="form-control"
                required
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <label className="form-label">Password</label>
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary ">
                Sign in
              </button>
            </div>
            <div className="mt-1">
              <p>
                Not an account? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
