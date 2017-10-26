import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

export default class TodoList extends Component {
  render() {
    return (
      <ul className='todolist'>
        {
          this.props.todos.map((todo, index) =>
            <Todo
              {...todo}
              key = {todo.id}
              onClick = {() => this.props.onTodoClick(todo)}
              onRemove = {() => this.props.onRemove(todo.id)}
            />
          )
        }
      </ul>
    );
  }
};

TodoList.propTypes = {
  onTodoClick: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    topic: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired).isRequired
};