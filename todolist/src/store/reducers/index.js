import { combineReducers } from 'redux';
import * as reducers from './reducers';

const rootReducer = combineReducers(reducers); 
console.log('rootReducer');

export default rootReducer;