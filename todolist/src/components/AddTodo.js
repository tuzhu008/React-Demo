import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddTodo extends Component {
  // constructor (props) {
  //   super(props);
  //   // this.handleClick = this.handleClick.bind(this);
  // }
  render() {
    return (
      <div className='Add-Todo'>
        <input 
          type='text' 
          ref={(input) => { this.textInput = input; }} 
          className='Add-input'
        />
        <button className='Add-btn' onClick={e => this.handleClick(e)}>Add</button>
      </div>
    );
  }
  handleClick(e) {
    const text = this.textInput.value.trim();
    this.props.onAddClick(text);
    this.textInput.value = '';
  }
};

AddTodo.propTypes = {
  onAddClick: PropTypes.func.isRequired
};