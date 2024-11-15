import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Monsters } from '../view/Monsters';
import { Sets } from '../view/Sets';
import { Weapons } from '../view/Weapons';
import { Platform, View, StyleSheet, ImageBackground } from 'react-native';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

export function BottomTabs() {
  const [darkMode, setDarkMode] = useState(false);

  const tabBarOptions = {
    tabBarActiveTintColor: darkMode ? '#50B948' : '#4CAF50',
    tabBarInactiveTintColor: darkMode ? '#CCCCCC' : 'black',
    tabBarStyle: {
      backgroundColor: darkMode ? '#333333' : '#FFFFFF',
      borderTopColor: 'transparent',
    },
    tabBarIconStyle: {
      marginBottom: Platform.OS === 'android' ? -3 : 0,
    },
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ImageBackground
      source={{ uri: 'https://mfiles.alphacoders.com/100/1000753.jpeg' }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            ...tabBarOptions,
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Monsters') {
                iconName = 'dragon';
                return <IconFontAwesome5 name={iconName} size={size} color={color} />;
              } else if (route.name === 'Armor Sets') {
                iconName = 'shield';
                return <IconFontAwesome name={iconName} size={size} color={color} />;
              } else if (route.name === 'Weapons') {
                iconName = 'crosshairs';
                return <IconFontAwesome name={iconName} size={size} color={color} />;
              }
            },
          })}
        >
          <Tab.Screen
            name="Monsters"
            component={Monsters}
            options={{
              tabBarIcon: ({ color, size }) => (
                <IconFontAwesome5 name="dragon" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Armor Sets"
            component={Sets}
            options={{
              tabBarIcon: ({ color, size }) => (
                <IconFontAwesome name="shield" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Weapons"
            component={Weapons}
            options={{
              tabBarIcon: ({ color, size }) => (
                <IconFontAwesome name="crosshairs" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
