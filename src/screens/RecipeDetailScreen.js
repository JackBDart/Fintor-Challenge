import React from 'react';
import {
  SafeAreaView, Text,
} from 'react-native';

const RecipeDetailScreen = (props) => {
  const { route } = props;
  const { params } = route;
  const { recipe } = params;

  return (

    <SafeAreaView>
      <Text style={{ color: 'black' }}>{recipe.title}</Text>
    </SafeAreaView>
  );
};

export default RecipeDetailScreen;
