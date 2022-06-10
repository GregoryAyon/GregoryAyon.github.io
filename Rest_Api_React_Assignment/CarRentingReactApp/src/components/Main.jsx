import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Body from "./body/Body";
import AddCar from "./addcar/AddCar";
import DetailsCar from "./detailscar/DetailsCar";

const Main = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" exact element={<Body />} />
        <Route path="/cars" exact element={<Body />} />
        <Route path="/addcar" exact element={<AddCar />} />
        <Route path="/detailscar/:id" exact element={<DetailsCar />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Main;
