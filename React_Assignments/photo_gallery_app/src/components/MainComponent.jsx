import React, { useEffect } from "react";
import Header from "./header/Header";
import Body from "./body/Body";
import Footer from "./footer/Footer";
import { useDispatch } from "react-redux";
import { user_auth } from "../redux/actions";
import { auth } from "../components/Auth/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

const MainComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      dispatch(user_auth(currentUser));
    });
  }, []);

  return (
    <div>
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

export default MainComponent;
