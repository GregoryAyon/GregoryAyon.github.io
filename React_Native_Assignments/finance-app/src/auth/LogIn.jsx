import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import AuthContext from "../context/AuthContext";
import { auth } from "../components/firebase-config";
import Loading from "../components/Loading";

export const LogIn = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // console.log(email, password);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        // console.log("Logged in with:", user);
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
    // navigation.navigate("Home");
  };

  const handleReg = () => {
    navigation.navigate("Registration");
  };

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/finance.png")}
      />

      <Text style={styles.header}>- Login Here -</Text>

      <View style={styles.errorMessage}>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>

      <StatusBar style="auto" />
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

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleReg}>
        <Text style={styles.loginTextLog}>
          If you are new here please
          <Text style={styles.RegText}> Registration !</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};
