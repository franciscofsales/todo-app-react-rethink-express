import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  LayoutAnimation
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ButtonComponent from 'react-native-button-component';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {Text, Logo} from './common/Text';

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      buttonState: 'login',
      error: null
    };

    this.buttonStates = {
      login: {
        text: 'LOG IN',
        onPress: () => {
          this.setState({buttonState: 'loading', error: null});
          this.processLogin();
        },
        backgroundColors: ['rgba(61,90,128,0.7)', 'rgba(53,98,135,0.7)']
      },
      loading: {
        spinner: true,
        text: 'LOGGIN IN...',
        backgroundColors: ['rgba(61,90,128,0.7)', 'rgba(53,98,135,0.7)']
      }
    };
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  processAuth(props) {
    if (props.auth.user != null) {
      if (props.auth.user.uid) {
        Actions.main({type: 'reset'});
      }
      if (props.auth.error) {
        this.setState({buttonState: 'login', error: 'Authentication failed. Please try again.'});
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.processAuth(nextProps);
  }

  componentDidMount() {
    this.processAuth(this.props);
  }

  processLogin() {
    const { email, password } = this.state;
    this.props.loginWithEmail(email, password);
  }

  renderError() {
    if (this.state.error) {
      return (
        <View style={[styles.row, {elevation: 1, flex:1, padding:3, flexDirection: 'column'}]}>
          <Text style={{color:'red', alignSelf: 'stretch', fontSize: 12}}>{this.state.error}</Text>
        </View>
      );
    }
    return null;
  }

  render() {
    	return (
        <View style={{flex:1, alignItems:'center', justifyContent:'space-around'}}>
          <View style={{flex:4, alignSelf:'stretch', alignItems:'center', justifyContent:'center', marginTop:30}}>
      		  <Logo style={{color:'rgba(61,90,128, 1)'}}>ToDo</Logo>
          </View>
          <View style={{flex:6, alignSelf:'stretch', padding:30}}>
            <TouchableOpacity onPress={() => Actions.signUp({type:'replace'})}>
              <Text style={{alignSelf:'flex-end', fontSize:13, margin:5, color:'rgba(61,90,128, 1)', fontStyle:'italic', fontWeight:'200'}}>REGISTER</Text>
            </TouchableOpacity>
            <View style={{flex:1, borderColor:'#d3d3d3'}}>
              <TextInput
                placeholder = "EMAIL"
                placeholderTextColor = "#fff"
                value={this.state.email}
                autoCorrect={false}
                onChangeText={(email) => this.setState({email: email})}
                style = {styles.textInput}
                underlineColorAndroid="rgba(0,0,0,0)"
                autoCapitalize='none'/>
            </View>
            <View style={{flex:1, borderColor:'#d3d3d3'}}>
              <TextInput
                placeholder = "PASSWORD"
                value={this.state.password}
                onChangeText={(pw) => this.setState({password: pw})}
                autoCorrect={false}
                placeholderTextColor = "#fff"
                style = {styles.textInput}
                secureTextEntry
                underlineColorAndroid="rgba(0,0,0,0)"
                autoCapitalize='none'/>
            </View>
            <ButtonComponent
              style={{flex:0.25, justifyContent:'center', alignItems:'center'}}
              type='primary'
              shape='reactangle'
              buttonState={this.state.buttonState}
              states={this.buttonStates}
            />
            {this.renderError()}
            <View style={styles.row}>
            </View>
            <View style={styles.row}>
            </View>
          </View>
        </View>
      );
  }
}
const styles = StyleSheet.create({
  textInput: {flex:1, backgroundColor:'rgba(0,0,0,0.3)', padding:10, color:'#fff', fontSize:12},
  line:{flex:1, height:2, backgroundColor:'rgba(0,0,0,0.2)' },
  row:{flex:1, flexDirection:'row', alignItems:'center'},
  social:{flex:1, borderRadius:2, flexDirection:'row', margin:8, alignItems:'center', justifyContent:'center', padding:5}

});

const mapStateToProps = (state) => (
  {
    auth: state.auth
  }
);

export default connect(mapStateToProps, actions)(LoginView);
