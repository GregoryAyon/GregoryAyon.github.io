import { useNavigation } from "@react-navigation/core";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

import React, { useContext, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../config/firebase-config";
import AuthContext from "../context/AuthContext";
import Loading from "../Loading/Loading";

const LoginScreen = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        navigation.replace("Main");
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        // console.log('Logged in with:', user);
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          setError("Invalid Email Entered !!!");
        } else if (error.code === "auth/user-not-found") {
          setError("Email not found !!!");
        } else if (error.code === "auth/wrong-password") {
          setError("Wrong Password Entered !!!");
        } else if (error.code === "auth/internal-error") {
          setError("Username or Password Empty !!!");
        } else console.log(error);
      });
    setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hello again,{"\n"}Welcome back.</Text>
      <View style={styles.errorMessage}>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>
      <View style={styles.form}>
        <View>
          <Text style={styles.inputTitle}>Email Address</Text>
          <TextInput
            placeholder=""
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
        </View>
        <View style={{ marginTop: 24 }}>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            placeholder=""
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>
      </View>
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignSelf: "center", marginTop: 32 }}
        onPress={() => navigation.navigate("Registration")}
      >
        <Text style={{ fontSize: 14, color: "#414959" }}>
          New in App?{" "}
          <Text style={{ fontWeight: "600", color: "#0782F9" }}>
            Registration
          </Text>
        </Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}></View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  greeting: {
    marginTop: 32,
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  error: {
    color: "#ff1717",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
    width: "100%",
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    borderRadius: 4,
    alignItems: "center",
    height: 48,
    marginHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
});
