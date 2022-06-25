import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styles from "./Styles";
import { useNavigation } from "@react-navigation/core";
import { TextInput, List, Divider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AuthContext from "../context/AuthContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import CommentContext from "../context/CommentContext";
import { useIsFocused } from "@react-navigation/native";

import { BooksList } from "../config/data";

const BookDetails = ({ route }) => {
  const navigation = useNavigation();
  const [book, setBook] = useState({});
  const [comment, setComment] = useState("");

  const { user } = useContext(AuthContext);
  const { comments, getComments } = useContext(CommentContext);

  const isFocused = useIsFocused();

  const { bookId } = route.params;
  // console.log(bookId);

  // console.log(user.displayName);

  useEffect(() => {
    let bookDetail = BooksList.find((bookDetail) => {
      return bookDetail.id === bookId;
    });

    if (bookDetail) {
      setBook(bookDetail);
    }
    getComments(bookId);
  }, [isFocused]);

  //   console.log(comments);

  const handleSubmit = async () => {
    // setCRUDLoading(true);
    if (comment !== "") {
      await addDoc(collection(db, "comment"), {
        bookId: bookId,
        user: user.displayName,
        userId: user.uid,
        comment: comment,
        createdAt: new Date(),
      });
      setComment("");
      getComments(bookId);
      // setCRUDLoading(false);
      alert("Review add successfully!");
    } else alert("Comment cannot be empty.");
  };

  // const clickHomeTemp = () => {
  //   navigation.replace("Home");
  // };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} enabled>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.DetailsBookContainer}>
            <Image
              source={{
                uri: book.image,
              }}
              style={styles.bookImage}
            />
            <View style={styles.bookInfoContainer}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                {book.title}
              </Text>
              <Text style={{ fontSize: 18 }}>
                by{" "}
                <Text style={{ fontWeight: "600", marginTop: 5 }}>
                  {book.author}
                </Text>
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "600" }}>
                Book Details:{" "}
                <Text
                  style={{ fontWeight: "600", marginTop: 5, color: "gray" }}
                >
                  {book.description}
                </Text>
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  textAlign: "center",
                }}
              >
                Category - {book.category}
              </Text>
              <Text style={styles.boldLine}></Text>

              {/* <Button
                style={{ padding: 10, margin: 10 }}
                onPress={clickHomeTemp}
                title="Home"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
              /> */}
            </View>

            {user ? (
              <View>
                <TextInput
                  label="Share your review"
                  value={comment}
                  style={{ marginVertical: 20 }}
                  onChangeText={(value) => setComment(value)}
                />
                <Button
                  onPress={() => handleSubmit()}
                  title="Share"
                  color="#0091EA"
                  accessibilityLabel="Learn more about this purple button"
                />
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => navigation.navigate("Login", { goBack: true })}
              >
                <Text>
                  Please login for review{" "}
                  <Text style={{ color: "#0091EA", fontWeight: "600" }}>
                    Login
                  </Text>
                </Text>
              </TouchableOpacity>
            )}

            <List.Section style={styles.commentContainer}>
              <List.Subheader>Review - {comments.length}</List.Subheader>
              <Divider />
              {comments.map((item) => {
                return (
                  <List.Item
                    key={item.id}
                    title={item.user}
                    description={item.comment}
                    left={() => (
                      <MaterialCommunityIcons
                        style={{ paddingVertical: 10 }}
                        name="account-circle"
                        size={28}
                      />
                    )}
                  />
                );
              })}
            </List.Section>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default BookDetails;
