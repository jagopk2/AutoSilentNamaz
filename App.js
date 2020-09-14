/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AboutScreen from './Screens/AboutScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FlashMessage from 'react-native-flash-message';
import Fontisto from 'react-native-vector-icons/Fontisto';
import HomePageScreen from './Screens/HomePageScreen';
import InfoScreen from './Screens/InfoScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import React from 'react';
import {ThemeProvider} from 'react-native-elements';
import TroubleShootScreen from './Screens/TroubleShootScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStore} from 'redux';
import reducer from './reducers';

const store = createStore(reducer);
const theme = {
  Button: {
    raised: false,
    titleStyle: {
      color: 'white',
      fontFamily: 'Podkova-Medium',
    },
  },
  Text: {
    style: {
      fontFamily: 'Podkova-Medium',
    },
  },
};
const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator
            tabBarOptions={{
              activeTintColor: '#dba329',
              inactiveTintColor: 'gray',
            }}>
            <Tab.Screen
              name="Home"
              component={HomePageScreen}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color, size}) => (
                  <AntDesign name="home" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Info"
              component={InfoScreen}
              options={{
                tabBarLabel: 'Guide',
                tabBarIcon: ({color, size}) => (
                  <AntDesign name="book" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="TroubleShoot"
              component={TroubleShootScreen}
              options={{
                tabBarLabel: 'FAQ',
                tabBarIcon: ({color, size}) => (
                  <Fontisto name="question" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="About"
              component={AboutScreen}
              options={{
                tabBarLabel: 'About Us',
                tabBarIcon: ({color, size}) => (
                  <Fontisto name="persons" color={color} size={size} />
                ),
              }}
            />

            {/* <Tab.Screen name="About" component={A} /> */}
          </Tab.Navigator>
        </NavigationContainer>
        <FlashMessage position="top" />
      </ThemeProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
