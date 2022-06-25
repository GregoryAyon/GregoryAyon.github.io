import { signOut } from "firebase/auth";
import React, { createContext, useState } from "react";
import { Alert } from "react-native";
import { auth } from "../config/firebase-config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // const handleLogout = (navigation) => {
  // 	Alert.alert('Sign Out?', 'Are you sure you want to sign out?', [
  // 		{
  // 			text: 'Cancel',
  // 			style: 'cancel',
  // 		},
  // 		{
  // 			text: 'OK',
  // 			onPress: () => {
  // 				signOut(auth);
  // 				navigation.replace('login');
  // 			},
  // 		},
  // 	]);
  // };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
