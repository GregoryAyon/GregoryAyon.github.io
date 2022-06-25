import "./ignoreWarnings";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainScreen from "./src/screens/MainScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";

import { AuthProvider } from "./src/context/AuthContext";
import { CommentProvider } from "./src/context/CommentContext";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <AuthProvider>
      <CommentProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={SignUpScreen} />
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CommentProvider>
    </AuthProvider>
  );
}
