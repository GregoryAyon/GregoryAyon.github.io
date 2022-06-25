import { View, Text, Alert, Button } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/core";
import { Divider } from "react-native-paper";

import AuthContext from "../context/AuthContext";

import { signOut } from "firebase/auth";
import { auth } from "../config/firebase-config";

import styles from "../components/Styles";

const SideOptionScreen = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  const clickLogin = () => {
    navigation.navigate("Login");
  };

  const clickLogout = () => {
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

  const clickRegistration = () => {
    navigation.navigate("Registration");
  };
  return (
    <View style={{ marginTop: 70 }}>
      <Text style={styles.appTitle}>
        Hello, {user ? `${user.displayName}` : `Guest`}
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "400",
          textAlign: "center",
        }}
      >
        Welcome to Book Review App!
      </Text>
      {user ? (
        <Button
          style={{ padding: 10, margin: 10 }}
          onPress={clickLogout}
          title="Logout"
          color="#d4362a"
          accessibilityLabel="Learn more about this purple button"
        />
      ) : (
        <View style={styles.btnOptionsView}>
          <View style={{ marginTop: 10 }}>
            <Button
              style={styles.btnSelf}
              onPress={clickLogin}
              title="Login"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
          <Divider />
          <View>
            <Button
              style={styles.btnSelf}
              onPress={clickRegistration}
              title="Registration"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default SideOptionScreen;
