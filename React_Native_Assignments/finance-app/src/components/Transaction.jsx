import React, { useContext } from "react";
import { Text, View, Button } from "react-native";
import { styles } from "./styles";
import { db } from "./firebase-config";
import { doc, deleteDoc } from "firebase/firestore";
import TransactionContext from "../context/TransactionContext";

export const Transaction = ({ transaction }) => {
  const { getTransactions } = useContext(TransactionContext);
  const sign = transaction.amount < 0 ? "-" : "+";
  const color = transaction.amount < 0 ? styles.listMinus : styles.listPlus;

  const deleteTransaction = async (id) => {
    const transDoc = doc(db, "userTransactionTable", id);
    await deleteDoc(transDoc);
    alert("item deleted successfully!");
    getTransactions();
  };

  return (
    <View style={[styles.list, styles.boxWithShadow, color]}>
      <View>
        <Text style={[styles.transText_2]}>{transaction.text}</Text>
      </View>
      <View style={[styles.transView]}>
        <Text style={[styles.transText_1]}>
          {sign}${Math.abs(transaction.amount)}
        </Text>
        <Text>
          <Button
            onPress={() => deleteTransaction(transaction.id)}
            color="#444"
            title="X"
          />
        </Text>
      </View>
    </View>
  );
};
