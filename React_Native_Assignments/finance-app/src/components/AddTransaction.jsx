import React, { useState, useContext } from "react";
import { Text, TextInput, View, Button } from "react-native";
import { styles } from "./styles";
import { db } from "./firebase-config";
import { collection, addDoc } from "firebase/firestore";
import AuthContext from "../context/AuthContext";
import TransactionContext from "../context/TransactionContext";

export const AddTransaction = () => {
  const { user } = useContext(AuthContext);
  const { getTransactions, setTransactLoading } =
    useContext(TransactionContext);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const userTransactionTable = collection(db, "userTransactionTable");

  const handleSubmit = () => {
    setTransactLoading(true);
    if (text.trim() === "" || amount.trim() === "") {
      alert("Please fill the fields!");
    } else {
      addDoc(userTransactionTable, {
        userID: user.uid,
        text: text,
        amount: parseFloat(amount),
      });
      setText("");
      setAmount("");
      getTransactions();
      alert("your transaction add successfully!");
    }
    setTransactLoading(false);
  };

  return (
    <>
      <Text style={[styles.sectionTitle, styles.h3]}>Add new transaction</Text>
      <View>
        <View>
          <Text style={styles.label}>Text</Text>
          <TextInput
            style={[styles.input]}
            onChangeText={(value) => setText(value)}
            value={text}
            placeholder="Enter text..."
          />
        </View>
        <View>
          <Text style={styles.label}>
            amount{"\n"}(negative - expense, positive - income)
          </Text>
          <TextInput
            style={[styles.input]}
            keyboardType="numeric"
            onChangeText={(value) => setAmount(value)}
            value={amount}
            placeholder="Enter amount..."
          />
          <Button
            onPress={handleSubmit}
            title="Add Transaction"
            color="#444"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    </>
  );
};
