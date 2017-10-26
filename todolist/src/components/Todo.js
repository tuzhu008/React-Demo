import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Todo extends Component {
  removeTodo (e) {
    e.stopPropagation();
    this.props.onRemove();
  }
  render() {
    return (
      <li
        className = {`todo-item ${this.props.completed?' completed':''}`}
        onClick = {this.props.onClick}
      >
        <input type='checkbox' className='todo-ckeckbox' checked={this.props.completed}/>
        {this.props.topic}
        <span className='todo-remove' onClick={(e) => this.removeTodo(e) }>X</span>
      </li>
    );
  }
};

Todo.propTypes = {
  topic: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired
}