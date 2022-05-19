import React from "react";
import Gallery from "./Gallery";
import GalleryItem from "./GalleryItem";
import Signin from "../Auth/Signin";
import Signup from "../Auth/Signup";
import { Route, Routes } from "react-router-dom";

const Body = () => {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Gallery />} />
        <Route path="/gallery" exact element={<Gallery />} />
        <Route path="/GalleryItem/:id" exact element={<GalleryItem />} />
        <Route path="/signin" exact element={<Signin />} />
        <Route path="/signup" exact element={<Signup />} />
      </Routes>
    </div>
  );
};

export default Body;
