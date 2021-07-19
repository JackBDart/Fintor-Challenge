import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import UserTab from './UserTab';

const Tab = createBottomTabNavigator();

const MainTabBar = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Search"
        tabBarOptions={{
          showLabel: false,
          style: {
            backgroundColor: 'gray',
            height: '9%',
          },
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            return <FontAwesomeIcon icon={faUser} size={26} color={focused ? '#5ecc7f' : 'white'} />;
          },
        })}
      >
        <Tab.Screen name="User" component={UserTab} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainTabBar;
