import React from 'react';
import {
  SafeAreaView, Text, StyleSheet,
} from 'react-native';

const RecipeDetailScreen = (props) => {
  const { route } = props;
  const { params } = route;
  const { recipe } = params;

  return (

    <SafeAreaView style={styles.container}>
      <Text style={styles.title} numberOfLines={1}>{recipe.title}</Text>
      <Text style={styles.price}>
        Price:
        {' '}
        {recipe.price}
      </Text>
      <Text style={styles.description}>
        Description:
        {' '}
        {recipe.description}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#2d2e30',
  },
  title: {
    marginLeft: 40,
    marginRight: 10,
    marginTop: 20,
    color: '#5ecc7f',
    fontSize: 24,
  },
  price: {
    marginLeft: 40,
    marginTop: 15,
    color: 'lightgray',
    fontSize: 17,
  },
  description: {
    marginLeft: 40,
    marginTop: 15,
    marginRight: 20,
    color: 'lightgray',
    fontSize: 20,
  },
});

export default RecipeDetailScreen;
