import rootReducer from './reducers/index';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger();

// eslint-disable-next-line
const initialState = {
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'dsadsada',
      completed: false
    },
    {
      text: 'dsadsada',
      completed: false
    },
    {
      text: 'dsadsada',
      completed: false
    },
    {
      text: 'dsadsada',
      completed: false
    },
    {
      text: 'dsadsada',
      completed: false
    },
    {
      text: 'dsadsada',
      completed: false
    }
  ]
}

let store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

// store.dispatch(selectSubreddit('reactjs'))
// store.dispatch(fetchPosts('reactjs')).then(() =>
//   console.log(store.getState())
// )

export default store;