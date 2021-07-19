import React from 'react';
import {
  SafeAreaView, FlatList,
} from 'react-native';
import TransactionTile from '../components/TransactionTile';

const renderItem = ({ item }) => {
  return <TransactionTile transactions={item} />;
};

const transactions = [{
  title: 'Steak Fajitas',
  price: 10,
  date: '7/18/21',
},
{
  title: 'Meatball Sub',
  price: 25,
  date: '7/16/21',
}];

const TransactionsTab = () => {
  return (

    <SafeAreaView>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        style={{ marginBottom: 40 }}
      />
    </SafeAreaView>
  );
};

export default TransactionsTab;
