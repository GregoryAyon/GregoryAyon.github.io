import React from "react";
import BookList from "../components/BookList";
import BookDetails from "../components/BookDetails";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const HomeScreen = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="BookList">
      <Stack.Screen name="BookList" component={BookList} />
      <Stack.Screen name="BookDetails" component={BookDetails} />
    </Stack.Navigator>
  );
};

export default HomeScreen;
