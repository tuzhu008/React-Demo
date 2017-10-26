import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { connect } from 'react-redux';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import { setVisibilityFilter, fetchPosts, fetchDeletes, fetchGets, fetchPatch } from './store/actions';

const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

class App extends Component {
  componentDidMount () {
    let dispatch  = this.props.dispatch;
    dispatch(fetchGets());
  }
  render() {
    console.log(this.props);
    const { dispatch, visibilityFilter, visibleTodos} = this.props;
    return (
      <div className='App'>
        <AddTodo onAddClick = {topic => dispatch(fetchPosts(topic))}/>
        <TodoList
          todos={visibleTodos}
          onTodoClick={todo => dispatch(fetchPatch(todo))} 
          onRemove = {id =>dispatch(fetchDeletes(id))}
        />
        <Footer
          filter={visibilityFilter}
          onFilterChange={nextFilter =>
            dispatch(setVisibilityFilter(nextFilter))
          }/>
      </div>
    );
  }
}

App.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    topic: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  })),
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}

function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed);
    default:
      return todos;
    }
}

function mapStateToProps(state) {
  return {
    visibilityFilter: state.visibilityFilter,
    visibleTodos: selectTodos(state.todos, state.visibilityFilter)
  };
}

export default connect(mapStateToProps)(App);
