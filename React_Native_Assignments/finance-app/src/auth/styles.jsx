import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // backgroundColor: "red",
    alignItems: "center",
    // justifyContent: "center",
  },

  image: {
    marginTop: 50,
    marginBottom: 10,
  },

  header: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "900",
  },

  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "80%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    // marginLeft: 20,
  },

  loginBtn: {
    width: "50%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#FF1493",
  },

  RegText: {
    fontWeight: "700",
    color: "#0000FF",
    borderBottomColor: "black",
  },

  loginTextLog: {
    marginTop: 10,
    fontWeight: "400",
  },

  errorMessage: {
    marginBottom: 5,
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
});
