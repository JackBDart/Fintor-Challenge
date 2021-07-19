import Amplify, { API, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState, useRef } from 'react';
import {
  SafeAreaView, FlatList, TextInput, Button, StyleSheet,
} from 'react-native';
import config from '../aws-exports';
import RecipeTile from '../components/RecipeTile';
import { createRecipe } from '../graphql/mutations';
import { listRecipes } from '../graphql/queries';
import { onDeleteRecipe, onUpdateRecipe } from '../graphql/subscriptions';

Amplify.configure(config);

const initialState = { title: '', description: '', price: 0 };

const RecipeDetailScreen = (props) => {
  const [formState, setFormState] = useState(initialState);
  const [recipes, setRecipes] = useState([]);
  const subscriptionRef = useRef();

  const renderItem = ({ item }) => {
    return <RecipeTile navigation={props} recipe={item} />;
  };

  async function fetchRecipes() {
    try {
      const recipeData = await API.graphql(graphqlOperation(listRecipes));
      const fetchedrecipes = recipeData.data.listRecipes.items;
      setRecipes(fetchedrecipes);
    } catch (err) { console.log(err); }
  }

  async function addRecipe() {
    try {
      const recipe = { ...formState };
      setFormState(initialState);
      await API.graphql(graphqlOperation(createRecipe, { input: recipe }));
      await fetchRecipes();
    } catch (err) {
      console.log('error creating recipe:', err);
    }
  }

  useEffect(() => {
    fetchRecipes();

    subscriptionRef.current = API.graphql(
      graphqlOperation(onDeleteRecipe),
    ).subscribe({
      next: (newData) => {
        fetchRecipes();
      },
    });

    subscriptionRef.current = API.graphql(
      graphqlOperation(onUpdateRecipe),
    ).subscribe({
      next: (newData) => {
        fetchRecipes();
      },
    });
  }, []);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  return (

    <SafeAreaView>
      <TextInput
        onChangeText={(val) => setInput('title', val)}
        style={styles.input}
        value={formState.title}
        placeholder="Title"
      />
      <TextInput
        onChangeText={(val) => setInput('description', val)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <Button title="Create Recipe" onPress={addRecipe} />
      <FlatList
        data={recipes}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        style={{ marginBottom: 150 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50, backgroundColor: '#ddd', marginBottom: 10, padding: 8,
  },
  todoName: { fontSize: 18 },
  logoutButtonContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    height: 'auto',
    width: 'auto',
  },
});

export default RecipeDetailScreen;
