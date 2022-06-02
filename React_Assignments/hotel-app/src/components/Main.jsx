import React, { useEffect } from "react";
import Header from "./header/Header";
import Body from "./body/Body";
import { Route, Routes } from "react-router-dom";
import DetailsRoom from "./detailsroom/DetailsRoom";
import Rooms from "./rooms/Rooms";
import Footer from "./footer/Footer";
import { auth } from "./auth/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { user_auth } from "../redux/actions/index";
import { useDispatch } from "react-redux";

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      dispatch(user_auth(currentUser));
    });
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" exact element={<Body />} />
        <Route path="/home" exact element={<Body />} />
        <Route path="/rooms" exact element={<Rooms />} />
        <Route path="/detailsroom/:id" exact element={<DetailsRoom />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Main;
