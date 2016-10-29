/* @flow */

import React, { Component } from 'react';
import { Image, StyleSheet,
  StatusBar, TouchableOpacity,
  Platform, View } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import TodoList from './components/TodoList';
import TodoView from './components/TodoView';
import NewTodo from './components/NewTodo';
import LoginView from './components/LoginView';
import SignupView from './components/SignupView';
import Intro from './components/Intro';
import * as actions from './actions';

class RouterComponent extends Component {

  componentWillMount(){
    this.props.subscribeAuthStatus();
  }

  render() {
    const getSceneContainerStyle = (props, computedProps) => {
        const style = {
          backgroundColor:'transparent'
        };
        return style;
      };
    const getSceneStyle = (props, computedProps) => {
        const style = {
          backgroundColor:'transparent',
          padding: 20
        };
        return style;
      };

      const tabIcon = (
          <TouchableOpacity onPress={() => {Actions.newTodo()}} style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
            <Icon name="ios-add" size={40} color='white'/>
          </TouchableOpacity>
      );
      const saveIcon = (
          <TouchableOpacity onPress={() => {this.props.addTodo(this.props.newTodoForm)}} style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
            <Icon name="ios-checkmark" size={50} color='white'/>
          </TouchableOpacity>
      );

    return (
      <Image source={require('./images/background.jpg')} style={styles.container}>
        <View style={{backgroundColor: 'rgba(255,255,255,0.2)', flex:1}}>
          <StatusBar
             backgroundColor="rgba(0,0,0,0.3)"
             translucent
             barStyle="light-content"
           />
          <Router sceneStyle={{
            paddingTop: 65,
          }}  navigationBarStyle={styles.navbarStyle} titleStyle={styles.titleStyle}>
            <Scene key="auth" initial hideNavBar getSceneStyle={getSceneContainerStyle}>
              <Scene
                key='intro'
                component={Intro}
                getSceneStyle={getSceneStyle}
                initial
              />
              <Scene
                key='authLogin'
                component={LoginView}
                getSceneStyle={getSceneStyle}
              />
              <Scene
                key='signUp'
                component={SignupView}
                getSceneStyle={getSceneStyle}
              />
            </Scene>
            <Scene key="main" getSceneStyle={getSceneContainerStyle}>
              <Scene
                key='todoList'
                component={TodoList}
                title='ToDos'
                initial
                leftTitle="Signout"
                leftButtonTextStyle={{color:'white'}}
                onLeft={()=>{
                  this.props.signOut();
                }}
                getSceneStyle={getSceneStyle}
                renderRightButton={ () => tabIcon}
                backAndroidHandler={() => false}
              />
              <Scene
                key='todoItem'
                component={TodoView}
                title='ToDo'
                getSceneStyle={getSceneStyle}
                leftButtonIconStyle={{tintColor:'white'}}
              />
              <Scene
                key='newTodo'
                component={NewTodo}
                title='New'
                getSceneStyle={getSceneStyle}
                leftButtonIconStyle={{tintColor:'white'}}
                renderRightButton={ () => saveIcon}

              />
            </Scene>
          </Router>
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  navbarStyle:{
    backgroundColor:'rgba(0,0,0,0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    paddingTop: (Platform.OS === 'ios') ? 5 : 20,
    height: 70
  },
  titleStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'

  },
  container: {
    flex: 1,
    width: null,
    height: null,
  }
})

const mapStateToProps = (state) => {
  return {
    newTodoForm: state.todoForm
  };
};

export default connect(mapStateToProps, actions)(RouterComponent);
