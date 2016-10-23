/* @flow */

import React, { Component } from 'react';
import { Image, StyleSheet, StatusBar, TouchableOpacity, Platform } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import TodoList from './components/TodoList';
import Icon from 'react-native-vector-icons/EvilIcons';

export default class RouterComponent extends Component {

  render() {
    const getSceneStyle = (props, computedProps) => {
        const style = {
          backgroundColor: 'rgba(255,255,255,0.5)',
          padding: 20
        };

        // if (computedProps.isActive) {
        //   style.marginTop = computedProps.hideNavBar ? 0 : 64;
        //   style.marginBottom = computedProps.hideTabBar ? 0 : 50;
        // }

        return style;
      };

      const tabIcon = (
          <TouchableOpacity onPress={() => {alert('yeah')}} style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
            <Icon name="plus" size={30} color='white'/>
          </TouchableOpacity>
      );

    return (
      <Image source={require('./images/background.jpg')} style={styles.container}>
        <StatusBar
           backgroundColor="rgba(0,0,0,0.3)"
           translucent
           barStyle="light-content"
         />
        <Router sceneStyle={{
          paddingTop: 65,
        }}  navigationBarStyle={styles.navbarStyle} titleStyle={styles.titleStyle}>
          <Scene key="main">
            <Scene
              key='todoList'
              component={TodoList}
              title='ToDos'
              initial
              getSceneStyle={getSceneStyle}
              renderRightButton={ () => tabIcon}
            />
          </Scene>
        </Router>
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
