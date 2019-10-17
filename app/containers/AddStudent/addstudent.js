/**
 * @flow
 */

import React, { Component } from 'react';
import {TextInput, Picker,TouchableHighlight, View, Alert, Text,StyleSheet,Image,TouchableOpacity } from 'react-native';

import {NavigationActions,StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import { DatePickerDialog } from 'react-native-datepicker-dialog'

import { bindActionCreators } from 'redux';
import {postAPI,API } from '../../reducers/reducer';


const Item = Picker.Item;
// var moment = require('moment');

class AddStudentScreen extends Component {
  static navigationOptions={
		header:null
    };
    
  constructor(props) {
    super(props);

    this.state = {
        mode:'ADD',
        first_name:'',
        last_name:'',
        dob:"Date of Birth",
        specialization:'',
        address:'',
        education:'',
        DateHolder: null,
        add_flag: false
    }
  }

  componentDidMount() { 
      if(this.props.navigation.state.params){
        if(this.props.navigation.state.params.id){
            console.log('Edit Mode')
            this.setState({mode:'EDIT'})
            this.props.API('GET', this.props.navigation.state.params.id)

        }
        }
    }

    componentWillReceiveProps(){
        console.log('------')
        if(this.state.mode === "EDIT" && this.props.GETSTUDENTS.results.length > 0){
            var detail = this.props.GETSTUDENTS.results[0]
            this.setState({first_name:detail.first_name, last_name:detail.last_name, dob:detail.dob, education:detail.education, address:detail.education})
        }
        if(this.state.add_flag && this.props.GETSTUDENTS.results){
            alert(this.props.results)
        }
    }

    onFormSubmit(){
        var detail = this.state
        this.setState({add_flag:true})
        this.props.postAPI(detail)
    }

    nDatePickedFunction = (date) => {
        this.setState({
          dob: moment(date).format('DD-MM-YYYY')
        });
      }

    DatePickerMainFunctionCall = () => {
        let DateHolder = this.state.DateHolder;
        if(!DateHolder || DateHolder == null){
          DateHolder = new Date();
          this.setState({
            DateHolder: DateHolder
          });
        }
     
        this.refs.DatePickerDialog.open({
          date: DateHolder,
        });
      }




    render(){
        return (
            <View style={styles.container}> 
            <View style={{alignItems:'center',margin:10}}>
                <Text style={{fontWeight:'bold',fontSize:16}}>{this.state.mode} STUDENT</Text>
            </View>
                <View style={{flexDirection:'row'}}>
                    <View style={styles.infobox}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="First Name"
                            maxLength={20}
                            keyboardType= 'default'
                            value={this.state.first_name}
                            onChangeText={(first_name)=>{this.setState({first_name})}}
                            />
                    </View>
                    <View style={styles.infobox}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="last Name"
                            maxLength={20}
                            keyboardType= 'default'
                            value={this.state.last_name}
                            onChangeText={(last_name)=>{this.setState({last_name})}}
                            />
                    </View>
                </View>
                    <View style={styles.dobbox}>
                        <TouchableOpacity onPress={()=>this.DatePickerMainFunctionCall()}>
                            <Text style={this.state.dob == "Date of Birth" ? {color:'lightgrey',padding:10} : {color:'black',padding:10}}>{this.state.dob}</Text>
                            <DatePickerDialog ref="DatePickerDialog" onDatePicked={()=>{this.onDatePickedFunction}} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.dobbox}>
                    <Picker
                        mode="dialog"
                        placeholder={this.state.education}
                        style={styles.pickerstyle}
                        selectedValue={this.state.education}
                        onValueChange={(value, index) => this.setState({education: value})}>
                            <Item label="PG" value='PG' />
                            <Item label="Bachelor" value='Bachelor' />
                            <Item label="+ 2" value='+ 2' />
                    </Picker>
                    </View>
                    <View style={styles.dobbox}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Specialization"
                            maxLength={20}
                            keyboardType= 'default'
                            value={this.state.specialization}
                            onChangeText={(specialization)=>{this.setState({specialization})}}
                            />
                    </View>
                    <View style={styles.dobbox}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Address"
                            maxLength={100}
                            keyboardType= 'default'
                            value={this.state.address}
                            onChangeText={(address)=>{this.setState({address})}}
                            />
                    </View>
                <View style={{alignSelf:'center'}}>
                    <TouchableOpacity onPress={()=>{this.onFormSubmit}} style={styles.button}>
                        <Text style={styles.buttontext}>Submit</Text>
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
        marginTop:15,
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#ffcc00',
        width: 150,
        padding: 5,
    },
    buttontext:{
        color: '#11127c',
        fontWeight: 'bold',
        textShadowColor: '#fff',
        textShadowOffset: {width: 4, height: 1},
        textShadowRadius: 10
    },
    infobox:{
        margin:10,
        borderColor: 'black',
        borderWidth: 0.5,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        height:40,
        paddingLeft:10,
        width:150,
      },
      dobbox:{
        margin:10,
        borderColor: 'black',
        borderWidth: 0.5,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        height:40,
        paddingLeft:10,
        width:200,
      },
})

function mapStateToProps(state) {
    return {
        GETSTUDENTS: state,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({postAPI,API }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStudentScreen);
