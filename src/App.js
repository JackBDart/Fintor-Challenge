import React from 'react';
import { LogBox } from 'react-native';
import MainTabBar from './navigation/MainTabBar';

// disable really annoying in app warnings
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();// Ignore all log notifications

const App = (props) => {
  return <MainTabBar />;
};

export default App;
