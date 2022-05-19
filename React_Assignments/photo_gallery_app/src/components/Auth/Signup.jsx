import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase-config";
import { useDispatch } from "react-redux";
import { user_auth } from "../../redux/actions";

const Signup = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (currentUser) => {
    dispatch(user_auth(currentUser));
  });

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      // console.log(user);
      if (user) {
        navigate("/gallery");
      }
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("Invalid Email Entered !!!");
      } else if (error.code === "auth/weak-password") {
        setError("Password should be at least 6 characters !!!");
      } else if (error.code === "auth/email-already-in-use") {
        setError("Account already exist !!!");
      } else if (error.code === "auth/internal-error") {
        setError("Username or Password Empty !!!");
      } else console.log(error);
    }
  };

  return (
    <div className="container p-4">
      <div className="row mt-5">
        <div className="col-12 col-sm-8 col-md-4 mx-auto card">
          <h1 className="text-center fw-bold mb-2">Sign Up</h1>
          <form>
            <div className="form-outline mb-4">
              <input
                type="email"
                id="form2Example1"
                className="form-control"
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
              <label className="form-label">Email address</label>
            </div>

            <div className="form-outline mb-2">
              <input
                type="password"
                id="form2Example2"
                className="form-control"
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
              <label className="form-label">
                Password (password minimum legnth 6)*
              </label>
            </div>

            <p style={{ color: "red" }}>{error ? error : ""}</p>

            <div className="d-grid gap-2">
              <button
                type="button"
                className="btn btn-primary "
                onClick={register}
              >
                Sign Up
              </button>
            </div>

            <div className="text-center mt-1">
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
