import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../components/firebase-config";
import Loading from "../components/Loading";
import AuthContext from "../context/AuthContext";

export const Registration = ({ navigation }) => {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // console.log(email, password, username);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const handleLog = () => {
    navigation.navigate("Login");
  };

  const handleReg = async () => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        await updateProfile(auth.currentUser, { displayName: username });
        console.log(auth.currentUser);
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
      <Image
        style={styles.image}
        source={require("../../assets/finance.png")}
      />

      <Text style={styles.header}>- Registration Here -</Text>

      <View style={styles.errorMessage}>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Username"
          placeholderTextColor="#003f5c"
          onChangeText={(username) => setUsername(username)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={handleReg}>
        <Text style={styles.loginText}>Registration</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLog}>
        <Text style={styles.loginTextLog}>
          If you alreay have an account please
          <Text style={styles.RegText}> Login !</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};
