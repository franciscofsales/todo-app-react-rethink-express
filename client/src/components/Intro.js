import React, { Component } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  LayoutAnimation
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {Text, Logo} from './common/Text';

class Intro extends Component {
  constructor(props) {
    super(props);
  }


  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  processAuth(props) {
    if (props.auth.user != null) {
      if (props.auth.user.uid) {
        Actions.main({type: 'reset'});
      }
      else {
        Actions.authLogin({type: 'reset'});
      }
    }
  }

  componentDidMount() {
    this.processAuth(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.processAuth(nextProps);
  }

  render() {
    	return (
        <View style={{flex:1, alignItems:'center', justifyContent:'space-around'}}>
          <View style={{flex:4, alignSelf:'stretch', alignItems:'center', justifyContent:'center', marginTop:30}}>
      		  <Logo style={{color:'rgba(61,90,128, 1)'}}>ToDo</Logo>
          </View>
          <View style={{flex:6, alignSelf:'stretch', padding:30, alignItems: 'center', justifyContent:'center'}}>
            <ActivityIndicator
              color='#3D5A80'
              size='large'
            />
            <Text style={{color:'rgba(61,90,128, 1)', padding: 15}}> Doing some magic... </Text>
          </View>
        </View>
      );
  }
}
const styles = StyleSheet.create({
});

const mapStateToProps = (state) => (
  {
    auth: state.auth
  }
);

export default connect(mapStateToProps)(Intro);
