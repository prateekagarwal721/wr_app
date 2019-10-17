import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text,Icon, StatusBar,} from 'react-native';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SplashScreen from '../containers/Splash/splash'
import LoginScreen from '../containers/Login/login'
import HomeScreen from '../containers/Home/home'
import AddStudentScreen from '../containers/AddStudent/addstudent'

import store from'../store'



const StacksOverTabs = createStackNavigator({

    Splash: {
      screen: SplashScreen,
    },
    Login: {
        screen: LoginScreen,
    },
    Root: {
        screen: HomeScreen,
    },
    ADD: {
        screen: AddStudentScreen,
    }
    },
    {
      headerMode: 'screen',
    }
);

const AppContainer = createAppContainer(StacksOverTabs);

class App extends React.Component{
  render(){
    return(
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    );
  }
}

export default App;
