/**
 * @flow
 */

import React, { Component } from 'react';
import {TextInput, TouchableHighlight, View, Alert, Text,StyleSheet,Image,TouchableOpacity } from 'react-native';

import {NavigationActions,StackActions } from 'react-navigation';
import { connect } from 'react-redux';



class SplashScreen extends Component {
  static navigationOptions={
		header:null
    };
    
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
    setTimeout( () => {this._navigateTo('Login')}, 2000);     
  }

  _navigateTo = (routeName: string) => {
    const actionToDispatch = StackActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName })]
    })
    this.props.navigation.dispatch(actionToDispatch)
  }


    render(){
        return (
          <View style={styles.container}>
            <View style={styles.textcont}>
            <Text style={{alignSelf:'center',fontFamily:'Arial',fontWeight:'bold',color:'#11137C',fontSize:20}}>Welcome to Wealth Runner Task</Text>
            </View>
            
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        flex:1,
        padding: 30,
    },
    textcont:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
})


export default SplashScreen;
