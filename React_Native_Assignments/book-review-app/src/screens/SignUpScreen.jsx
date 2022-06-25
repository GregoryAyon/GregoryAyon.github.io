// import { useNavigation } from "@react-navigation/core";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

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

const SignUpScreen = ({ navigation }) => {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        navigation.replace("Main");
      }
    });
    return unsubscribe;
  }, []);

  const handleSignUp = async () => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        const user = userCredentials.user;
        await updateProfile(auth.currentUser, { displayName: username });
        setUser({ ...auth.currentUser, displayName: username });
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          setError("Invalid Email Entered !!!");
        } else if (error.code === "auth/weak-password") {
          setError("Password should be at least 6 characters !!!");
        } else if (error.code === "auth/email-already-in-use") {
          setError("Account already exist !!!");
        } else if (error.code === "auth/internal-error") {
          setError("Username or Password Empty !!!");
        } else alert(error);
      });
    setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Hello,{"\n"}Registration to get started.
      </Text>
      <View style={styles.errorMessage}>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>
      <View style={styles.form}>
        <View>
          <Text style={styles.inputTitle}>Username</Text>
          <TextInput
            placeholder=""
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.input}
          />
        </View>
        <View style={{ marginTop: 24 }}>
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
      <TouchableOpacity onPress={handleSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Registration</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignSelf: "center", marginTop: 32 }}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={{ fontSize: 14, color: "#414959" }}>
          Already has an account in App?{" "}
          <Text style={{ fontWeight: "600", color: "#0782F9" }}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

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
