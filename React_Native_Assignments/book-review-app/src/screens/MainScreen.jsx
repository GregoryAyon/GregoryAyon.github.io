import React, { useContext, useEffect } from "react";
import HomeScreen from "./HomeScreen";
import SideOptionScreen from "./SideOptionScreen";

import { useNavigation } from "@react-navigation/core";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase-config";
import AuthContext from "../context/AuthContext";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Tab = createMaterialBottomTabNavigator();

// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// const Tab = createBottomTabNavigator();

// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// const Tab = createMaterialTopTabNavigator();

const MainScreen = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        navigation.navigate("Main");
      }
    });
    return unsubscribe;
  }, []);
  return (
    <Tab.Navigator initialRouteName="HomeScreen">
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Options"
        component={SideOptionScreen}
        options={{
          tabBarLabel: "Menu",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="menu" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>

    // <Tab.Navigator initialRouteName="HomeScreen">
    //   <Tab.Screen name="HomeScreen" component={HomeScreen} />
    //   <Tab.Screen name="Options" component={SideOptionScreen} />
    // </Tab.Navigator>

    // <Tab.Navigator initialRouteName="HomeScreen">
    //   <Tab.Screen name="HomeScreen" component={HomeScreen} />
    //   <Tab.Screen name="Options" component={SideOptionScreen} />
    // </Tab.Navigator>
  );
};

export default MainScreen;
