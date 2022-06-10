import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

const Signup = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerRole, setRegisterRole] = useState("");

  const navigate = useNavigate();

  const authData = {
    email: registerEmail,
    password: registerPassword,
    user_type: registerRole,
  };

  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    let userUrl = "https://carrent.excellentworld.xyz/api/user/";
    axios
      .post(userUrl, authData, header)
      .then((response) => {
        console.log(response.data);
        axios
          .post(
            "https://carrent.excellentworld.xyz/api/token",
            authData,
            header
          )
          .then((response) => {
            // console.log(response);
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
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div className="p-4 bg-info shadow-lg" style={{ height: "100vh" }}>
      <div className="row mt-5">
        <div className="col-12 col-sm-8 col-md-4 mx-auto card">
          <h1 className="text-center fw-bold">Sign Up</h1>
          <form
            className="m-2 border border-secondary rounded p-2"
            onSubmit={handleSignup}
          >
            <div className="form-outline mb-2">
              <input
                type="email"
                id="form2Example1"
                className="form-control"
                required
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
              <label className="form-label">Email address</label>
            </div>

            <select
              className="form-select mb-3"
              name="role"
              id=""
              required
              onChange={(e) => setRegisterRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="owner">Owner</option>
              <option value="client">Client</option>
            </select>

            <div className="form-outline mb-2">
              <input
                type="password"
                id="form2Example2"
                className="form-control"
                required
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
              <label className="form-label">
                Password (password minimum legnth 8)*
              </label>
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary ">
                Sign Up
              </button>
            </div>

            <div className="mt-1">
              <p>
                If you have an account then
                <Link to="/signin"> Sign In</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
