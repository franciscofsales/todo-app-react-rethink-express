/* @flow */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  ListView
} from 'react-native';
import DynamicListView from './common/DynamicListView';
import Todo from './Todo';
import {removeTodo, fetchTodos} from '../actions';


class TodoList extends Component {
  componentDidMount() {
    this.props.fetchTodos();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({todos}){
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(todos);
  }

  renderRow(todo) {
    return <Todo todo={todo}/>;
  }

  render() {
    return (
      <View style={styles.container}>
        <DynamicListView
          items={this.props.todos}
          renderRow={this.renderRow}
          onRemove={(item) => this.props.removeTodo(item)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});


function mapStateToProps (state, props) {
  const {todos} = state;
  return {
    todos
  };
};



export default connect(
  mapStateToProps,
  {removeTodo, fetchTodos}
)(TodoList);
