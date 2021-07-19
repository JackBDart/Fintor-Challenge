import React from 'react';
import {
  View, Text, StyleSheet, Button,
} from 'react-native';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import config from '../aws-exports';
import { deleteRecipe, updateRecipe } from '../graphql/mutations';

Amplify.configure(config);

const RecipeTile = (item) => {
  const { recipe } = item;
  const { navigation } = item;

  async function deleteRecipeById() {
    try {
      await API.graphql(graphqlOperation(deleteRecipe, { input: { id: recipe.id } }));
    } catch (err) {
      console.log('error creating todo:', err);
    }
  }

  async function updateRecipeById() {
    try {
      await API.graphql(graphqlOperation(updateRecipe, { input: { id: recipe.id, title: 'bozo' } }));
    } catch (err) {
      console.log('error creating todo:', err);
    }
  }

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
        {recipe.description}
      </Text>
      <View style={styles.headerContainer}>
        <Button title="Delete" onPress={deleteRecipeById} />
        <Button title="Expand" onPress={() => navigation.navigation.navigate('RecipeDetail', { recipe })} />
        <Button title="Edit" onPress={updateRecipeById} />
      </View>
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
