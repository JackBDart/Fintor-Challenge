import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LeaderboardScreen from '../screens/UserScreen';
import OtherProfileScreen from '../screens/RecipeDetailScreen';

const Stack = createStackNavigator();

const LeaderboardTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LeaderboardScreen"
        component={LeaderboardScreen}
        options={{
          title: '',
          headerStyle: {
            height: 0,
            backgroundColor: '#2d2e30',
            shadowOffset: { height: 0, width: 0 }, // Gets rid of white line underneath
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'left',
        }}
      />
      <Stack.Screen
        name="RecipeDetail"
        component={OtherProfileScreen}
        options={{
          title: 'Recipe Details',
          headerStyle: {
            backgroundColor: '#2d2e30',
            shadowOffset: { height: 0, width: 0 }, // Gets rid of white line underneath
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerBackTitle: 'Back',
        }}
      />
    </Stack.Navigator>
  );
};

export default LeaderboardTab;
