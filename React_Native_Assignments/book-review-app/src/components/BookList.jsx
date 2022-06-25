import { ScrollView, Text, View, Image, Button } from "react-native";
import { Searchbar } from "react-native-paper";
import { Card } from "react-native-shadow-cards";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";

import { BooksList } from "../config/data";

import styles from "./Styles";

const BookList = () => {
  const navigation = useNavigation();
  const [booksList, setBooksList] = useState(BooksList);
  const [search, setSearch] = useState("");

  const searchBookFilter = () => {
    let booksList = [...BooksList];
    booksList = booksList.filter((book) => {
      return book.category.includes(search);
    });
    setBooksList(booksList);
  };

  const clickDetails = (bookId) => {
    navigation.navigate("BookDetails", { bookId: bookId });
  };

  useEffect(() => {
    searchBookFilter();
  }, [search]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.appTitle}>BOOK REVIEW APP</Text>
        <View style={styles.searchBar}>
          <Searchbar
            placeholder="Search by book category"
            onChangeText={(value) => setSearch(value)}
            value={search}
          />
        </View>
        <View style={styles.cardRaw}>
          {booksList ? (
            booksList.map((book) => {
              return (
                <Card style={styles.cardCustom} key={book.id}>
                  <Image
                    style={styles.photo}
                    source={{
                      uri: book.image,
                    }}
                  />
                  <Text style={styles.title}>{book.title}</Text>
                  <Text style={styles.category}>
                    Category - {book.category}
                  </Text>
                  <Button
                    style={{ padding: 10, margin: 10 }}
                    onPress={() => clickDetails(book.id)}
                    title="View Details"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                  />
                </Card>
              );
            })
          ) : (
            <Text></Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default BookList;
