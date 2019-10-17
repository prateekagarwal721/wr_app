/**
 * @flow
 */

import React, { Component } from 'react';
import {TextInput, TouchableHighlight, View, Alert, Text,StyleSheet,Image,TouchableOpacity } from 'react-native';

import {NavigationActions,StackActions } from 'react-navigation';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { getAPI, API } from '../../reducers/reducer';


class HomeScreen extends Component {
  static navigationOptions={
		header:null
    };
    
  constructor(props) {
    super(props);

    this.state = {
        student_list:[],
    }
  }

  componentDidMount() { 
      this.props.getAPI('GET')   
    }

    componentWillReceiveProps(){
        if(this.props.GETSTUDENTS.fetch_completed){
            console.log(this.props.GETSTUDENTS.students)
            this.setState({student_list:this.props.GETSTUDENTS.students})
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

  onDeletePress(id){
      this.props.API('DELETE', id)
    }


    render(){
        console.log('render')
        console.log(this.props)
        console.log(this.state.student_list)
        return (
            <View style={styles.container}> 
                {this.state.student_list.length > 0 ?
                    <View style={{flexDirection:'column',margin:20}}>
                        {this.state.student_list.map((student, index)=>{
                            return(
                                <View style={{flexDirection:'column',height:150,elevation:10,backgroundColor:'rgba(255,255,255,0.8)',borderWidth:1,borderColor:'rgba(255,255,255,0.8)',padding:20,margin:10}}>
                                    <Text>Name: {student.first_name} {student.last_name}</Text>
                                    <Text>Dob: {student.dob}</Text>
                                    <Text>Education: {student.education}</Text>
                                    <Text>Address: {student.address}</Text>
                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ADD',{id:student.id})}} style={styles.button}>
                                        <Text style={styles.buttontext}>Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{this.onDeletePress(student.id)}} style={styles.button}>
                                        <Text style={styles.buttontext}>Delete</Text>
                                    </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })
                        }
                    </View>
                :
                    <View>
                        <Text>No Records found</Text>
                    </View>
                }
                <View style={{alignSelf:'center'}}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ADD')}} style={styles.button}>
                        <Text style={styles.buttontext}>Add More</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'rgba(0,0,0,0.1)'
    },
    button: {
        marginTop:5,
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#ffcc00',
        width: 80,
        padding: 5,
    },
    buttontext:{
        color: '#11127c',
        fontWeight: 'bold',
        textShadowColor: '#fff',
        textShadowOffset: {width: 4, height: 1},
        textShadowRadius: 10
    },
})

function mapStateToProps(state) {
    return {
        GETSTUDENTS: state,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ getAPI, API }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
