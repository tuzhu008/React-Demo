import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Footer extends Component {
  renderFilter(filter, name) {
    return (
      <a
        className={`Footer-btn${(filter === this.props.filter)?' active':''}`}
        href=''
        onClick={e => {
          e.preventDefault();
          this.props.onFilterChange(filter);
        }}
      >
        {name}
      </a>
    );
  }
  render() {
    return (
      <p className='Footer'>
        {this.renderFilter('SHOW_ALL', 'All')}
        {this.renderFilter('SHOW_COMPLETED', 'Completed')}
        {this.renderFilter('SHOW_ACTIVE', 'Active')}
        .
      </p>
    );
  }
};

Footer.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
};