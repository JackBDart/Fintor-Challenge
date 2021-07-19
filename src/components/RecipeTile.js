import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';

const RecipeTile = (item) => {
  const { recipe } = item;
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={{ maxWidth: '75%', fontSize: 18 }} numberOfLines={1}>
          {recipe.title}
        </Text>
        <Text style={{ fontSize: 18 }} numberOfLines={1}>
          Cost:
          {' '}
          {recipe.price}
        </Text>
      </View>
      <Text style={styles.description} numberOfLines={2}>
        {recipe.desc}
        dsadsadasdsadasdasdasdas
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  description: {
    paddingHorizontal: 25,
    paddingBottom: 10,
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#5ecc7f',
    borderRadius: 10,
    flexDirection: 'column',
    width: '92%',
    marginVertical: 10,
    alignSelf: 'center',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginHorizontal: 25,
  },
});

export default RecipeTile;
