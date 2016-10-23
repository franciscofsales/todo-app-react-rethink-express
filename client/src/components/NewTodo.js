/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import {todoFormUpdate} from '../actions';


class NewTodo extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.columnContainer}>
          <View>
            <AutoGrowingTextInput
              style={styles.textStyle}
              placeholder={'Title'}
              value={this.props.title}
              onChangeText={(value) => this.props.todoFormUpdate({prop: 'title', value})}
               minHeight={40}
              maxHeight={150}
              underlineColorAndroid="rgba(0,0,0,0)"/>
          </View>
          <View>
            <AutoGrowingTextInput
              style={styles.bodyStyle}
              placeholder={'note...'}
              value={this.props.text}
              minHeight={40}
              onChangeText={(value) => this.props.todoFormUpdate({prop: 'text', value})}
              underlineColorAndroid="rgba(0,0,0,0)"
              />
          </View>
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
    alignItems: 'flex-start',
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
    height: 30,

  },
  bodyStyle: {
    fontSize: 14,
    fontWeight: '200',
    color:'rgba(0,0,0,0.4)',
    marginTop: 10,
    height:30,

  },
  columnContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1
  }
});

const mapStateToProps = ({todoForm}) => {
  const {text, title} = todoForm;
  return {text, title}
}

export default connect(mapStateToProps, {todoFormUpdate})(NewTodo);
