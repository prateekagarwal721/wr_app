/**
 * @flow
 */

import React, { Component } from 'react';
import {TextInput, TouchableHighlight, View, Alert, Text,StyleSheet,Image,TouchableOpacity } from 'react-native';

import {NavigationActions,StackActions } from 'react-navigation';
import { connect } from 'react-redux';



class LoginScreen extends Component {
  static navigationOptions={
		header:null
    };
    
  constructor(props) {
    super(props);

    this.state = {
        userName: '',
        psswd:'',
    }
  }

  componentDidMount() {    
  }

  onSignupPress(){
      console.log(this.props)
      login_cred = this.props.DETAIL.login
      if(this.state.userName == login_cred.id && this.state.psswd == login_cred.password){
        this._navigateTo('Root')
      }
      else{
          alert("Incorret Password!! Try Again")
      }
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

              <TextInput
                  style={styles.textinput}
                  autoFocus={false}
                  placeholderTextColor={'black'}
                  selectionColor={'#7070D8'}
                  placeholder={'Enter your User Name'}
                  keyboardType='text'
                  maxLength={20}
                  onChangeText={(userName) => this.setState({userName : userName})}
                />

                <TextInput 
                    secureTextEntry={true} 
                    placeholder="Password"
                    placeholderTextColor={'black'}
                    style={styles.textinput} 
                    onChangeText={(psswd) => { this.setState({psswd : psswd})}}
                />

                <TouchableHighlight underlayColor='#fff' style ={styles.button} onPress={() =>this.onSignupPress()}>
                    <Text style={styles.buttontext}>Login</Text>
                </TouchableHighlight>

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
        backgroundColor:'rgba(0,0,0,0.1)'
    },
    textcont:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    textinput: {
        height: 40,
        width: 200,
        padding: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor:'black',
        fontSize:14,
        margin:10
    },
    button: {
        marginTop:20,
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#ffcc00',
        width: 200,
        padding: 10,
    },
    buttontext:{
        color: '#11127c',
        fontSize: 16,
        fontWeight: 'bold',
        textShadowColor: '#fff',
        textShadowOffset: {width: 4, height: 1},
        textShadowRadius: 10
    },
})

function mapStateToProps(state) {
    return {
        DETAIL: state,
    }
}


export default connect(mapStateToProps)(LoginScreen);
