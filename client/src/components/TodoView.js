/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {Actions} from 'react-native-router-flux';


export default class TodoView extends Component {
  componentDidMount(){
    Actions.refresh({title: this.props.todo.title})
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.columnContainer}>
          <ScrollView>
            <Text style={styles.textStyle}>
              {this.props.todo.title}:
            </Text>
            <Text style={styles.bodyStyle}>
              { this.props.todo.text}
            </Text>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 3,
    marginTop:3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '200',
  },
  bodyStyle: {
    fontSize: 14,
    fontWeight: '200',
    color:'rgba(0,0,0,0.4)',
    marginTop: 10,
    lineHeight:24,
    flex:1
  },
  columnContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1
  }
});
