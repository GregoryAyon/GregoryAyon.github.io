import React, { useContext } from "react";
import { View, Text, Button, Alert } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../components/firebase-config";
import { useNavigation } from "@react-navigation/core";
import { styles } from "./styles";
import AuthContext from "../context/AuthContext";

export const Header = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  const handleLognout = async () => {
    Alert.alert("Sign Out?", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          signOut(auth);
          navigation.replace("Login");
        },
      },
    ]);
  };

  return (
    <View style={[styles.transView, styles.header]}>
      <Text style={[styles.titleStyle, styles.h2]}>
        Hello, {user.displayName} | Finance-App
      </Text>
      <Text>
        <Button
          onPress={handleLognout}
          title="Logout"
          color="#f52525"
          accessibilityLabel="Learn more about this purple button"
        />
      </Text>
    </View>
  );
};
