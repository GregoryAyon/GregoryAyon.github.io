import "./App.css";
import Main from "./components/Main";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/*" exact element={<Main />} />
          <Route path="/signin" exact element={<Signin />} />
          <Route path="/signup" exact element={<Signup />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
