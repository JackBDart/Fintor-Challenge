import React, { useState } from 'react';
import {
  SafeAreaView, StyleSheet, Text, View, Platform, Dimensions,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';
import RecipesTab from './RecipesTab';
import FavoriteRecipesTab from './FavoriteRecipesTab';
import TransactionsTab from './TransactionsTab';

const windowWidth = (Dimensions.get('window').width) / 3;

const renderScene = (props) => SceneMap({
  recipesTab: () => (<RecipesTab navigation={props.navigation} />),
  favoriteRecipesTab: FavoriteRecipesTab,
  transactionsTab: TransactionsTab,
});

const renderLabel = (labelProps) => (
  <View>
    <Text style={[
      {
        color: 'lightgrey',
        textAlign: 'center',
        width: windowWidth,
        fontSize: 16,
      },
      labelProps.focused
        ? [{ color: '#5ecc7f' }]
        : {},
    ]}
    >
      {labelProps.route.title}
    </Text>
  </View>

);

const renderTabBar = (tabBarProps) => (
  <TabBar
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...tabBarProps}
    scrollEnabled
    indicatorStyle={{ backgroundColor: '#5ecc7f' }}
    style={{
      backgroundColor: '#2d2e30',
      maxWidth: '100%',
    }}
    tabStyle={{
      padding: 0,
      borderColor: 'red',
      width: 'auto',
    }}
    renderLabel={renderLabel}
  />
);

const UserScreen = (props) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'recipesTab', title: 'Recipes' },
    { key: 'favoriteRecipesTab', title: 'Favorite Recipes' },
    { key: 'transactionsTab', title: 'Transactions' },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bannerContainer}>
        <TouchableOpacity style={styles.logoutButtonContainer}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileHeaderContainer}>
        <View style={styles.profileHeaderTextContainer}>
          <Text style={styles.usernameText}>
            @FintorChallenge
          </Text>
          <Text style={[styles.userSubtitleText]}>
            10 CookingCoins
          </Text>
          <Text style={[styles.userSubtitleText]}>
            223 Recipe Favorites
          </Text>
        </View>
      </View>
      <TabView
        style={styles.tabViewContainer}
        navigationState={{ index, routes }}
        renderScene={renderScene(props)}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#2d2e30',
    paddingTop: Platform.OS === 'android' ? 45 : 0,
  },
  bannerContainer: {
    height: 40,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  logoutButtonContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    height: 'auto',
    width: 'auto',
  },
  profileHeaderContainer: {
    marginTop: '3%',
    marginHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileHeaderTextContainer: {
    marginLeft: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  usernameText: {
    color: '#5ecc7f',
    fontSize: 25,
    marginBottom: 12,
  },
  userSubtitleText: {
    fontSize: 15,
    marginBottom: 6,
    color: 'lightgrey',
  },
  tabViewContainer: {
    maxWidth: '100%',
    marginTop: 5,
  },
});

export default UserScreen;
