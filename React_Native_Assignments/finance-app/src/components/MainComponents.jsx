import React, { useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { View, ScrollView } from "react-native";
import { Header } from "./Header";
import { Balance } from "./Balance";
import { IncomeExpenses } from "./IncomeExpenses";
import { AddTransaction } from "./AddTransaction";
import { TransactionList } from "./TransactionList";
import { styles } from "./styles";
import TransactionContext from "../context/TransactionContext";
import Loading from "./Loading";

export const MainComponents = () => {
  const { transactLoading, getTransactions } = useContext(TransactionContext);

  useEffect(() => {
    getTransactions();
  }, []);

  if (transactLoading) return <Loading />;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Header />
        <Balance />
        <IncomeExpenses />
        <AddTransaction />
        <StatusBar style="auto" />
        <TransactionList />
      </View>
    </ScrollView>
  );
};
