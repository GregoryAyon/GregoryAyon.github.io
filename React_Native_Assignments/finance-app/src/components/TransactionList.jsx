import React, { useContext } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { Transaction } from "./Transaction";
import TransactionContext from "../context/TransactionContext";

export const TransactionList = () => {
  const { transactions } = useContext(TransactionContext);
  return (
    <>
      <Text style={[styles.sectionTitle, styles.h3]}>Transaction History</Text>
      <View>
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </View>
    </>
  );
};
