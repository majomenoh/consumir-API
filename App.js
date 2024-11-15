import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { Main } from './src/Main';

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Main />
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
