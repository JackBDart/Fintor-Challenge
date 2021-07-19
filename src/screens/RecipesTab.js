import React from 'react';
import {
  SafeAreaView, FlatList,
} from 'react-native';
import RecipeTile from '../components/RecipeTile';

const renderItem = ({ item }) => {
  return <RecipeTile recipe={item} />;
};

const RecipeDetailScreen = (recipesobj) => {
  const { recipes } = recipesobj;
  return (

    <SafeAreaView>
      <FlatList
        data={recipes}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.title}
      />
    </SafeAreaView>
  );
};

export default RecipeDetailScreen;
