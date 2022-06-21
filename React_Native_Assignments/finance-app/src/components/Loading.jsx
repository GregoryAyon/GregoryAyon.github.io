import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";

const Loading = () => {
  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 20 }}>Loading...</Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
