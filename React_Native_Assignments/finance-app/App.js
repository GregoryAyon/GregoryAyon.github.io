import "./ignoreWarnings";
import React from "react";
import { Main } from "./src/Main";
import { LogIn } from "./src/auth/LogIn";
import { Registration } from "./src/auth/Registration";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthProvider } from "./src/context/AuthContext";
import { TransactionProvider } from "./src/context/TransactionContext";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <AuthProvider>
      <TransactionProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LogIn} />
            <Stack.Screen name="Registration" component={Registration} />
            <Stack.Screen
              name="Home"
              component={Main}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TransactionProvider>
    </AuthProvider>
  );
}
