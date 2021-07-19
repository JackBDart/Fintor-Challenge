import React from 'react';
import {
  SafeAreaView, FlatList,
} from 'react-native';
import FavoriteRecipeTile from '../components/FavoriteRecipeTile';

const renderItem = ({ item }) => {
  return <FavoriteRecipeTile recipe={item} />;
};

const recipes = [{
  title: 'Steak Fajitas',
  description: 'Classic carne asada recipe with bell peppers and onions. Also includes recipes for the sides served with the dish like guacamole.',
  price: 10,
},
{
  title: 'Meatball Sub',
  description: 'Delicious homemade marinara sauce rich with herbs, garlic and onion, a beef and pork meatball blend, and a guide on buying rolls.',
  price: 25,
}];

const FavoriteRecipesTab = () => {
  return (

    <SafeAreaView>
      <FlatList
        data={recipes}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.title}
        style={{ marginBottom: 40 }}
      />
    </SafeAreaView>
  );
};

export default FavoriteRecipesTab;
