import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  appTitle: {
    fontSize: 21,
    fontWeight: "700",
    margin: 8,
    padding: 4,
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#52415e",
    borderRadius: 5,
  },
  searchBar: {
    width: "100%",
    paddingHorizontal: 8,
    marginBottom: 10,
  },

  cardRaw: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },

  cardCustom: {
    width: "48%",
    padding: 10,
    margin: "1%",
  },

  title: {
    marginTop: 3,
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    fontWeight: "bold",
  },

  photo: {
    resizeMode: "contain",
    width: "100%",
    aspectRatio: 3 / 4.5,
    alignSelf: "center",
  },

  category: {
    fontSize: 14,
    fontWeight: "bold",
    margin: 4,
    textAlign: "center",
    color: "#2cd18a",
  },

  // Details Book page styles
  DetailsBookContainer: {
    padding: 20,
    flex: 1,
  },
  bookImage: {
    width: "100%",
    aspectRatio: 333 / 499,
  },
  bookInfoContainer: {
    alignItems: "center",
    textAlign: "center",
    marginVertical: 10,
  },
  commentContainer: {
    marginVertical: 20,
  },
  boldLine: {
    width: "50%",
    alignItems: "center",
    borderBottomColor: "#2e2e2d",
    borderBottomWidth: 2,
  },
  btnOptionsView: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnSelf: {
    width: "80%",
    // padding: 10,
    // marginTop: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default styles;
